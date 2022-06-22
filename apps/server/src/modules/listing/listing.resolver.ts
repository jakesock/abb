import { Arg, Ctx, FieldResolver, Mutation, Resolver, Root, UseMiddleware } from "type-graphql";
import { Service } from "typedi";
import { Listing, User } from "../../entity";
import { IsAuthenticated } from "../../lib/middleware";
import { ListingFormResponse, MyContext } from "../../types";
import { CreateListingInput } from "./inputs";
import { ListingService } from "./listing.service";

@Service()
@Resolver(() => Listing)
/**
 * Represents Listing GraphQL Resolver.
 */
export class ListingResolver {
  /**
   * Init listing service.
   * @param {ListingService} listingService - Service that provides methods which performs business logic for the listing resolver.
   */
  constructor(private readonly listingService: ListingService) {}

  /**
   * Listing: Owner field resolver.
   * Resolves the user defined in the owner field using the userLoader dataloader.
   * @param {Listing} listing - Listing entity (root object from which to derive the field and its value).
   * @param {MyContext} ctx - Our GraphQL context.
   * @return {Promise<User>} - Promise that resolves to the user entity.
   */
  @FieldResolver(() => User)
  owner(@Root() listing: Listing, @Ctx() { userLoader }: MyContext): Promise<User> {
    return userLoader.load(listing.ownerId);
  }

  /**
   * Create Listing Mutation.
   * @param {CreateListingInput} createListingInput - Input object for the create listing mutation.
   * @param {MyContext} ctx - Our GraphQL context.
   * @return {Promise<ListingFormResponse>} Promise that resolves to a ListingFormResponse.
   */
  @Mutation(() => ListingFormResponse)
  @UseMiddleware(IsAuthenticated)
  async createListing(
    @Arg("createListingInput") createListingInput: CreateListingInput,
    @Ctx() ctx: MyContext
  ): Promise<ListingFormResponse> {
    return this.listingService.create(createListingInput, ctx);
  }
}
