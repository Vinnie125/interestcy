import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class InterestGroup {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;
  
  @Column()
  location: string;
}
