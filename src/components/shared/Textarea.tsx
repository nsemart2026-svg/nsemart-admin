type Props = {
  label?: string;
  placeholder?: string;
  rows?: number;
  disabled?: boolean;
};

export const Textarea = ({
  label,
  placeholder,
  rows = 3,
  disabled = false,
}: Props) => (
  <div>
    {label && (
      <label className="block font-medium mb-1 mt-4 text-gray-600">
        {label}
      </label>
    )}
    <textarea
      rows={rows}
      placeholder={placeholder}
      disabled={disabled}
      className={`w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none ${
        disabled ? "bg-gray-100 cursor-not-allowed" : ""
      }`}
    />
  </div>
);
