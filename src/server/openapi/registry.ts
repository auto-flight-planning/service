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
import { registerCreatePlanSchemas } from "@/server/features/plan/create/openapi";
import { registerGetNotificationSchemas } from "../features/plan/notification/get/openapi";
import { registerGetPlanOneSchemas } from "../features/plan/get/one/openapi";
import {
  registerUpdateFlightScaleResourceSchemas,
  registerUpdateTotalPersonResourceSchemas,
} from "../features/plan/input/resource/update/openapi";
import {
  registerGetFlightScaleResourceSchemas,
  registerGetTotalPersonResourceSchemas,
} from "../features/plan/input/resource/get/openapi";
import { registerGetResultSchemas } from "../features/plan/result/openapi";

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
