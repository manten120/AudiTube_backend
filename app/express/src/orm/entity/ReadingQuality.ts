import { Entity, PrimaryColumn } from 'typeorm';

@Entity('reading_qualities')
export class ReadingQualityORMEntity {
  @PrimaryColumn()
  video_id?: string;

  @PrimaryColumn()
  user_id!: string;
}