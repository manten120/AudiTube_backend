import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('follows')
export class FollowRMEntity {
  @PrimaryColumn()
  follower_user_id!: number;

  @PrimaryColumn()
  followee_user_id!: number;

  @Column()
  is_notified!: boolean;

  @Column()
  created_at!: Date;
}
