import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { UserORMEntity } from './UserORMEntity';
import { VideoORMEntity } from './VideoORMEntity';
import { ChannelORMEntity } from './ChannelORMEntity';
import { CommentORMEntity } from './CommentORMEntity';
import { ReasonORMEntity } from './ReasonOrmEntity';
import { FinishORMEntity } from './FinishORMEntity';

@Entity('reports')
export class ReportORMEntity {
  @PrimaryColumn()
  user_id!: string;

  @Column({ type: 'varchar', nullable: true, default: null })
  reported_channel_id!: string | null;

  @Column({ type: 'varchar', nullable: true, default: null })
  reported_video_id!: string | null;

  @Column({ type: 'varchar', nullable: true, default: null })
  reported_user_id!: string | null;

  @Column({ type: 'varchar', nullable: true, default: null })
  reported_watched_id!: string | null;

  @Column({ type: 'varchar', nullable: true, default: null })
  reported_comment_id!: string | null;

  @Column({ type: 'varchar', nullable: true, default: null })
  reason_id!: number | null;

  @Column({ type: 'boolean', nullable: true, default: null })
  is_correct!: boolean | null;

  @Column({ type: 'boolean', default: false })
  is_resolved!: boolean;

  @CreateDateColumn()
  created_at!: string;

  @UpdateDateColumn()
  updated_at!: string;

  @ManyToOne(() => ChannelORMEntity, (channel) => channel.id)
  @JoinColumn({ name: 'reported_channel_id' })
  channel!: ChannelORMEntity;

  @ManyToOne(() => VideoORMEntity, (video) => video.id)
  @JoinColumn({ name: 'reported_video_id' })
  video!: VideoORMEntity;

  @ManyToOne(() => UserORMEntity, (user) => user.id)
  @JoinColumn({ name: 'reported_user_id' })
  user!: UserORMEntity;

  @ManyToOne(() => FinishORMEntity, (finish) => finish.id)
  @JoinColumn({ name: 'reported_finish_id' })
  finish!: FinishORMEntity;

  @ManyToOne(() => CommentORMEntity, (comment) => comment.id)
  @JoinColumn({ name: 'reported_comment_id' })
  comment!: CommentORMEntity;

  @ManyToOne(() => ReasonORMEntity, (reason) => reason.id)
  @JoinColumn({ name: 'reason_id' })
  reason!: ReasonORMEntity;
}
