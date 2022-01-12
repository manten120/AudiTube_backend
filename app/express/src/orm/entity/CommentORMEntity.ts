import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
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

  @CreateDateColumn()
  created_at!: string; // レビューを投稿した日

  @UpdateDateColumn()
  updated_at!: string; // レビューを編集

  @Column({ type: 'integer', default: 0 })
  restricted_status!: number;
}
