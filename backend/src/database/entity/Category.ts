import { Entity, PrimaryColumn, Column } from "typeorm";

@Entity("categories")
export class Category {
    @PrimaryColumn()
    id: number;

    @Column({ length: 50, unique: true })
    name: string;
}