import {
  extendZodWithOpenApi,
  OpenAPIRegistry,
} from "@asteasolutions/zod-to-openapi";
import { z } from "zod";

extendZodWithOpenApi(z);

// import { resourceRequestSchema, resourceResponseSchema } from '../schemas/createResource';

import { registerLoginSchemas } from "@/features/employee/check-employee/openapi";
import { registerGetEmployeeSchemas } from "@/features/employee/get-employee/openapi";
import { registerSearchEmployeeSchemas } from "@/features/employee/search-employee/openapi";
import { registerCreatePlanSchemas } from "@/server/features/plan/create/openapi";
import { registerGetNotificationSchemas } from "@/server/features/plan/notification/get/openapi";
import { registerGetPlanOneSchemas } from "@/server/features/plan/get/one/openapi";
import {
  registerUpdateFlightScaleResourceSchemas,
  registerUpdateTotalPersonResourceSchemas,
} from "@/server/features/plan/input/resource/update/openapi";
import {
  registerGetFlightScaleResourceSchemas,
  registerGetTotalPersonResourceSchemas,
} from "@/server/features/plan/input/resource/get/openapi";
import { registerGetResultSchemas } from "@/server/features/plan/result/openapi";

export const registry = new OpenAPIRegistry();

// 共通スキーマ
// registry.register('ResourceRequestSchema', resourceRequestSchema);
// registry.register('ResourceResponseSchema', resourceResponseSchema);

// Result (Dummy)
registerGetResultSchemas(registry);

// API別
registerLoginSchemas(registry);
registerGetEmployeeSchemas(registry);
registerSearchEmployeeSchemas(registry);
registerCreatePlanSchemas(registry);
registerGetNotificationSchemas(registry);
registerGetPlanOneSchemas(registry);
registerUpdateTotalPersonResourceSchemas(registry);
registerGetTotalPersonResourceSchemas(registry);
registerUpdateFlightScaleResourceSchemas(registry);
registerGetFlightScaleResourceSchemas(registry);
