import useHandleForm from "../../hooks/useHandleForm";
import { SquareButton } from "@/components/button";

export default function FlightScaleDataFormHeader() {
  const {
    useCurrentIndexState: [currentIndex, setCurrentIndex],
    fields,
    addItem,
    removeItem,
  } = useHandleForm();
  const flightScaleNames = fields.map((field) => field.name);

  return (
    <section className="flex gap-3 items-center max-w-full pb-2 overflow-x-scroll scrollbar-custom">
      {flightScaleNames.map((name, index) => (
        <div key={index} className="relative group">
          <SquareButton
            text={name}
            onClick={() => setCurrentIndex(index)}
            color={currentIndex === index ? "primary" : "light-gray"}
          />
          {flightScaleNames.length > 1 && (
            <button
              type="button"
              className="absolute bottom-0 left-1/2 w-4 h-4 bg-red-500 text-white rounded-full flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-red-600 hover:cursor-pointer active:scale-95 transform -translate-x-1/2 translate-y-1/2"
              onClick={(e) => {
                e.stopPropagation();
                removeItem(index);
              }}
            >
              ×
            </button>
          )}
        </div>
      ))}
      <button
        className="text-sm text-primary-500 border-1 border-primary-500 border-dotted rounded-md px-4 py-2 transition-all duration-300 hover:bg-primary-50 hover:cursor-pointer active:scale-95"
        onClick={addItem}
        type="button"
      >
        追加
      </button>
    </section>
  );
}
