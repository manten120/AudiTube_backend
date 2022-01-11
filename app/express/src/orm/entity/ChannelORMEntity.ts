import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('channels')
export class ChannelORMEntity {
  @PrimaryColumn()
  id?: string;

  @Column()
  name!: string;

  @Column()
  created_at!: Date;

  @Column()
  updated_at!: Date;

  @Column({type: 'number', default: 0})
  restricted_status!: number;
}
