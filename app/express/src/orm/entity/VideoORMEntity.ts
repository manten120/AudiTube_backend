import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('videos')
export class VideoORMEntity {
  @PrimaryColumn()
  id?: string;

  @Column()
  name!: string;

  @Column()
  length!: string;

  @Column()
  created_at!: Date;

  @Column()
  updated_at!: Date;

  @Column({ type: 'number', default: 0 })
  restricted_status!: number;
}
