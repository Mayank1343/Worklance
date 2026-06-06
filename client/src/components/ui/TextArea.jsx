const TextArea = ({
  label,
  className = "",
  ...props
}) => {
  return (
    <div className="space-y-1">
      <label className="text-sm font-medium text-gray-700">
        {label}
      </label>

      <textarea
        {...props}
        className={`
          w-full
          border
          border-gray-300
          rounded-lg
          px-4
          py-3
          min-h-[120px]
          focus:outline-none
          focus:ring-2
          focus:ring-blue-500
          ${className}
        `}
      />
    </div>
  );
};

export default TextArea;