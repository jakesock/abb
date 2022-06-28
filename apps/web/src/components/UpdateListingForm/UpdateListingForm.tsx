import { updateListingSchema } from "@abb/yup-schemas";
import { useMutation } from "@apollo/client";
import { Box, Button, useToast } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import {
  RegularListingFragment,
  UpdateListingMutation,
  UpdateListingMutationVariables,
} from "../../lib/graphql/generated";
import { UPDATE_LISTING_MUTATION } from "../../lib/graphql/mutations";
import { toErrorMap } from "../../lib/utils";
import { ChipInput } from "../ChipInput/ChipInput";
import { FormInput } from "../FormInput";
import { ImageInput } from "../ImageInput";
import { NumberInput } from "../NumberInput";

interface IUpdateListingFormProps {
  listing: RegularListingFragment;
}

export const UpdateListingForm: React.FC<IUpdateListingFormProps> = ({ listing }) => {
  const router = useRouter();
  const toast = useToast();
  const TOAST_ID_GRAPHQL_ERROR = "update-listing-form-graphql-error";
  const TOAST_ID_INVALID_POST_ID = "update-listing-form-invalid-post-id";
  const [updateListing] = useMutation<UpdateListingMutation, UpdateListingMutationVariables>(
    UPDATE_LISTING_MUTATION
  );

  return (
    <Formik
      initialValues={{
        id: listing.id,
        newPhoto: "",
        name: listing.name || "",
        category: listing.category || "",
        description: listing.description || "",
        pricePerDay: listing.pricePerDay || 49,
        numberOfBeds: listing.numberOfBeds || 1,
        maxNumberOfGuests: listing.maxNumberOfGuests || 1,
        amenities: listing.amenities || [],
        latitude: listing.latitude || 1.234_567,
        longitude: listing.longitude || -1.234_567,
      }}
      validationSchema={updateListingSchema}
      onSubmit={async (values, { setErrors }) => {
        const response = await updateListing({
          variables: {
            updateListingInput: {
              id: values.id,
              name: values.name || undefined,
              category: values.category || undefined,
              description: values.description || undefined,
              pricePerDay: values.pricePerDay || undefined,
              numberOfBeds: values.numberOfBeds || undefined,
              maxNumberOfGuests: values.maxNumberOfGuests || undefined,
              amenities: values.amenities || undefined,
              latitude: values.latitude || undefined,
              longitude: values.longitude || undefined,
              newPhoto: values.newPhoto || undefined,
            },
          },
        });

        const graphqlError = response.errors;
        const errors = response.data?.updateListing.errors;
        const updatedListing = response.data?.updateListing.listing;

        // Something went wrong updating the listing, display toast containing error message
        if (graphqlError && graphqlError.length > 0 && !toast.isActive(TOAST_ID_GRAPHQL_ERROR)) {
          toast({
            id: TOAST_ID_GRAPHQL_ERROR,
            title: "Error",
            description: graphqlError[0].message,
            status: "error",
            duration: 9000,
            isClosable: true,
            position: "bottom-right",
          });
        }

        if (errors && errors.length > 0) {
          // If there are any field errors, check if the listing id is invalid
          const listingIdError = errors.find((fieldError) => fieldError.field === "id");

          if (listingIdError) {
            // If the listing id is invalid, show a toast error, no need to show the field errors as it cannot be submitted successfully anyways
            if (!toast.isActive(TOAST_ID_INVALID_POST_ID)) {
              toast({
                id: TOAST_ID_INVALID_POST_ID,
                title: listingIdError.message,
                description: "Please find another listing and try again.",
                status: "error",
                duration: 9000,
                isClosable: true,
                position: "bottom-right",
              });
            }
          } else {
            // If the listing id is valid, show the other errors
            setErrors(toErrorMap(errors));
          }
          setErrors(toErrorMap(errors));
        } else if (updatedListing) {
          router
            .push(`/listings/${updatedListing.id}`)
            // eslint-disable-next-line no-console
            .catch((routerError) => console.error("[Router Error]:", routerError));
        }
      }}
    >
      {({
        isSubmitting,
        setFieldValue,
        initialValues: { amenities },
        errors: { newPhoto: photoError },
        touched: { newPhoto: photoTouched },
      }) => (
        <Form>
          <ImageInput
            name="photo"
            fieldId="photo"
            label="Photo"
            error={photoError}
            touched={photoTouched}
            setFieldValue={setFieldValue}
            initialImageUrl={listing.pictureUrl || ""}
          />
          <Box mt={4}>
            <FormInput name="name" label="Title" placeholder="Title" />
          </Box>
          <Box mt={4}>
            <FormInput name="category" label="Category" placeholder="Category" />
          </Box>
          <Box mt={4}>
            <FormInput name="description" label="Description" placeholder="Description" textarea />
          </Box>
          <Box mt={4}>
            <NumberInput
              name="pricePerDay"
              label="Price Per Day"
              placeholder="Price Per Day"
              min={0}
              step={1}
              setFieldValue={setFieldValue}
            />
          </Box>
          <Box mt={4}>
            <NumberInput
              name="numberOfBeds"
              label="Number of Beds"
              placeholder="Number of Beds"
              min={1}
              step={1}
              setFieldValue={setFieldValue}
            />
          </Box>
          <Box mt={4}>
            <NumberInput
              name="maxNumberOfGuests"
              label="Max Number of Guests"
              placeholder="Max Number of Guests"
              min={1}
              step={1}
              setFieldValue={setFieldValue}
            />
          </Box>
          <Box mt={4}>
            <ChipInput
              name="amenities"
              inputLabel="Amenities"
              placeholder="Enter Amenities"
              setFieldValue={setFieldValue}
              initialLabels={amenities}
            />
          </Box>
          <Box mt={4}>
            <NumberInput
              name="latitude"
              label="Latitude"
              placeholder="Latitude"
              step={0.000_001}
              pattern="-?[0-9]\d*(\.\d{0,6})?$"
              setFieldValue={setFieldValue}
            />
          </Box>
          <Box mt={4}>
            <NumberInput
              name="longitude"
              label="Longitude"
              placeholder="Longitude"
              step={0.000_001}
              pattern="-?[0-9]\d*(\.\d{0,6})?$"
              setFieldValue={setFieldValue}
            />
          </Box>
          <Button
            type="submit"
            isLoading={isSubmitting}
            marginTop={4}
            colorScheme="blue"
            width="100%"
          >
            Update Listing
          </Button>
        </Form>
      )}
    </Formik>
  );
};
