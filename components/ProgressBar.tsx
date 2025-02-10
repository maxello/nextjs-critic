const ProgressBar = ({
  value,
  status
}: {
  value: number,
  status: 'positive' | 'mixed' | 'negative'
}) => {
  const bgColorVariants = {
    positive: "bg-success/20",
    mixed: "bg-warning/20",
    negative: "bg-danger/20"
  };
  const colorVariants = {
    positive: "bg-success",
    mixed: "bg-warning",
    negative: "bg-danger",
  };
  return (
    <div className={`relative h-2 w-full overflow-hidden rounded-full ${bgColorVariants[status]}`}>
      <div
        className={`h-full w-full flex-1 ${colorVariants[status]} transition-all`}
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />
    </div>
  )
}

export default ProgressBar;
