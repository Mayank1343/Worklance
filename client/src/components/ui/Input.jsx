const Input = ({
  label,
  className = "",
  ...props
}) => {
  return (
    <div className="space-y-1">
      {label && (
        <label
          className="
            text-sm
            font-medium
            text-gray-700
          "
        >
          {label}
        </label>
      )}

      <input
        {...props}
        className={`
          w-full
          border
          border-gray-300
          rounded-lg
          px-4
          py-3
          focus:outline-none
          focus:ring-2
          focus:ring-blue-500
          ${className}
        `}
      />
    </div>
  );
};

export default Input;