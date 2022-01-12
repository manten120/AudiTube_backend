import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity('reasons')
export class ReasonORMEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  reason!: string;

  @CreateDateColumn()
  created_at!: string;
}
