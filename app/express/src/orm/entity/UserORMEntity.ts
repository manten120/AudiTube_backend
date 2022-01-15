import { Entity, Column, PrimaryColumn } from 'typeorm';

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

  @Column()
  registered_at!: string;
}
