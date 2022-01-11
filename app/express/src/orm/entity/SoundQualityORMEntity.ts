import { Entity, PrimaryColumn } from 'typeorm';

@Entity('sound_qualities')
export class SoundQualityORMEntity {
  @PrimaryColumn()
  video_id?: string;

  @PrimaryColumn()
  user_id!: string;
}