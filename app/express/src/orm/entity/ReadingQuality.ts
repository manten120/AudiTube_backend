import {
  Entity,
  PrimaryColumn,
  ManyToOne,
  JoinColumn,
  Column
} from 'typeorm';
import { UserORMEntity } from './UserORMEntity';
import { VideoORMEntity } from './VideoORMEntity';

@Entity('reading_qualities')
export class ReadingQualityORMEntity {
  @PrimaryColumn()
  video_id!: string;

  @PrimaryColumn()
  user_id!: string;

  @Column()
  created_at!: string;

  @ManyToOne(() => VideoORMEntity, (video) => video.id)
  @JoinColumn({ name: 'video_id' })
  video!: VideoORMEntity;

  @ManyToOne(() => UserORMEntity, (user) => user.id)
  @JoinColumn({ name: 'user_id' })
  user!: UserORMEntity;
}
