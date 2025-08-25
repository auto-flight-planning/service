import { OpenApiGeneratorV3 } from "@asteasolutions/zod-to-openapi";
import { registry } from "./registry";

console.log("Registry:", registry);

export const openApiDocument = new OpenApiGeneratorV3(
  registry.definitions
).generateDocument({
  openapi: "3.0.0",
  info: { title: "Auto Flight Planning API", version: "1.0.0" },
});

console.log("Document generated:", openApiDocument);
