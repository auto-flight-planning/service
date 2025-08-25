import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import { loginReqSchema, loginResSchema } from "./schema";

export const registerLoginSchemas = (registry: OpenAPIRegistry) => {
  registry.registerPath({
    method: "post",
    path: "/api/auth/login",
    tags: ["Auth"],
    request: {
      body: {
        content: {
          "application/json": {
            schema: loginReqSchema,
          },
        },
      },
    },
    responses: {
      200: {
        description: "ログインに成功しました",
        content: {
          "application/json": {
            schema: loginResSchema,
          },
        },
      },
      401: {
        description: "パスワードが間違っています",
      },
      404: {
        description: "存在しない職員IDまたはユーザーです",
      },
    },
  });
};
