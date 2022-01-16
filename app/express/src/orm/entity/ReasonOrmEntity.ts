import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('reasons')
export class ReasonORMEntity {
  @PrimaryColumn()
  id!: number;

  @Column()
  reason!: string;
}
