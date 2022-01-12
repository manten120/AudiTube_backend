import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { ChannelORMEntity } from './ChannelORMEntity';

@Entity('videos')
export class VideoORMEntity {
  @PrimaryColumn()
  id?: string;

  @Column()
  channel_id!: string;

  @Column()
  name!: string;

  @Column()
  length!: string;

  @Column()
  created_at!: Date;

  @Column()
  updated_at!: Date;

  @Column({ type: 'number', default: 0 })
  restricted_status!: number;

  @ManyToOne(() => ChannelORMEntity, (channel) => channel.id)
  @JoinColumn({ name: 'channel_id' })
  channel!: ChannelORMEntity;
}
