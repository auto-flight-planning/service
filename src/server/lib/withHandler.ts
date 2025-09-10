import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { getServerClient } from "@/supabase/serverClient";
import { User } from "@supabase/supabase-js";
import { NotFoundError } from "./errors";

type HandlerOptions = {
  onError?: boolean;
  onAuth?: boolean;
};

type HandlerFunction<T extends any[]> = (...args: T) => Promise<NextResponse>;

type AuthHandlerFunction<T extends any[]> = (
  ...args: [...T, user: User]
) => Promise<NextResponse>;

export default function withHandler<T extends any[]>(
  handler: HandlerFunction<T> | AuthHandlerFunction<T>,
  options: HandlerOptions = { onError: true, onAuth: false }
) {
  return async (...args: T): Promise<NextResponse> => {
    const { onError = true, onAuth = false } = options;

    try {
      let user = null;

      if (onAuth) {
        const supabase = await getServerClient();
        const {
          data: { user: authUser },
          error: authError,
        } = await supabase.auth.getUser();

        if (authError || !authUser) {
          return NextResponse.json(
            { error: "認証が必要です" },
            { status: 401 }
          );
        }
        user = authUser;
      }

      if (onAuth && user) {
        return await (handler as AuthHandlerFunction<T>)(...args, user);
      } else {
        return await (handler as HandlerFunction<T>)(...args);
      }
    } catch (error) {
      if (!onError) {
        throw error;
      }

      console.error("API Error:", error);

      // 400: Request Body パース エラー
      if (error instanceof SyntaxError) {
        return NextResponse.json(
          { error: "Request Bodyのパースに失敗しました" },
          { status: 400 }
        );
      }

      // 400: Zod validation
      if (error instanceof ZodError) {
        return NextResponse.json(
          { error: "パースに失敗しました。" },
          { status: 400 }
        );
      }

      // その他
      if (error instanceof NotFoundError) {
        return NextResponse.json(
          { error: error.message },
          { status: error.statusCode }
        );
      }

      // 500: サーバーエラー
      return NextResponse.json(
        {
          error: "サーバーエラーが発生しました。",
        },
        { status: 500 }
      );
    }
  };
}
