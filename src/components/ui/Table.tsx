interface Column<T> {
  key: string;
  header: string;
  render?: (item: T) => React.ReactNode;
  className?: string;
}

interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  onRowClick?: (item: T) => void;
  emptyMessage?: string;
  emptyIcon?: string;
}

export default function Table<T extends { _id?: string }>({ columns, data, onRowClick, emptyMessage = "No data yet", emptyIcon = "📋" }: TableProps<T>) {
  if (data.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="text-5xl mb-4">{emptyIcon}</div>
        <p className="text-sm text-gray-500 font-medium">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <table className="w-full">
      <thead>
        <tr className="text-[11px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest border-b border-gray-50 dark:border-gray-800/30">
          {columns.map((col) => (
            <th key={col.key} className={"text-left px-6 py-4 font-medium " + (col.className || "")}>{col.header}</th>
          ))}
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-50/50 dark:divide-gray-800/20">
        {data.map((item, i) => (
          <tr key={item._id || i} onClick={() => onRowClick?.(item)}
            className={"hover:bg-gray-50/50 dark:hover:bg-white/[0.02] transition-colors " + (onRowClick ? "cursor-pointer" : "")}>
            {columns.map((col) => (
              <td key={col.key} className={"px-6 py-4 " + (col.className || "")}>
                {col.render ? col.render(item) : (item as any)[col.key]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}