import {
  Entity,
  PrimaryColumn,
  ManyToOne,
  JoinColumn,
  Column,
} from 'typeorm';
import { UserORMEntity } from './UserORMEntity';
import { VideoORMEntity } from './VideoORMEntity';

@Entity('sound_qualities')
export class SoundQualityORMEntity {
  @PrimaryColumn()
  video_id?: string;

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
