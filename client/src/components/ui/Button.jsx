const Button = ({
  children,
  variant = "primary",
  ...props
}) => {
  const styles = {
    primary:
      "bg-blue-600 text-white",

    danger:
      "bg-red-600 text-white",

    secondary:
      "bg-gray-700 text-white",
  };

  return (
    <button
      {...props}
      className={`
        ${styles[variant]}
        px-4
        py-2
        rounded
        transition
      `}
    >
      {children}
    </button>
  );
};

export default Button;