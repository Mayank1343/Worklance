const Button = ({
  children,
  type = "button",
  variant = "primary",
  isLoading = false,
  className = "",
  ...props
}) => {
  const variants = {
    primary:
      "bg-black text-white hover:bg-gray-800",

    secondary:
      "bg-gray-200 text-black hover:bg-gray-300",

    danger:
      "bg-red-500 text-white hover:bg-red-600",
  };

  return (
    <button
      type={type}
      disabled={isLoading}
      className={`
        px-4 py-2 rounded-lg
        transition
        disabled:opacity-50
        disabled:cursor-not-allowed
        ${variants[variant]}
        ${className}
      `}
      {...props}
    >
      {isLoading ? "Loading..." : children}
    </button>
  );
};

export default Button;