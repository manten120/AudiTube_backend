import {
  Entity,
  Column,
  PrimaryColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
// eslint-disable-next-line import/no-cycle
import { CommentLikeORMEntity } from './CommentLikeORMEntity';
// eslint-disable-next-line import/no-cycle
import { FinishORMEntity } from './FinishORMEntity';
import { UserORMEntity } from './UserORMEntity';

@Entity('comments')
export class CommentORMEntity {
  @PrimaryColumn()
  id!: string;

  @Column()
  finish_id!: string;

  @Column()
  user_id!: string;

  @Column()
  text!: string;

  @Column()
  posted_at!: string; // コメントを投稿した日

  @Column({ type: 'boolean', default: false })
  is_notified!: boolean;

  @Column({ type: 'boolean', default: false })
  is_restricted!: boolean;

  @ManyToOne(() => FinishORMEntity, (finish) => finish.comments, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'finish_id' })
  finish!: FinishORMEntity;

  @ManyToOne(() => UserORMEntity, (user) => user.id, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user!: UserORMEntity;

  @OneToMany(() => CommentLikeORMEntity, (commentLike) => commentLike.comment)
  @JoinColumn({ name: 'id' })
  likes!: CommentLikeORMEntity[];
}
