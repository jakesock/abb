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

  @Field(() => String)
  @Column({ type: "varchar", name: "first_name", length: 255 })
  firstName!: string;

  @Field(() => String, { nullable: true })
  @Column({ type: "varchar", name: "middle_name", length: 255, nullable: true })
  middleName?: string;

  @Field(() => String)
  @Column({ type: "varchar", name: "last_name", length: 255 })
  lastName!: string;

  /**
   * Full name of the user, with middle name if it exists.
   * @return {string} - Full name of the user.
   */
  @Field(() => String)
  fullName(): string {
    if (this.middleName) {
      return `${this.firstName} ${this.middleName} ${this.lastName}`;
    }
    return `${this.firstName} ${this.lastName}`;
  }

  // TODO: about (optional text)
  // TODO: location (optional string)
  // TODO: languages (optional array of strings)
  // TODO: work (optional string)
  // TODO: ROLES (enum, admin, user, guest)
  // TODO: avatar (Photo relation)

  @Field(() => Boolean)
  @Column({ type: "boolean", name: "is_confirmed", default: false })
  isConfirmed!: boolean;

  @Field(() => [Listing], { nullable: true })
  @OneToMany(() => Listing, (listing) => listing.host, { nullable: true, eager: true })
  listings?: Listing[];
}
