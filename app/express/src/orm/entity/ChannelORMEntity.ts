import { Entity, Column, PrimaryColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('channels')
export class ChannelORMEntity {
  @PrimaryColumn()
  id?: string;

  @Column()
  name!: string;

  @CreateDateColumn()
  created_at!: string;

  @UpdateDateColumn()
  updated_at!: string;

  @Column({type: 'integer', default: 0})
  restricted_status!: number;
}
