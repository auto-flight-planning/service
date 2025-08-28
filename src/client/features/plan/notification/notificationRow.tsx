import { NotificationData } from "./types";

interface NotificationRowProps {
  notification: NotificationData;
  onClick?: (notification: NotificationData) => void;
}

export default function NotificationRow({
  notification,
  onClick,
}: NotificationRowProps) {
  return (
    <tr
      className="hover:bg-sky-50 transition-colors duration-200 cursor-pointer border-b border-gray-100"
      onClick={() => onClick?.(notification)}
    >
      <td className="px-4 py-3 text-sm font-medium text-gray-900 overflow-hidden text-ellipsis whitespace-nowrap">
        <strong>{notification.planName}</strong>
      </td>

      <td className="px-4 py-3 text-sm text-gray-700 overflow-hidden text-ellipsis whitespace-nowrap">
        {notification.sender}
      </td>

      <td className="px-4 py-3 text-sm text-gray-700">
        <span className="inline-block px-3 py-1 text-xs font-medium text-white bg-gray-400 rounded-2xl shadow-sm">
          {notification.message}
        </span>
      </td>

      <td className="px-4 py-3 text-xs text-gray-500 overflow-hidden text-ellipsis whitespace-nowrap">
        {notification.receivedAt}
      </td>

      <td className="px-4 py-3 text-center">
        <div className="flex items-center justify-center">
          {notification.isConfirmed ? (
            <svg
              className="w-5 h-5 text-green-500"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          ) : (
            <svg
              className="w-5 h-5 text-gray-300"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </div>
      </td>
    </tr>
  );
}
