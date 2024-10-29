import { Search, SearchIcon, Share } from "lucide-react";
import { useState } from "react";

import { cn } from "@/lib/utils";

import { H4 } from "../reusable/typography";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { baseButtonType, dataTableHeaderType } from "@/interface/global";
import { Table } from "@tanstack/react-table";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  addButton?: baseButtonType;
  header?: dataTableHeaderType;
}

export function DataTableToolbar<TData>({
  table,
  addButton,
  header,
}: DataTableToolbarProps<TData>) {
  const [showSearch, setShowSearch] = useState(false);

  return (
    <div className="flex items-center justify-between ">
      <div className="flex flex-1 items-center">
        {header && <H4 className={cn(header.className)}>{header.label}</H4>}
      </div>
      {!showSearch && (
        <Button variant={"ghost"} onClick={() => setShowSearch(true)}>
          <Search className="w-4 h-4 mr-2" />
          Search
        </Button>
      )}
      <div
        className={cn(
          "flex items-center transition-all duration-300",
          showSearch ? "max-w-xs" : "max-w-0 overflow-hidden"
        )}
      >
        <Input
          autoFocus
          placeholder="Search"
          className={`transition-all duration-300 ${
            showSearch ? "max-w-sm" : "max-w-0"
          }`}
          icon={SearchIcon}
          onChange={(e) => table.setGlobalFilter(e.target.value)}
        />
      </div>
      {addButton && (
        <Button onClick={addButton.onClick} className=" ml-4">
          {addButton.icon}
          {addButton.label}
        </Button>
      )}
      <Button variant={"ghost"}>
        <Share className="w-4 h-4 mr-2" />
        Export
      </Button>

      {/*
            // <DataTableViewOptions table={table} />
              */}
    </div>
  );
}
