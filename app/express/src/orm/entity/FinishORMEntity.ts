import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { UserORMEntity } from './UserORMEntity';
import { VideoORMEntity } from './VideoORMEntity';

@Entity('finishes')
export class FinishORMEntity {
  @PrimaryGeneratedColumn()
  id?: string;

  @Column()
  video_id!: string;

  @Column()
  user_id!: string;

  @Column({ type: 'varchar', nullable: true })
  review!: string; // レビュー・感想

  @Column({ type: 'boolean', default: false })
  is_restricted!: boolean; // レビューが公開制限されている 投稿者だけ読める

  @Column({ type: 'boolean', default: false })
  is_deleted!: boolean; // レビューが削除されている

  @Column({ type: 'varchar', nullable: true })
  started_at!: string; // 聴き始めた日 不明ならnull

  @Column({ type: 'varchar', nullable: true })
  finished_at!: string; // 聴き終わった日 不明ならnull

  @Column()
  registered_at!: string; // 聴き終わったリストに登録した日時

  @Column({ type: 'integer', default: 0 })
  restricted_status!: number;

  @ManyToOne(() => VideoORMEntity, (video) => video.id)
  @JoinColumn({ name: 'video_id' })
  video!: VideoORMEntity;

  @ManyToOne(() => UserORMEntity, (user) => user.id)
  @JoinColumn({ name: 'user_id' })
  user!: UserORMEntity;
}