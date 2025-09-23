import {
  useModalStore,
  BasicModalHeader,
  BasicModalFooter,
} from "@/features/modal";
import { useUserStore } from "@/features/auth";
import useGetParticipants from "../hooks/useGetParticipants";
import { PointCard } from "@/components/card";
import SelectedParticipantDetail from "../../components/selectedParticipantDetail";
import { Spinner } from "@/components/spinner";

export default function ParticipantViewModal() {
  const { openModal, closeModal } = useModalStore();

  const { user } = useUserStore();
  const { participants, isFetching } = useGetParticipants();
  const isCreator = participants!.creator.userId === user!.userId;
  const participantDataList = participants!.participantDataList;

  return (
    <div className="p-6 w-[30rem] flex flex-col gap-4">
      <BasicModalHeader title="計画参加者" onClose={closeModal} />
      {isFetching ? (
        <div className="flex justify-center items-center h-40">
          <Spinner />
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <h2 className="text-gray-700 text-md font-[550]">生成者</h2>
              <PointCard onBorder={true} onShadow={false}>
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <span className="text-gray-700 font-medium text-sm">{`${
                      participants!.creator.lastName
                    } ${participants!.creator.firstName}`}</span>
                    {isCreator && (
                      <span className="text-gray-400 text-xs">(本人)</span>
                    )}
                  </div>
                  <span className="text-gray-400 text-xs mt-1">
                    {participants!.creator.email}
                  </span>
                </div>
              </PointCard>
            </div>
            <div className="flex flex-col gap-2">
              <h2 className="text-gray-700 text-md font-[550]">参加者</h2>
              {participantDataList.length > 0 ? (
                <div className="flex flex-col gap-2 overflow-y-auto max-h-[225px] scrollbar-custom">
                  {participantDataList.map((participant, index) => (
                    <SelectedParticipantDetail
                      key={participant.userId}
                      userId={participant.userId}
                      type="view"
                      participantIndex={index}
                      fullName={`${participant.lastName} ${participant.firstName}`}
                      email={participant.email}
                      permission={participant.permission}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-gray-400 text-sm">参加者がいません</div>
              )}
            </div>
          </div>
          {isCreator && (
            <BasicModalFooter
              cancelProps={{
                hidden: true,
              }}
              confirmProps={{
                text: "編集",
                onClick: () => {
                  const editFormDefaultValue = {
                    participants: participantDataList.map(
                      ({ id, ...rest }) => ({
                        ...rest,
                      })
                    ),
                  };
                  openModal("participantsEdit", {
                    defaultValue: editFormDefaultValue,
                  });
                },
              }}
            />
          )}
        </div>
      )}
    </div>
  );
}
