import { PROD } from "./server";

export const SERVER_WIDE_RATE_LIMIT_WINDOW_MS = 1000 * 60 * 10; // 10 minutes
export const SERVER_WIDE_RATE_LIMIT_MAX = PROD ? 150 : 10_000; // 150 requests max within window, 10k for dev
export const SERVER_WIDE_RATE_LIMIT_MESSAGE = "Too many requests, please try again later.";
