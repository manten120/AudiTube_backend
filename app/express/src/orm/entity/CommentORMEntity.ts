import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
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

  @ManyToOne(() => FinishORMEntity, (finish) => finish.comments)
  @JoinColumn({ name: 'finish_id' })
  finish!: FinishORMEntity;

  @ManyToOne(() => UserORMEntity, (user) => user.id)
  @JoinColumn({ name: 'user_id' })
  user!: UserORMEntity;
}
