import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
// eslint-disable-next-line import/no-cycle
import { CommentORMEntity } from './CommentORMEntity';
import { UserORMEntity } from './UserORMEntity';

@Entity('comment_likes')
export class CommentLikeORMEntity {
  @PrimaryColumn()
  id!: string;

  @Column()
  comment_id!: string;

  @Column()
  user_id!: string;

  @Column({ type: 'boolean', default: false })
  is_notified!: boolean;

  @Column()
  created_at!: string;

  @ManyToOne(() => CommentORMEntity, (comment) => comment.likes, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'comment_id' })
  comment!: CommentORMEntity;

  @ManyToOne(() => UserORMEntity, (user) => user.id, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user!: UserORMEntity;
}
