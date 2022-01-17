import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
// eslint-disable-next-line import/no-cycle
import { FinishORMEntity } from './FinishORMEntity';
import { UserORMEntity } from './UserORMEntity';

@Entity('finish_likes')
export class FinishLikeORMEntity {
  @PrimaryColumn()
  id!: string;

  @Column()
  finish_id!: string;

  @Column()
  user_id!: string;

  @Column({ type: 'boolean', default: false })
  is_notified!: boolean;

  @Column()
  created_at!: string;

  @ManyToOne(() => FinishORMEntity, (finish) => finish.likes, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'finish_id' })
  finish!: FinishORMEntity;

  @ManyToOne(() => UserORMEntity, (user) => user.id, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user!: UserORMEntity;
}
