import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
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

  @CreateDateColumn()
  created_at?: string;

  @UpdateDateColumn()
  updated_at?: string;

  @Column({ type: 'integer', default: 0 })
  restricted_status!: number;

  @ManyToOne(() => ChannelORMEntity, (channel) => channel.id)
  @JoinColumn({ name: 'channel_id' })
  channel!: ChannelORMEntity;
}
