import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { ChannelORMEntity } from './ChannelORMEntity';

@Entity('videos')
export class VideoORMEntity {
  @PrimaryColumn()
  id!: string; // YouTube APIで得られるvideoId

  @Column()
  channel_id!: string;

  @Column()
  title!: string;

  @Column()
  duration!: string;

  @Column()
  updated_at!: string;

  @Column({ type: 'integer', default: 0 })
  restricted_status!: number; // 1: 当サイトではこの動画を表示しない

  @Column({type: 'boolean', default: false})
  is_deleted!: boolean; // true: YouTubeで動画が削除または非公開になっている

  @ManyToOne(() => ChannelORMEntity, (channel) => channel.id)
  @JoinColumn({ name: 'channel_id' })
  channel!: ChannelORMEntity;
}
