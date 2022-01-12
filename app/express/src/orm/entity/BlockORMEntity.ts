import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn,  } from 'typeorm';
import { UserORMEntity } from './UserORMEntity';

@Entity('blocks')
export class BlockORMEntity {
  @PrimaryColumn()
  user_id!: number;

  @PrimaryColumn()
  blocked_user_id!: number;

  @Column()
  created_at!: string;

  @ManyToOne(() => UserORMEntity, (user) => user.id)
  @JoinColumn({ name: 'user_id' })
  user!: UserORMEntity;

  @ManyToOne(() => UserORMEntity, (user) => user.id)
  @JoinColumn({ name: 'blocked_user_id' })
  blocked_user!: UserORMEntity;
}
