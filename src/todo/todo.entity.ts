import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from 'src/auth/user.entity';

@Entity()
export class Todo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ default: false })
  isFinished: boolean;

  @ManyToOne(() => User, (user) => user.todos, { nullable: false })
  @JoinColumn({ name: 'userId' })
  user: User;
}
