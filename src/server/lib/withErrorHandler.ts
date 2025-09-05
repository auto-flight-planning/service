// src/server/utils/withErrorHandler.ts
import { NextResponse } from "next/server";

export default function withErrorHandler<T extends any[]>(
  handler: (...args: T) => Promise<NextResponse>
) {
  return async (...args: T): Promise<NextResponse> => {
    try {
      return await handler(...args);
    } catch (error) {
      console.error("API Error:", error);
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
