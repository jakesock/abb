import { Field, ObjectType } from "type-graphql";
import { Listing } from "../../entity";

@ObjectType()
/**
 * Represents PaginatedListingResponse, a GraphQL object type for getting many listings.
 */
export class PaginatedListingResponse {
  @Field(() => [Listing])
  listings!: Listing[];

  @Field(() => Boolean)
  hasMore!: boolean;
}
