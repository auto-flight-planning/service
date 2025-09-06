// TODO: delete
import { NextResponse } from "next/server";
import { ZodError } from "zod";

export default function withErrorHandler<T extends any[]>(
  handler: (...args: T) => Promise<NextResponse>
) {
  return async (...args: T): Promise<NextResponse> => {
    try {
      return await handler(...args);
    } catch (error) {
      console.error("API Error:", error);

      // 400: Zod validation
      if (error instanceof ZodError) {
        return NextResponse.json(
          { error: "不正なリクエストです" },
          { status: 400 }
        );
      }

      return NextResponse.json(
        {
          error:
            "サーバーエラーが発生しました。しばらく時間をおいて再度お試しください。",
        },
        { status: 500 }
      );
    }
  };
}
