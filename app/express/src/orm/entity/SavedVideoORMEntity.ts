import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('watching_videos_users')
export class CommentORMEntity {
  @PrimaryColumn()
  video_id!: string;

  @PrimaryColumn()
  user_id!: string;

  @Column()
  created_at!: Date;

  @Column({ type: 'number', default: 0 })
  restricted_status!: number;
}
