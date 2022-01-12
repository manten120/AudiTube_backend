import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn  } from 'typeorm';
import { UserORMEntity } from './UserORMEntity';

@Entity('follows')
export class FollowRMEntity {
  @PrimaryColumn()
  user_id!: number;

  @PrimaryColumn()
  followed_user_id!: number;

  @Column()
  is_notified!: boolean;

  @Column()
  created_at!: string;

  @ManyToOne(() => UserORMEntity, (user) => user.id)
  @JoinColumn({ name: 'user_id' })
  user!: UserORMEntity;

  @ManyToOne(() => UserORMEntity, (user) => user.id)
  @JoinColumn({ name: 'followed_user_id' })
  followed_user!: UserORMEntity;
}
