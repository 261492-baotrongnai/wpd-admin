interface Props {
  category: string;
  count: number;
  color?: string;
}

export default function CategoryCount({ category, count }: Props) {
  return (
    <div
      className={`flex rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6`}
    >
      <span className="flex-1">{category}</span>
      <span className="flex-end">{count}</span>
    </div>
  );
}
