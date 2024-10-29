import { useTranslation } from "react-i18next";

import { cn } from "@/lib/utils";

import { Column } from "@tanstack/react-table";

interface DataTableColumnHeaderProps<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>;
  title: string;
}

export function DataTableColumnHeader<TData, TValue>({
  column,
  title,
  className,
}: DataTableColumnHeaderProps<TData, TValue>) {
  const { t } = useTranslation();

  if (!column.getCanSort()) {
    return <div className={cn("uppercase", className)}>{t(title)}</div>;
  }

  return (
    <div className={cn("flex items-center space-x-2 uppercase ", className)}>
      <span>{t(title)}</span>
    </div>
  );
}
