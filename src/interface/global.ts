import { ColumnDef, DeepKeys } from "@tanstack/react-table";

export type ExtendedColumnDef<T, V = unknown> = ColumnDef<T, V> & {
  idForRowClick?: keyof T;
  accessorKey?: DeepKeys<T> | string;
  map?: {
    key: string;
    valueFrom?: DeepKeys<T> | string;
    mergedValuesFrom?: (DeepKeys<T> | string)[];
    dataTransformer?: (data: T) => string;
  };
};

export type IbtnVariant =
  | "link"
  | "default"
  | "destructive"
  | "outline"
  | "secondary"
  | "ghost";

export type baseButtonType =
  | {
      label: string;
      onClick: () => void;
      variant?: IbtnVariant;
      disabled?: boolean;
      className?: string;
      icon?: React.ReactNode;
      isLoading?: boolean;
    }
  | false;

export type dataTableHeaderType = {
  label: string;
  className?: string;
};
