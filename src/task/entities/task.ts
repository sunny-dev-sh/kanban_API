import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Task {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    sprint: string;

    @Column()
    estimation: string;

    @Column()
    description: string;

    @Column()
    priority: string;
}
