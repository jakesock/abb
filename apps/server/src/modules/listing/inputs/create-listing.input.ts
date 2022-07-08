import { FileUpload, GraphQLUpload } from "graphql-upload";
import { Field, Float, InputType, Int } from "type-graphql";
import { Listing } from "../../../entity";

@InputType()
/**
 * Represents Create Listing input type.
 */
export class CreateListingInput implements Partial<Listing> {
  [key: string]: unknown;

  @Field(() => GraphQLUpload)
  photo!: Promise<FileUpload>;

  @Field()
  title!: string;

  @Field()
  description!: string;

  @Field(() => Int)
  pricePerNight!: number;

  @Field(() => Int)
  numberOfGuests!: number;

  @Field(() => Int)
  numberOfBeds!: number;

  @Field()
  category!: string;

  @Field(() => [String])
  amenities!: string[];

  @Field(() => Float)
  latitude!: number;

  @Field(() => Float)
  longitude!: number;
}
