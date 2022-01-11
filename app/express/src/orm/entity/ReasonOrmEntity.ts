import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('reasons')
export class ReasonORMEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  reason!: string;
}
