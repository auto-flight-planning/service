import {
  extendZodWithOpenApi,
  OpenAPIRegistry,
} from "@asteasolutions/zod-to-openapi";
import { z } from "zod";

extendZodWithOpenApi(z);

// import { resourceRequestSchema, resourceResponseSchema } from '../schemas/createResource';

import { registerLoginSchemas } from "@/server/features/auth/check-employee/openapi";

export const registry = new OpenAPIRegistry();

// 共通スキーマ
// registry.register('ResourceRequestSchema', resourceRequestSchema);
// registry.register('ResourceResponseSchema', resourceResponseSchema);

// API別
registerLoginSchemas(registry);
