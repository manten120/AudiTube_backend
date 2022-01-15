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

  @Column({ type: 'boolean', default: false })
  is_restricted!: boolean;

  @Column()
  registered_at!: string;
}
