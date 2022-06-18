// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

// https://developers.wpengine.com/blog/apollo-client-cache-rehydration-in-next-js

import { ApolloClient, ApolloLink, InMemoryCache, NormalizedCacheObject } from "@apollo/client";
import { onError } from "@apollo/link-error";
import { createUploadLink } from "apollo-upload-client";
import merge from "deepmerge";
import { IncomingHttpHeaders } from "http";
import fetch from "isomorphic-unfetch";
import isEqual from "lodash/isEqual";
import type { AppProps } from "next/app";
import { useMemo } from "react";

const APOLLO_STATE_PROP_NAME = "__APOLLO_STATE__";
let apolloClient: ApolloClient<NormalizedCacheObject> | undefined;

/**
 * Responsible for creating a new instance of Apollo Client.
 * @param {IncomingHttpHeaders | null} headers - Incoming http headers. Default of null.
 * @return {ApolloClient<NormalizedCacheObject>}
 */
const createApolloClient = (
  headers: IncomingHttpHeaders | null = null
): ApolloClient<NormalizedCacheObject> => {
  /**
   * Fetch that passes cookies along with each request if present.
   * @param {RequestInfo} url - The url the request is being made to.
   * @param {RequestInit} init - Request init object containing a requests parameters (body, headers, etc.).
   * @return {Response} Returns a HTTP fetch response.
   */
  const enhancedFetch = (url: RequestInfo, init: RequestInit): Promise<Response> =>
    fetch(url, {
      ...init,
      headers: {
        ...init.headers,
        "Access-Control-Allow-Origin": "*",
        // Here we pass the cookie along for each request
        Cookie: headers?.cookie ?? "",
      },
    }).then((response) => response);

  return new ApolloClient({
    // True if code is running on the server, false if on a client
    ssrMode: typeof window === "undefined",
    link: ApolloLink.from([
      onError(({ graphQLErrors, networkError }) => {
        if (graphQLErrors) {
          // eslint-disable-next-line no-console
          console.error("[GraphQL Error]:", graphQLErrors);
        }
        if (networkError) {
          // eslint-disable-next-line no-console
          console.error("[Network Error]:", networkError);
        }
      }),

      createUploadLink({
        uri: process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080/graphql", // GraphQL Endpoint (must be absolute)
        fetchOptions: {
          // Additional fetch() options like `credentials` or `headers`
          mode: "cors",
        },
        credentials: "include",
        fetch: enhancedFetch,
      }),
    ]),
    cache: new InMemoryCache({
      // typePolicies is not required to use Apollo with Next.js - in our case only for doing pagination.
      typePolicies: {
        Query: {
          fields: {
            // TODO: Add pagination field for 'getAll...' queries
          },
        },
      },
    }),
  });
};

type InitialState = NormalizedCacheObject | undefined;

interface IInitializeApolloOptions {
  headers?: IncomingHttpHeaders | null;
  initialState?: InitialState | null;
}

const defaultInitializeApolloOptions: IInitializeApolloOptions = {
  headers: null,
  initialState: null,
};

/**
 * Initializes Apollo Client.
 * Merges the initial state (data passed in from getStaticProps() / getServerSideProps())
 * with the existing client-side Apollo cache,
 * then sets that new, merged data set as the new cache for Apollo Client.
 * @param {IInitializeApolloOptions} initializeApolloOptions - An object containing request headers and the initial Apollo cache.
 * @return {ApolloClient<NormalizedCacheObject>} ApolloClient with new, rehydrated cache.
 */
export const initializeApollo = ({
  headers,
  initialState,
}: IInitializeApolloOptions = defaultInitializeApolloOptions): ApolloClient<NormalizedCacheObject> => {
  const newApolloClient = apolloClient ?? createApolloClient(headers);

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state gets hydrated here
  if (initialState) {
    const existingCache = newApolloClient.extract(); // Get existing cache, loaded while client side date fetching

    // Merge the existing cache into data passed from getStaticProps/getServerSideProps
    const data = merge(initialState, existingCache, {
      // combine arrays using object equality (like in sets)
      arrayMerge: (destinationArray: unknown[], sourceArray: unknown[]) => [
        ...sourceArray,
        ...destinationArray.filter((destination) =>
          sourceArray.every((source) => !isEqual(destination, source))
        ),
      ],
    });

    // Restore the new client cache with the merged data
    newApolloClient.cache.restore(data);
  }

  // For SSG and SSR always create a new Apollo Client
  if (typeof window === "undefined") return newApolloClient;

  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = newApolloClient;

  return newApolloClient;
};

/**
 * Takes pageProps from the current page and adds
 * Apollo's cache data to them.
 * @param {ApolloClient<NormalizedCacheObject>} client - Apollo Client instance.
 * @param {AppProps} pageProps - Page props returned from getStaticProps() / getServerSideProps().
 * @return {Record<string, unkown>}
 */
export const addApolloState = (
  client: ApolloClient<NormalizedCacheObject>,
  pageProps: AppProps["pageProps"]
): Record<string, unknown> => {
  if (pageProps?.props) {
    // eslint-disable-next-line no-param-reassign
    pageProps.props[APOLLO_STATE_PROP_NAME] = client.cache.extract();
  }

  return pageProps as {
    props: {
      APOLLO_STATE_PROP_NAME: NormalizedCacheObject;
    };
  };
};

/**
 * Calls initializeApollo() to get an instance of Apollo Client that has
 * Apollo’s cache data added to it.
 * This client is ultimately passed in as a prop to the
 * ApolloProvider that Apollo Client provides.
 * @param {AppProps} pageProps = Page props freturned from getStaticProps() / getServerSideProps().
 * @return {ApolloClient<NormalizedCacheObject>} - Apollo Client with our cache.
 */
export const useApollo = (
  pageProps: AppProps["pageProps"]
): ApolloClient<NormalizedCacheObject> => {
  const state = pageProps[APOLLO_STATE_PROP_NAME] as NormalizedCacheObject;
  const store = useMemo(() => initializeApollo({ initialState: state }), [state]);
  return store;
};
