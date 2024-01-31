import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Story {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    estimation: string;

    @Column()
    description: string;

    @Column()
    priority: string;
}
