import { PointCard } from "@/components/card";

export default function PerFlightScaleExplain() {
  return (
    <div className="space-y-6">
      {/* 총항공기수 */}
      <PointCard
        color="gray"
        background="light"
        onPointBorder
        onBorder
        onShadow={false}
      >
        <div className="space-y-3">
          <h3 className="text-md font-bold text-gray-700">総航空機数</h3>
          <p className="text-gray-600 leading-relaxed text-sm">
            自社で該当運航規模の航空機を総何機保有しているかです。
          </p>
        </div>
      </PointCard>

      {/* 최소대기항공기수 */}
      <PointCard
        color="gray"
        background="light"
        onPointBorder
        onBorder
        onShadow={false}
      >
        <div className="space-y-3">
          <h3 className="text-md font-bold text-gray-700">最小待機航空機数</h3>
          <p className="text-gray-600 leading-relaxed text-sm">
            航空機の故障など緊急代替状況に備えるため、常に待機状態にしておくべき最小航空機数です。
          </p>
        </div>
      </PointCard>

      {/* 좌석수 */}
      <PointCard
        color="gray"
        background="light"
        onPointBorder
        onBorder
        onShadow={false}
      >
        <div className="space-y-3">
          <h3 className="text-md font-bold text-gray-700">座席数</h3>
          <p className="text-gray-600 leading-relaxed text-sm">
            該当運航規模の航空機の座席数です。
          </p>
        </div>
      </PointCard>

      {/* 필요인원데이터 */}
      <PointCard
        color="gray"
        background="light"
        onPointBorder
        onBorder
        onShadow={false}
      >
        <div className="space-y-4">
          <h3 className="text-md font-bold text-gray-700">必要人員データ</h3>

          {/* 기장・부조종사 인수 */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 bg-primary-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
                1
              </div>
              <h4 className="font-semibold text-gray-700">
                機長・副操縦士の人数
              </h4>
            </div>
            <p className="text-gray-600 text-sm ml-7">
              この運航規模で必要な機長と副操縦士の人数です。
            </p>
          </div>

          {/* 기타필요인원지수 */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 bg-primary-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
                2
              </div>
              <h4 className="font-semibold text-gray-700">
                その他必要人員指数
              </h4>
            </div>
            <p className="text-gray-600 text-sm ml-7">
              機長・副操縦士以外で、最大乗客数ごとに必要な自社人員指数です。
            </p>
          </div>

          {/* 예시 테이블 */}
          <div className="ml-7 space-y-3">
            <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
              <span>💡</span>
              <span>例</span>
            </div>
            <div className="overflow-hidden rounded-md border border-gray-200">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="py-2 px-3 text-center font-semibold text-gray-700 border-r border-gray-200">
                      最大乗客数
                    </th>
                    <th className="py-2 px-3 text-center font-semibold text-gray-700">
                      その他必要人員指数
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-gray-200">
                    <td className="py-2 px-3 text-center border-r border-gray-200">
                      400人
                    </td>
                    <td className="py-2 px-3 text-center">10</td>
                  </tr>
                  <tr className="border-t border-gray-200 bg-gray-25">
                    <td className="py-2 px-3 text-center border-r border-gray-200">
                      450人
                    </td>
                    <td className="py-2 px-3 text-center">11</td>
                  </tr>
                  <tr className="border-t border-gray-200">
                    <td className="py-2 px-3 text-center border-r border-gray-200">
                      500人
                    </td>
                    <td className="py-2 px-3 text-center">12</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* 주의사항 */}
          <PointCard color="yellow" background="light" onBorder>
            <div className="space-y-2">
              <div className="flex items-center gap-2 font-bold text-yellow-800">
                <span>⚠️</span>
                <span>注意事項</span>
              </div>
              <p className="text-yellow-700 text-xs leading-relaxed">
                「その他必要人員指数」の1単位は、総人員データ内の「その他総人員指数」の1単位と同じ基準で算定されなければなりません。
              </p>
            </div>
          </PointCard>

          {/* 정보 섹션 */}
          <PointCard color="primary" background="light" onBorder>
            <div className="space-y-2">
              <div className="flex items-center gap-2 font-bold text-primary-700">
                <span>ℹ️</span>
                <span>本システムでは外部人員は考慮しません</span>
              </div>
            </div>
          </PointCard>
        </div>
      </PointCard>

      {/* 비행전후 필요시간 */}
      <PointCard
        color="gray"
        background="light"
        onPointBorder
        onBorder
        onShadow={false}
      >
        <div className="space-y-3">
          <h3 className="text-md font-bold text-gray-700">
            飛行前後に必要な時間
          </h3>
          <p className="text-gray-600 leading-relaxed text-sm">
            運航準備を開始してから、次の運航に直ちに切り替えられる状態になるまでの所要時間です。
          </p>
        </div>
      </PointCard>

      {/* 운항가능최소수익 */}
      <PointCard
        color="gray"
        background="light"
        onPointBorder
        onBorder
        onShadow={false}
      >
        <div className="space-y-3">
          <h3 className="text-md font-bold text-gray-700 flex items-center gap-2">
            <span className="text-yellow-500">⭐</span>
            運航可能最小収益
            <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full font-medium">
              財務部入力
            </span>
          </h3>
          <p className="text-gray-600 leading-relaxed text-sm">
            予測収益が一定基準以上にならない場合は運航しないという制限です（燃料費、人件費、空港使用料、機材減価償却費などを考慮）。
          </p>
        </div>
      </PointCard>
    </div>
  );
}
