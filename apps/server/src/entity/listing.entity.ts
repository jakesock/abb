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
  [key: string]: unknown;

  @Field(() => String)
  @Column({ type: "varchar", length: 50 })
  title!: string;

  @Field(() => String)
  @Column({ type: "text" })
  description!: string;

  @Field(() => Int)
  @Column({ type: "int", name: "price_per_night" })
  pricePerNight!: number;

  @Field(() => Int)
  @Column({ type: "int", name: "number_of_guests" })
  numberOfGuests!: number;

  @Field(() => Int)
  @Column({ type: "int", name: "number_of_beds" })
  numberOfBeds!: number;

  // TODO: Number of bedrooms (int)
  // TODO: Number of bathrooms (float)
  // TODO: hasPrivateBathrooms (boolean)

  // TODO: Change to space kind, enum
  @Field(() => String)
  @Column({ type: "varchar", length: 100 })
  category!: string;

  @Field(() => Boolean)
  @Column({ type: "boolean", name: "is_pet_friendly" })
  isPetFriendly!: boolean;

  @Field(() => Boolean)
  @Column({ type: "boolean", name: "has_security_camera" })
  hasSecurityCamera!: boolean;

  @Field(() => Boolean)
  @Column({ type: "boolean", name: "has_weapons" })
  hasWeapons!: boolean;

  @Field(() => Boolean)
  @Column({ type: "boolean", name: "has_dangerous_animals" })
  hasDangerousAnimals!: boolean;

  // Host (User) relation
  @Field(() => String)
  @Column({ type: "uuid", name: "host_id" })
  hostId!: string;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.listings)
  host!: User;

  // TODO: ListingType relation
  // TODO: LsitingSubType relation

  // TODO: Change to address relation
  @Field(() => Float)
  @Column({ type: "double precision" })
  latitude!: number;

  // TODO: Change to address relation
  @Field(() => Float)
  @Column({ type: "double precision" })
  longitude!: number;

  // TODO: Change to Photo relation
  @Field(() => String, { nullable: true })
  @Column({ type: "text", name: "picture_url", nullable: true })
  pictureUrl?: string;

  // TODO: Change to Amenities relation
  @Field(() => [String])
  @Column({ type: "text", array: true })
  amenities!: string[];
}
