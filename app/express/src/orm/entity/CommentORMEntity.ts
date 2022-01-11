import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('comments')
export class CommentORMEntity {
  @PrimaryGeneratedColumn()
  id?: string;

  @Column()
  review_id!: string;

  @Column()
  user_id!: string;

  @Column()
  text!: string;

  @Column()
  has_spoilers!: boolean; // ネタバレを含むか

  @Column({ type: 'boolean', default: false })
  created_at!: Date; // レビューを投稿した日

  @Column()
  updated_at!: Date; // レビューを編集

  @Column({ type: 'number', default: 0 })
  restricted_status!: number;
}
