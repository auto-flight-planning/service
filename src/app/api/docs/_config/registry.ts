import {
  extendZodWithOpenApi,
  OpenAPIRegistry,
} from "@asteasolutions/zod-to-openapi";
import { z } from "zod";

extendZodWithOpenApi(z);

// ---------------Legacy------------------
// import { registerGetNotificationSchemas } from "@/features/plan/notification/get/api/openapi";
// import {
//   registerUpdateFlightScaleResourceSchemas,
//   registerUpdateTotalPersonResourceSchemas,
// } from "@/features/plan/input/resource/update/openapi";
// import {
//   registerGetFlightScaleResourceSchemas,
//   registerGetTotalPersonResourceSchemas,
// } from "@/features/plan/input/resource/get/openapi";
// import { registerGetResultSchemas } from "@/features/plan/result/server/createPlanResult/openapi";
// ---------------Legacy------------------

// ["Employee"]
import { registerEmployeeAPIsToDocs } from "@/features/employee/server/openapi";

// ["Plan"]
import { registerPlanAPIsToDocs } from "@/features/plan/base/server/openapi";
import { registerPlanParticipantsAPIsToDocs } from "@/features/plan/participant/servers/openapi";

export const registry = new OpenAPIRegistry();

registry.registerComponent("securitySchemes", "bearerAuth", {
  type: "http",
  scheme: "bearer",
  bearerFormat: "JWT",
});

// API別
registerEmployeeAPIsToDocs(registry);
registerPlanAPIsToDocs(registry);
registerPlanParticipantsAPIsToDocs(registry);

// registerGetNotificationSchemas(registry);
// registerUpdateTotalPersonResourceSchemas(registry);
// registerGetTotalPersonResourceSchemas(registry);
// registerUpdateFlightScaleResourceSchemas(registry);
// registerGetFlightScaleResourceSchemas(registry);
// registerGetResultSchemas(registry); // Result (Dummy)
