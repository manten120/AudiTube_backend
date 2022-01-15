import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn} from 'typeorm';
import { UserORMEntity } from './UserORMEntity';
import { VideoORMEntity } from './VideoORMEntity';
import type { PriorityValue } from '../../types';


@Entity('watchings')
export class WatchingORMEntity {
  @PrimaryColumn()
  video_id!: string;

  @PrimaryColumn()
  user_id!: string;

  @Column({ type: 'integer', default: 0 })
  priority!: PriorityValue;

  @Column()
  registered_at!: string;

  @Column({ type: 'boolean', default: false })
  is_restricted!: boolean;

  @ManyToOne(() => VideoORMEntity, (video) => video.id)
  @JoinColumn({ name: 'video_id' })
  video!: VideoORMEntity;

  @ManyToOne(() => UserORMEntity, (user) => user.id)
  @JoinColumn({ name: 'user_id' })
  user!: UserORMEntity;
}
