const StatCard = ({
  title,
  value,
}) => {
  return (
    <div
      className="
        bg-white
        rounded-2xl
        p-6
        border
        shadow-sm
        hover:shadow-md
        transition-all
        duration-300
      "
    >
      <p
        className="
          text-sm
          font-medium
          text-gray-500
          uppercase
          tracking-wide
        "
      >
        {title}
      </p>

      <h2
        className="
          text-4xl
          font-bold
          text-gray-900
          mt-3
        "
      >
        {value}
      </h2>
    </div>
  );
};

export default StatCard;