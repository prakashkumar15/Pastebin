interface AlertProps {
  type: "error" | "success";
  message: string;
  onClose: () => void;
}

export default function Alert({ type, message, onClose }: AlertProps) {
  const isError = type === "error";

  return (
    <div
      className={`p-4 rounded-md flex items-start gap-3 ${
        isError
          ? "bg-red-50 border border-red-200"
          : "bg-green-50 border border-green-200"
      }`}
    >
      <div className={`text-lg ${isError ? "text-red-600" : "text-green-600"}`}>
        {isError ? "⚠️" : "✓"}
      </div>

      <div className="flex-1">
        <p
          className={`text-sm font-medium ${
            isError ? "text-red-800" : "text-green-800"
          }`}
        >
          {message}
        </p>
      </div>

      <button
        onClick={onClose}
        className={`text-sm font-medium ${
          isError
            ? "text-red-600 hover:text-red-700"
            : "text-green-600 hover:text-green-700"
        }`}
      >
        ✕
      </button>
    </div>
  );
}
