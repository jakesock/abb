import { CustomError, InternalServerError } from "@abb/errors";
import {
  ApolloServerPluginLandingPageDisabled,
  ApolloServerPluginLandingPageGraphQLPlayground,
} from "apollo-server-core";
import { ApolloServer, ExpressContext } from "apollo-server-express";
import cors from "cors";
import express, { Express } from "express";
import rateLimit from "express-rate-limit";
import session from "express-session";
import { fieldExtensionsEstimator, simpleEstimator } from "graphql-query-complexity";
import { createComplexityPlugin } from "graphql-query-complexity-apollo-plugin";
import { graphqlUploadExpress } from "graphql-upload";
import "reflect-metadata";
import { corsConfig, rateLimitConfig, redisClient, sessionConfig } from "./lib/config";
import { PROD } from "./lib/constants";
import { createUserLoader } from "./lib/loaders";
import { buildSchema, logger } from "./lib/utils";

type CreateApolloExpressServerReturnType = Promise<{
  app: Express;
  apolloServer: ApolloServer<ExpressContext>;
}>;

/**
 * Creates and returns a new Apollo Server and Express App.
 *
 * Defines Express App and Apollo Server, applies express middleware,
 * creates our GraphQL schema, and returns the Apollo Server and Express App.
 * @return {CreateApolloExpressServerReturnType} Promise that resolves to an object containing the Apollo Server and Express App.
 */
export async function createApolloExpressServer(): CreateApolloExpressServerReturnType {
  try {
    // Define Express App
    const app = express();

    // Apply express middlewares
    app.use(cors(corsConfig));
    app.use(session(sessionConfig));
    app.use(rateLimit(rateLimitConfig));
    app.use(graphqlUploadExpress({ maxFileSize: 10_000_000, maxFiles: 10 }));

    // Define Apollo Server and GraphQL Schema
    const schema = await buildSchema();
    const apolloServer = new ApolloServer({
      schema,
      context: ({ req, res }) => ({
        req,
        res,
        redis: redisClient,
        userLoader: createUserLoader(),
      }),
      plugins: [
        // Allow query complexity limiting
        // TODO: After creating front-end queries/mutations, come back and change max complexity to reflect said queries/mutations
        createComplexityPlugin({
          schema,
          estimators: [fieldExtensionsEstimator(), simpleEstimator({ defaultComplexity: 1 })],
          maximumComplexity: 1000,
          onComplete: (complexity) => {
            logger.info("Query Complexity: %d", complexity);
          },
        }),
        PROD
          ? ApolloServerPluginLandingPageDisabled()
          : ApolloServerPluginLandingPageGraphQLPlayground(),
      ],
      formatError: (error) => {
        const { originalError, locations, path } = error;
        let { message } = error;
        let status = 500;

        if (originalError && originalError instanceof CustomError) {
          message = originalError.message;
          status = originalError.statusCode;
        }

        return {
          message,
          status,
          locations,
          path,
        };
      },
    });

    return {
      app,
      apolloServer,
    };
  } catch (error) {
    logger.error("Error creating Apollo Server and Express App: %s", error);
    throw new InternalServerError("Error building GraphQL schema");
  }
}
