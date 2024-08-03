import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Post {

  @PrimaryGeneratedColumn()

  @Column()
  name: string;

  @Column()
  content: string;
  
  @Column()
  url: string;
}
