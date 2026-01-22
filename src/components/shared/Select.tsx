type Props = {
  label?: string;
  options: string[];
  disabled?: boolean;
  value?: string;
  onChange?: (value: string) => void;
  required?: any
};

export const Select = ({
  label,
  options,
  disabled = false,
  value = '',
  onChange,
  required,
}: Props) => (
  <div className="w-full">
    {label && <label className="block mb-1 opacity-85">{label}</label>}
    <select
      className={`w-full border border-gray-300 rounded-lg px-2 py-2 focus:outline-none  ${
        disabled ? 'bg-gray-300' : 'cursor-pointer '
      }`}
      required={required}
      disabled={disabled}
      value={value} // controlled value
      onChange={e => onChange?.(e.target.value)} // value update
    >
      <option value="">Please Select</option>
      {options.map((opt, i) => (
        <option key={i} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  </div>
);
