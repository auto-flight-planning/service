import {
  extendZodWithOpenApi,
  OpenAPIRegistry,
} from "@asteasolutions/zod-to-openapi";
import { z } from "zod";

extendZodWithOpenApi(z);

// ---------------Legacy------------------
import { registerLoginSchemas } from "@/features/employee/check-employee/openapi";
// import { registerGetEmployeeSchemas } from "@/features/employee/get-employee/openapi";
// import { registerSearchEmployeeSchemas } from "@/features/employee/search-employee/openapi";
import { registerCreatePlanSchemas } from "@/features/plan/base/create/api/openapi";
import { registerGetNotificationSchemas } from "@/features/plan/notification/get/api/openapi";
import { registerGetPlanOneSchemas } from "@/features/plan/base/get/one/api/openapi";
import {
  registerUpdateFlightScaleResourceSchemas,
  registerUpdateTotalPersonResourceSchemas,
} from "@/features/plan/input/resource/update/openapi";
import {
  registerGetFlightScaleResourceSchemas,
  registerGetTotalPersonResourceSchemas,
} from "@/features/plan/input/resource/get/openapi";
import { registerGetResultSchemas } from "@/features/plan/result/server/createPlanResult/openapi";
// ---------------Legacy------------------

// ["Employee"]
import { registerEmployeeSchemas } from "@/features/employee/server/openapi";

export const registry = new OpenAPIRegistry();

registry.registerComponent("securitySchemes", "bearerAuth", {
  type: "http",
  scheme: "bearer",
  bearerFormat: "JWT",
});

// API別
registerGetResultSchemas(registry); // Result (Dummy)
registerEmployeeSchemas(registry);
registerLoginSchemas(registry);
// registerGetEmployeeSchemas(registry);
// registerSearchEmployeeSchemas(registry);
registerCreatePlanSchemas(registry);
registerGetNotificationSchemas(registry);
registerGetPlanOneSchemas(registry);
registerUpdateTotalPersonResourceSchemas(registry);
registerGetTotalPersonResourceSchemas(registry);
registerUpdateFlightScaleResourceSchemas(registry);
registerGetFlightScaleResourceSchemas(registry);
