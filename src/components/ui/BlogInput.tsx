interface InputProps {
  value: string;
  onChange: (newValue: string) => void;
  placeholder?: string;
}

export const BlogInput = ({ value, onChange, placeholder }: InputProps) => {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)} 
      placeholder={placeholder || "Enter text"}
      className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
    />
  );
};
