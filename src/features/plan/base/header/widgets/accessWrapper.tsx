// TODO: 참가자 관리 모달 만들면서
export default function AccessWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  // 1. useGetParticipants
  // 2. 생성자 혹은 참가자면 children
  // 3. 그 외는 '잘못된 접근 Toast' + 홈으로 이동
  return (
    <div className="h-full w-full flex justify-center items-center">
      {children}
    </div>
  );
}
