import snakecaseKeys from "snakecase-keys";
import { errorResToMessage } from "./utils";

async function handleResponse<T>(
  res: Response,
  method: string,
  url: string
): Promise<T> {
  if (!res.ok) {
    throw new Error(errorResToMessage(res, `${method || "GET"} ${url}`));
  }

  const data = await res.json();
  return data as T;
}

export async function apiFetchJson<T>(
  url: string,
  init: Omit<RequestInit, "body"> & { body?: Record<string, any> } = {}
): Promise<T> {
  const { body, ...rest } = init;

  const finalInit: RequestInit = {
    ...rest,
    headers: {
      "Content-Type": "application/json",
      ...rest.headers,
    },
    body: body
      ? JSON.stringify(snakecaseKeys(body, { deep: true }))
      : undefined,
  };

  const res = await fetch(url, finalInit);
  return handleResponse<T>(res, finalInit.method ?? "GET", url);
}

export async function apiFetchFormData<T>(
  url: string,
  init: Omit<RequestInit, "body"> & { body: FormData }
): Promise<T> {
  const { body, ...rest } = init;

  const finalInit: RequestInit = {
    ...rest,
    body,
    headers: {
      ...rest.headers,
    },
  };

  const res = await fetch(url, finalInit);
  return handleResponse<T>(res, finalInit.method ?? "GET", url);
}
