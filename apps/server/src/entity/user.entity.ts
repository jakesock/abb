import { Field, ObjectType } from "type-graphql";
import { Column, Entity, OneToMany } from "typeorm";
import { BaseEntity } from "../types";
import { Listing } from "./listing.entity";

@ObjectType()
@Entity({ name: "users" })
/**
 * A class that describes the User TypeORM entity and GraphQL Object.
 */
export class User extends BaseEntity {
  @Field(() => String)
  @Column({ unique: true })
  username!: string;

  @Field(() => String)
  @Column({ type: "text", unique: true })
  email!: string;

  @Column()
  password!: string;

  @Field(() => Boolean)
  @Column({ type: "boolean", name: "is_confirmed", default: false })
  isConfirmed!: boolean;

  @Field(() => [Listing], { nullable: true })
  @OneToMany(() => Listing, (listing) => listing.owner, { nullable: true, eager: true })
  listings?: Listing[];
}
