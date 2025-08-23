"use client";

import { useEffect, useState } from "react";

interface ToastProps {
  id: string;
  type: "success" | "error";
  title: string;
  message: string;
  onClose: () => void;
  duration?: number;
}

export default function Toast({
  id,
  type,
  title,
  message,
  onClose,
  duration = 3000,
}: ToastProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    // 진입 애니메이션
    const showTimer = setTimeout(() => setIsVisible(true), 100);

    // 진행바 애니메이션
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev <= 0) return 0;
        return prev - 100 / (duration / 100);
      });
    }, 100);

    // 자동 제거
    const hideTimer = setTimeout(() => {
      setIsExiting(true);
      setIsVisible(false);
      setTimeout(() => {
        onClose();
      }, 300); // 슬라이드 아웃 애니메이션 완료 후 제거
    }, duration - 300); // 애니메이션 시간을 고려하여 300ms 일찍 시작

    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
      clearInterval(progressInterval);
    };
  }, [duration, onClose]);

  const getToastStyles = () => {
    const baseStyles =
      "bg-white rounded-xl p-4 shadow-lg border min-w-[300px] max-w-[400px] transform transition-all duration-300 ease-in-out flex items-center gap-3 mb-3 relative overflow-hidden";

    if (type === "success") {
      return `${baseStyles} border-l-4 border-l-primary-500`;
    } else {
      return `${baseStyles} border-l-4 border-l-red`;
    }
  };

  const getIconStyles = () => {
    if (type === "success") {
      return "bg-primary-500 text-white";
    } else {
      return "bg-red text-white";
    }
  };

  const handleClose = () => {
    setIsExiting(true);
    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  return (
    <div
      id={id}
      className={`${getToastStyles()} ${
        isVisible && !isExiting
          ? "translate-x-0 opacity-100"
          : "translate-x-full opacity-0"
      }`}
    >
      {/* 아이콘 */}
      <div
        className={`${getIconStyles()} w-6 h-6 rounded-full flex items-center justify-center text-sm flex-shrink-0`}
      >
        {type === "success" ? "✓" : "×"}
      </div>

      {/* 내용 */}
      <div className="flex-1">
        <h4 className="text-sm font-semibold text-gray-700 mb-0.5">{title}</h4>
        <p className="text-xs text-gray-500 leading-relaxed">{message}</p>
      </div>

      {/* 닫기 버튼 */}
      <button
        onClick={handleClose}
        className="bg-none border-none text-gray-400 hover:text-gray-600 hover:bg-gray-100 cursor-pointer text-xl p-0 w-5 h-5 flex items-center justify-center rounded-full transition-all duration-200 flex-shrink-0"
      >
        ×
      </button>

      {/* 진행바 */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-200">
        <div
          className={`h-full transition-all duration-100 ease-linear ${
            type === "success" ? "bg-primary-500" : "bg-red"
          }`}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
