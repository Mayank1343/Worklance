const Input = ({
  label,
  error,
  className = "",
  ...props
}) => {
  return (
    <div className="space-y-1">
      {label && (
        <label className="font-medium">
          {label}
        </label>
      )}

      <input
        className={`
          w-full
          border
          rounded-lg
          px-3
          py-2
          outline-none
          focus:ring-2
          focus:ring-black
          ${className}
        `}
        {...props}
      />

      {error && (
        <p className="text-red-500 text-sm">
          {error}
        </p>
      )}
    </div>
  );
};

export default Input;