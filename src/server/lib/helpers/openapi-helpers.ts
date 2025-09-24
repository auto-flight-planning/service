import { type ParticipantPermission } from "@/features/plan/participant/type";

export const commonOpenApiResponses = ({
  auth = false,
  planNotFound = false,
  permission = false,
  permissionType = undefined,
}: {
  auth?: boolean;
  planNotFound?: boolean;
  permission?: boolean;
  permissionType?: "CREATOR" | ParticipantPermission;
}) => ({
  400: {
    description: "パースに失敗しました。",
  },
  ...(auth && {
    401: {
      description: "認証が必要です",
    },
  }),
  ...(permission && {
    ...(permissionType === "CREATOR"
      ? {
          403: {
            description: "計画の生成者のみ使用権限があります",
          },
        }
      : {
          403: {
            description: "使用権限のないユーザーです",
          },
        }),
  }),
  ...(planNotFound && {
    404: {
      description: "計画関連の情報が見つかりません",
    },
  }),
  500: {
    description: "サーバーエラーが発生しました",
  },
});
