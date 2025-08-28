import {
  extendZodWithOpenApi,
  OpenAPIRegistry,
} from "@asteasolutions/zod-to-openapi";
import { z } from "zod";

extendZodWithOpenApi(z);

// import { resourceRequestSchema, resourceResponseSchema } from '../schemas/createResource';

import { registerLoginSchemas } from "@/server/features/user/check-employee/openapi";
import { registerGetEmployeeSchemas } from "@/server/features/user/get-employee/openapi";
import { registerSearchEmployeeSchemas } from "@/server/features/user/search-employee/openapi";

export const registry = new OpenAPIRegistry();

// 共通スキーマ
// registry.register('ResourceRequestSchema', resourceRequestSchema);
// registry.register('ResourceResponseSchema', resourceResponseSchema);

// API別
registerLoginSchemas(registry);
registerGetEmployeeSchemas(registry);
registerSearchEmployeeSchemas(registry);
