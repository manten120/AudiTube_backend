import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('channels')
export class ChannelORMEntity {
  @PrimaryColumn()
  id!: string;

  @Column()
  title!: string;

  @Column()
  updated_at!: string;

  @Column({type: 'integer', default: 0})
  restricted_status!: number; // 1: 当サイトではこのチャンネルとその動画は表示しない

  @Column({type: 'boolean', default: false})
  is_deleted!: boolean; // true: YouTubeでチャンネルが削除またはBANされている
}
