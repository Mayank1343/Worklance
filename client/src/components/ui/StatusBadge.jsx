const StatusBadge = ({
  status,
}) => {

  const styles = {
    open:
      "bg-blue-100 text-blue-700",

    in_progress:
      "bg-yellow-100 text-yellow-700",

    completed:
      "bg-green-100 text-green-700",

    pending:
      "bg-yellow-100 text-yellow-700",

    accepted:
      "bg-green-100 text-green-700",

    rejected:
      "bg-red-100 text-red-700",
  };

  return (
    <span
      className={`
        px-3 py-1
        rounded-full
        text-sm
        font-medium
        ${styles[status]}
      `}
    >
      {status}
    </span>
  );
};

export default StatusBadge;