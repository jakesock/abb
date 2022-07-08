import { FileUpload, GraphQLUpload } from "graphql-upload";
import { Field, Float, InputType, Int } from "type-graphql";
import { Listing } from "../../../entity";

@InputType()
/**
 * Represents Update Listing input type.
 */
export class UpdateListingInput implements Partial<Listing> {
  [key: string]: unknown;

  @Field(() => String)
  id!: string;

  @Field(() => GraphQLUpload, { nullable: true })
  newPhoto?: Promise<FileUpload>;

  @Field(() => String, { nullable: true })
  title?: string;

  @Field(() => String, { nullable: true })
  description?: string;

  @Field(() => Int, { nullable: true })
  pricePerNight?: number;

  @Field(() => Int, { nullable: true })
  numberOfGuests?: number;

  @Field(() => Int, { nullable: true })
  numberOfBeds?: number;

  @Field(() => String, { nullable: true })
  category?: string;

  @Field(() => [String], { nullable: true })
  amenities?: string[];

  @Field(() => Float, { nullable: true })
  latitude?: number;

  @Field(() => Float, { nullable: true })
  longitude?: number;
}
