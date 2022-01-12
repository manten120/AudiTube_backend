import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('channels')
export class ChannelORMEntity {
  @PrimaryColumn()
  id?: string;

  @Column()
  name!: string;

  @Column()
  created_at!: string;

  @Column()
  updated_at!: string;

  @Column({type: 'integer', default: 0})
  restricted_status!: number;
}
