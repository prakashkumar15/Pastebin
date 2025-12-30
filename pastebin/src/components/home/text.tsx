interface TextInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSave: () => void;
}

export default function TextInput({ value, onChange, onSave }: TextInputProps) {
  return (
    <>
      <textarea
        value={value}
        onChange={onChange}
        placeholder="Paste your text here..."
        className="
          w-full
          h-64
          p-3
          border
          border-gray-300
          rounded-md
          resize-y
          overflow-auto
          font-mono
          text-sm
          focus:outline-none
          focus:ring-2
          focus:ring-blue-500
        "
      />

      <button
        onClick={onSave}
        className="
          inline-flex
          items-center
          rounded-md
          bg-blue-600
          px-4
          py-2
          text-white
          text-sm
          font-medium
          hover:bg-blue-700
          focus:outline-none
          focus:ring-2
          focus:ring-blue-500
        "
      >
        Save paste
      </button>
    </>
  );
}
