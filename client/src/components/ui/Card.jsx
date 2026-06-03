const Card = ({
  children,
  className = "",
}) => {
  return (
    <div
      className={`
        bg-white
        border
        rounded-xl
        p-5
        shadow-sm
        hover:shadow-lg
        transition
        duration-300
        ${className}
      `}
    >
      {children}
    </div>
  );
};

export default Card;