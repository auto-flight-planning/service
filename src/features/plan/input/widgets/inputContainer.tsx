import { useCheckPermission } from "@/features/plan/participant";
import { SquareButton } from "@/components/button";
import { Tooltip } from "@/components/tooltip";
import InputSubCategoryCard, {
  InputSubCategoryCardProps,
} from "../components/inputSubCategoryCard";
import { PointCard } from "@/components/card";

interface CategoryProps {
  inputItems: InputSubCategoryCardProps[];
  mailContainerMessage: string;
  onClickSendMail: () => void;
}

export default function InputContainer({
  categoryProps: { inputItems, mailContainerMessage, onClickSendMail },
}: {
  categoryProps: CategoryProps;
}) {
  // TODO: 외부 입력자 시점 추가
  const hasRequestAccess = useCheckPermission("REQUEST");

  return (
    <section className="flex flex-col gap-8 bg-white p-8 rounded-xl shadow-md mb-8">
      {/* Header */}
      <header className="mb-2">
        <h4 className="text-xl font-bold text-gray-700">データ入力</h4>
      </header>

      {/* Input Cards */}
      <section
        className={`grid grid-cols-1 lg:grid-cols-${inputItems.length} gap-6`}
      >
        {inputItems.map((item) => (
          <InputSubCategoryCard key={item.title} {...item} />
        ))}
      </section>

      {/* 案内 */}
      <PointCard
        color="light-gray"
        onBorder
        background="light"
        onShadow={false}
      >
        <p className="text-sm text-gray-700">
          📝
          各項目をクリックすると、該当データの入力内容や詳細説明を確認できます。入力権限のある方は、入力や編集も可能です。
        </p>
      </PointCard>

      {/* データ入力依頼 */}
      <PointCard
        color="primary"
        onBorder
        onPointBorder={false}
        background="light"
        onShadow={false}
      >
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="text-primary-500">📧</span>
            <h3 className="font-bold text-gray-700">データ入力依頼</h3>
          </div>
          <p className="text-sm text-gray-700 whitespace-pre-line leading-3">
            {mailContainerMessage}
          </p>
          <div>
            {!hasRequestAccess ? (
              <Tooltip
                text="依頼権限のある方のみ、送信できます"
                className="inline-block"
              >
                <SquareButton
                  text="依頼を送信"
                  color="primary"
                  size="md"
                  disabled={true}
                />
              </Tooltip>
            ) : (
              <SquareButton
                text="依頼を送信"
                color="primary"
                size="md"
                onClick={onClickSendMail}
              />
            )}
          </div>
        </div>
      </PointCard>
    </section>
  );
}
