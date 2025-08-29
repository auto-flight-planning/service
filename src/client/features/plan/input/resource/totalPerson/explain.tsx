import { PointCard } from "@/client/components/card";

export default function TotalPersonExplain() {
  return (
    <div className="space-y-6">
      {/* 데이터 리스트 */}
      <div className="space-y-4">
        {/* 기장・부조종사 인수 */}
        <PointCard
          color="gray"
          background="light"
          onPointBorder
          onBorder
          onShadow={false}
        >
          <div className="space-y-3">
            <h3 className="text-md font-bold text-gray-700">
              機長・副操縦士の人数
            </h3>
            <p className="text-gray-600 leading-relaxed text-sm">
              自社に所属している機長と副操縦士の総人数です。
            </p>
          </div>
        </PointCard>

        {/* 기타 총인원 지수 */}
        <PointCard
          color="gray"
          background="light"
          onPointBorder
          onBorder
          onShadow={false}
        >
          <div className="space-y-4">
            <h3 className="text-md font-bold text-gray-700 flex items-center">
              <span className="text-yellow-500 mr-2">⭐</span>
              その他総人員
              <span className="font-bold relative inline-block ml-1">
                <span className="relative z-10">指数</span>
                <span className="absolute inset-x-0 bottom-1 h-3 bg-yellow-500 opacity-70 rounded-sm"></span>
              </span>
            </h3>
            <p className="text-gray-600 leading-relaxed text-sm">
              機長・副操縦士以外で、1か月間に自社が運航に運用可能な総人員を示す指数です。
            </p>

            {/* 주의사항 */}
            <PointCard color="yellow" background="light" onBorder>
              <div className="space-y-2">
                <div className="flex items-center gap-2 font-bold text-yellow-800">
                  <span>⚠️</span>
                  <span>注意事項</span>
                </div>
                <p className="text-yellow-700 text-xs leading-relaxed">
                  「その他総人員指数」の1単位は、運航規模別データ内の「その他必要人員指数」の1単位と同じ基準で算定されなければなりません。
                </p>
              </div>
            </PointCard>
          </div>
        </PointCard>
      </div>

      {/* 구분 이유 설명 */}
      <PointCard color="primary" background="light" onBorder onShadow={false}>
        <div className="space-y-2">
          <h3 className="text-md font-bold text-primary-700">
            機長・副操縦士とその他を分ける理由
          </h3>
          <p className="text-primary-700 leading-relaxed text-sm">
            機長・副操縦士が不足すると、たとえその他の人員が十分であっても航空機の運航は不可能になるため、区別して考える必要があります。
          </p>
        </div>
      </PointCard>
    </div>
  );
}
