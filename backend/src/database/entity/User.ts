import { BaseEntity, Column, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Comment } from './Comment.js'

@Entity("users")
export class User extends BaseEntity {
    @PrimaryGeneratedColumn({ type: 'int' })
    id: number

    @Column({ length: 255 })
    username: string

    @Column({ length: 255 })
    email: string

    @Column({ length: 255, select: false })
    password: string

    @Column()
    verified: boolean

    @OneToMany(() => Comment, (comment) => comment.user)
    comments: Comment[]
}