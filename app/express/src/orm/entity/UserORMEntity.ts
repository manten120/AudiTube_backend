import { Entity, Column, PrimaryColumn, CreateDateColumn } from 'typeorm';

@Entity('users') // テーブル名 users
export class UserORMEntity {
  @PrimaryColumn()
  id!: string;

  @Column({ unique: true })
  display_id!: string;

  @Column()
  name!: string;

  @Column()
  password!: string;

  @Column({ type: 'integer', default: 0 })
  restricted_status!: number;

  @CreateDateColumn()
  created_at!: string;
}
