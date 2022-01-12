import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity('users') // テーブル名 users
export class UserORMEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  name!: string;

  @Column()
  password!: string;

  @Column({ type: 'integer', default: 0 })
  restricted_status!: number;

  @CreateDateColumn()
  created_at!: string;
}
