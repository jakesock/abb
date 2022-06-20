import { Field, Float, Int, ObjectType } from "type-graphql";
import { Column, Entity, ManyToOne } from "typeorm";
import { BaseEntity, TableName } from "../types";
import { User } from "./user.entity";

@ObjectType()
@Entity({ name: TableName.LISTING })
/**
 * A class that describes the Listing TypeORM entity and GraphQL Object.
 */
export class Listing extends BaseEntity {
  @Field(() => String)
  @Column({ type: "varchar", length: 100 })
  name!: string;

  @Field(() => String)
  @Column({ type: "varchar", length: 100 })
  category!: string;

  @Field(() => String)
  @Column({ type: "text" })
  description!: string;

  @Field(() => String, { nullable: true })
  @Column({ type: "text", name: "picture_url", nullable: true })
  pictureUrl?: string;

  @Field(() => Int)
  @Column({ type: "int", name: "price_per_day" })
  pricePerDay!: number;

  @Field(() => Int)
  @Column({ type: "int", name: "number_of_beds" })
  numberOfBeds!: number;

  @Field(() => Int)
  @Column({ type: "int", name: "max_number_of_guests" })
  maxNumberOfGuests!: number;

  @Field(() => [String])
  @Column({ type: "text", array: true })
  amenities!: string[];

  @Field(() => Float)
  @Column({ type: "double precision" })
  latitude!: number;

  @Field(() => Float)
  @Column({ type: "double precision" })
  longitude!: number;

  @Field(() => String)
  @Column({ type: "uuid", name: "owner_id" })
  ownerId!: string;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.listings)
  owner!: User;
}
