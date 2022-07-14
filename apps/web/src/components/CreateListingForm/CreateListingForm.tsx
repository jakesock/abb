import { createListingSchema } from "@abb/yup-schemas";
import { useMutation } from "@apollo/client";
import { Box, Button, useToast } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import { CreateListingMutation, CreateListingMutationVariables } from "../../lib/graphql/generated";
import { CREATE_LISTING_MUTATION } from "../../lib/graphql/mutations";
import { toErrorMap } from "../../lib/utils";
import { CheckboxInput } from "../CheckboxInput";
import { ChipInput } from "../ChipInput/ChipInput";
import { FormInput } from "../FormInput";
import { ImageInput } from "../ImageInput";
import { NumberInput } from "../NumberInput";

export const CreateListingForm: React.FC = () => {
  const router = useRouter();
  const toast = useToast();
  const TOAST_ID_GRAPHQL_ERROR = "create-listing-form-graphql-error";
  const [createListing] = useMutation<CreateListingMutation, CreateListingMutationVariables>(
    CREATE_LISTING_MUTATION
  );

  return (
    <Formik
      initialValues={{
        photo: "",
        title: "",
        description: "",
        pricePerNight: 75,
        numberOfGuests: 1,
        numberOfBeds: 1,
        numberOfBedrooms: 1,
        numberOfBathrooms: 1,
        hasPrivateBathrooms: false,
        category: "",
        isPetFriendly: false,
        hasSecurityCamera: false,
        hasWeapons: false,
        hasDangerousAnimals: false,
        latitude: 1.234_567,
        longitude: -1.234_567,
        amenities: [],
      }}
      validationSchema={createListingSchema}
      onSubmit={async (values, { setErrors, setFieldError }) => {
        if (!values.photo) {
          setFieldError("photo", "Photo is required");
        }

        const response = await createListing({
          variables: { createListingInput: values },
          update: (cache) => {
            cache.evict({ fieldName: "getListings:{}" });
          },
        });

        const graphqlError = response.errors;
        const errors = response.data?.createListing.errors;
        const listing = response.data?.createListing.listing;

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
          setErrors(toErrorMap(errors));
        } else if (listing) {
          router
            .push(`/listings/${listing.id}`)
            // eslint-disable-next-line no-console
            .catch((error) => console.error("[Router Error]:", error));
        }
      }}
    >
      {({
        isSubmitting,
        setFieldValue,
        errors: { photo: photoError },
        touched: { photo: photoTouched },
      }) => (
        <Form>
          <ImageInput
            name="photo"
            fieldId="photo"
            label="Photo"
            error={photoError}
            touched={photoTouched}
            setFieldValue={setFieldValue}
          />
          <Box mt={4}>
            <FormInput name="title" label="Title" placeholder="Title" />
          </Box>
          <Box mt={4}>
            <FormInput name="description" label="Description" placeholder="Description" textarea />
          </Box>
          <Box mt={4}>
            <NumberInput
              name="pricePerNight"
              label="Price Per Night"
              placeholder="Price Per Night"
              min={10}
              step={5}
              setFieldValue={setFieldValue}
            />
          </Box>
          <Box mt={4}>
            <NumberInput
              name="numberOfGuests"
              label="Number of Guests"
              placeholder="Number of Guests"
              min={1}
              max={50}
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
              max={50}
              step={1}
              setFieldValue={setFieldValue}
            />
          </Box>
          <Box mt={4}>
            <NumberInput
              name="numberOfBedrooms"
              label="Number of Bedrooms"
              placeholder="Number of Bedrooms"
              min={1}
              max={50}
              step={1}
              setFieldValue={setFieldValue}
            />
          </Box>
          <Box mt={4}>
            <NumberInput
              name="numberOfBathrooms"
              label="Number of Bathrooms"
              placeholder="Number of Bathrooms"
              min={1}
              max={50}
              step={0.5}
              setFieldValue={setFieldValue}
            />
          </Box>
          <Box mt={4}>
            <CheckboxInput name="hasPrivateBathrooms" label="Property has private bathrooms" />
          </Box>
          <Box mt={4}>
            <FormInput name="category" label="Category" placeholder="Category" />
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
          <Box mt={4}>
            <ChipInput
              name="amenities"
              inputLabel="Amenities"
              placeholder="Enter Amenities"
              setFieldValue={setFieldValue}
            />
          </Box>
          <Box mt={4}>
            <CheckboxInput name="isPetFriendly" label="Property is pet friendly" />
          </Box>
          <Box mt={4}>
            <CheckboxInput name="hasSecurityCamera" label="Property has security camera(s)" />
          </Box>
          <Box mt={4}>
            <CheckboxInput name="hasWeapons" label="Property has weapons" />
          </Box>
          <Box mt={4}>
            <CheckboxInput name="hasDangerousAnimals" label="Property has dangerous animals" />
          </Box>
          <Button
            type="submit"
            isLoading={isSubmitting}
            marginTop={4}
            colorScheme="blue"
            width="100%"
          >
            Create Listing
          </Button>
        </Form>
      )}
    </Formik>
  );
};
