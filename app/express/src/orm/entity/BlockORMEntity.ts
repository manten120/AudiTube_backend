import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('blocks')
export class BlockORMEntity {
  @PrimaryColumn()
  user_id!: number;

  @PrimaryColumn()
  blocked_user_id!: number;

  @Column()
  created_at!: Date;
}
