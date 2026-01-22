type Props = {
  label: string;
  options: string[];
};

export const Toggle = ({ label, options }: Props) => (
  <div className="mt-5">
    <p className="font-medium mb-1 ">{label}</p>
    <div className="flex flex-col">
      {options.map((opt, i) => (
        <label key={i} className="flex items-center gap-2">
          <input type="radio" name={label} />
          {opt}
        </label>
      ))}
    </div>
  </div>
);
