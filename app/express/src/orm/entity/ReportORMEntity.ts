import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('reports')
export class ReportORMEntity {
  @PrimaryColumn()
  user_id!: string;

  @Column({ type: 'varchar', nullable: true, default: null})
  reported_channel_id!: string;

  @Column({ type: 'varchar', nullable: true, default: null})
  reported_video_id!: string;

  @Column({ type: 'varchar', nullable: true, default: null})
  reported_user_id!: string;

  @Column({ type: 'varchar', nullable: true, default: null})
  reported_review_id!: string;

  @Column({ type: 'varchar', nullable: true, default: null})
  reported_comment_id!: string;

  @Column({ type: 'varchar', nullable: true, default: null})
  reason_id!: number;

  @Column({ type: 'boolean', nullable: true, default: null})
  is_correct!: boolean;

  @Column({ type: 'boolean', default: false})
  is_resolved!: boolean;

  @Column()
  created_at!: Date;
}
