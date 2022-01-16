import {
  Entity,
  Column,
  PrimaryColumn,
} from 'typeorm';

@Entity('comments')
export class CommentORMEntity {
  @PrimaryColumn()
  id!: string;

  @Column()
  watched_id!: string;

  @Column()
  user_id!: string;

  @Column()
  text!: string;

  @Column({ type: 'boolean', default: false })
  has_spoilers!: boolean; // ネタバレを含むか

  @Column()
  posted_at!: string; // レビューを投稿した日

  @Column()
  edited_at!: string; // レビューを編集

  @Column({ type: 'boolean', default: false })
  is_restricted!: boolean;
}
