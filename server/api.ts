import { hc } from "hono/client";
import type { ApiRoutes } from ".";

// rpc api client
export const rpc = hc<ApiRoutes>("/").api;
