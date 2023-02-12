import { Review } from './../reviews/review.entity';
import { User } from './../users/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';

@Entity()
export class Movie{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column("longtext")
    description: string;

    @Column({ default: ""})
    coverPage: string; //online image, the application will still work offline just won't display cover image

    @Column({ default: ""})
    trailer: string; //youtube link
    
    @ManyToOne(() => User, (user) => user.created, { onDelete: 'CASCADE' })
    @JoinColumn({name: 'userId', referencedColumnName: "id"})
    createdBy: User;

    @OneToMany(() => Review, (review) => review.movie)
    reviews: Review[];

}