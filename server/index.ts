import { serve } from "@hono/node-server";
import { serveStatic } from "@hono/node-server/serve-static";
import { config } from "dotenv";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { authRoute } from "./routes/auth";
config();

// initalize application
const app = new Hono();

// routes handle
const apiRoutes = app
  .basePath("/api")
  .route("/auth", authRoute)
  .get("/hello", (c) => c.json({ msg: "hello world", date: new Date() }));

// middlewares
app.use(logger());
app.use(
  "*",
  cors({
    origin: (origin) => origin,
    allowHeaders: ["Content-Type"],
    credentials: true,
  }),
);

// assets
app.get("*", serveStatic({ root: "dist" }));
app.get("*", serveStatic({ path: "dist/index.html" }));

// launch
const port = Number(process.env.PORT);
serve(
  {
    fetch: app.fetch,
    port,
  },
  () => console.log("launching... 🚀"),
);

export type ApiRoutes = typeof apiRoutes;
