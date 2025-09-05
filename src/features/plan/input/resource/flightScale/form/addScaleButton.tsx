import { useFormContext } from "react-hook-form";

interface AddScaleButtonProps {
  onAdd: () => void;
}

export default function AddScaleButton({ onAdd }: AddScaleButtonProps) {
  const handleAdd = () => {
    console.log("➕ Adding new item");
    onAdd();
  };

  return (
    <button
      type="button"
      onClick={handleAdd}
      className="w-full p-4 border-2 border-dashed bg-primary-100 border-primary-500 text-primary-600 rounded-lg hover:border-primary-700 hover:bg-primary-200 active:scale-95 active:bg-primary-300 transition-all flex items-center justify-center gap-2 font-medium hover:cursor-pointer"
    >
      <span className="text-lg">+</span>
      運航規模を追加
    </button>
  );
}
