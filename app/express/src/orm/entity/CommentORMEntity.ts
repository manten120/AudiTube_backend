import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('comments')
export class CommentORMEntity {
  @PrimaryGeneratedColumn()
  id?: string;

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

  @Column({ type: 'integer', default: 0 })
  restricted_status!: number;
}
