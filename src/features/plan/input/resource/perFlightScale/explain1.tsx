import { PointCard } from "@/components/card";

export default function FlightScaleExplain() {
  return (
    <div className="space-y-6">
      {/* 운항규모의 종류 */}
      <PointCard
        color="gray"
        background="light"
        onPointBorder
        onBorder
        onShadow={false}
      >
        <div className="space-y-4">
          <h3 className="text-md font-bold text-gray-700">運航規模の種類</h3>
          <p className="text-gray-600 leading-relaxed text-sm">
            自社保有の航空機に応じて運航規模を区分したものです。航空機の大きさ、座席配置、乗客定員などの特徴に基づいて分類します。
          </p>

          {/* 예시 */}
          <PointCard
            color="deepGray"
            background="light"
            onBorder
            onShadow={false}
          >
            <div className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
              <span>💡</span>
              <span>例</span>
            </div>
            <ul className="ml-1 space-y-1 text-sm text-gray-700">
              <li className="relative pl-3">
                <span className="absolute left-0 text-gray-600">•</span>
                大規模運航（2階建て・3列）
              </li>
              <li className="relative pl-3">
                <span className="absolute left-0 text-gray-600">•</span>
                中規模運航（1階建て・3列）
              </li>
              <li className="relative pl-3">
                <span className="absolute left-0 text-gray-600">•</span>
                小規模運航（1階建て・2列）
              </li>
            </ul>
          </PointCard>
        </div>
      </PointCard>

      {/* 사용 용도 설명 */}
      <PointCard color="primary" background="light" onBorder onShadow={false}>
        <div className="space-y-2">
          <h3 className="text-md font-bold text-primary-700">
            この運航規模種類の使い道
          </h3>
          <p className="text-primary-700 leading-relaxed text-sm">
            ここで設定した運航規模の種類は、次の「運航規模別データ」で各規模について総航空機数、座席数、必要人員データなどの詳細情報を入力する際の基準として使用されます。
          </p>
        </div>
      </PointCard>
    </div>
  );
}
