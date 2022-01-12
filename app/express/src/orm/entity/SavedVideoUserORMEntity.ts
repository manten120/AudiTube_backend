import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn , CreateDateColumn} from 'typeorm';
import { UserORMEntity } from './UserORMEntity';
import { VideoORMEntity } from './VideoORMEntity';

@Entity('saved_videos_users')
export class SavedVideoUserORMEntity {
  @PrimaryColumn()
  video_id!: string;

  @PrimaryColumn()
  user_id!: string;

  @CreateDateColumn()
  created_at!: string;

  @Column({ type: 'integer', default: 0 })
  restricted_status!: number;

  @ManyToOne(() => VideoORMEntity, (video) => video.id)
  @JoinColumn({ name: 'video_id' })
  video!: VideoORMEntity;

  @ManyToOne(() => UserORMEntity, (user) => user.id)
  @JoinColumn({ name: 'user_id' })
  user!: UserORMEntity;
}
