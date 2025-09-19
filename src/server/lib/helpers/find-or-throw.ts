import { NotFoundError } from "../errors";

export async function findOrThrow<T>(
  fn: () => Promise<T | null>,
  message = "Not found"
): Promise<T> {
  const result = await fn();
  if (!result) throw new NotFoundError(message);
  return result;
}
