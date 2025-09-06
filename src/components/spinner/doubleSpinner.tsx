export default function DoubleSpinner() {
  return (
    <div className="w-16 h-16 border-4 border-blue-200 rounded-full animate-spin">
      <div className="absolute top-0 left-0 w-16 h-16 border-4 border-transparent border-t-primary-500 rounded-full animate-spin"></div>
    </div>
  );
}
