import {
  BASIC_STATUS_OPTIONS,
  type BasicStatus,
  type StatusItem,
} from "../type";

const getStatusIcon = (status: BasicStatus) => {
  switch (status) {
    case BASIC_STATUS_OPTIONS.COMPLETED:
      return <span className="text-green-500 font-bold">✓</span>;
    case BASIC_STATUS_OPTIONS.IN_PROGRESS:
      return <span className="text-primary-500 font-bold">⋯</span>;
    case BASIC_STATUS_OPTIONS.NOT_STARTED:
    default:
      return <span className="text-gray-300 font-bold">○</span>;
  }
};

export default function ListItemStatus({
  index,
  item,
}: {
  index: number;
  item: StatusItem;
}) {
  return (
    <li key={index} className="flex items-center gap-3">
      {getStatusIcon(item.status)}
      <span
        className={`text-sm
          ${
            item.status === BASIC_STATUS_OPTIONS.NOT_STARTED
              ? "text-gray-400"
              : "text-gray-700"
          }`}
      >
        {item.label}
      </span>
    </li>
  );
}
