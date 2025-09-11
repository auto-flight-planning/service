import { ListDataItem, StatusEnum } from "../type";

const getStatusIcon = (status: StatusEnum) => {
  switch (status) {
    case StatusEnum.COMPLETED:
      return <span className="text-green-500 font-bold">✓</span>;
    case StatusEnum.IN_PROGRESS:
      return <span className="text-primary-500 font-bold">⋯</span>;
    case StatusEnum.NOT_STARTED:
    default:
      return <span className="text-gray-300 font-bold">○</span>;
  }
};

export default function ListItemStatus({
  index,
  item,
}: {
  index: number;
  item: ListDataItem;
}) {
  return (
    <li key={index} className="flex items-center gap-3">
      {getStatusIcon(item.status)}
      <span
        className={`text-sm
          ${
            item.status === StatusEnum.NOT_STARTED
              ? "text-gray-400"
              : "text-gray-700"
          }`}
      >
        {item.label}
      </span>
    </li>
  );
}
