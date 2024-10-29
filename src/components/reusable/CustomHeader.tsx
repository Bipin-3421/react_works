import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

import useQueryID from "@/hooks/useQueryID";

type tabs = {
  name: string;
  value: string;
};

export type HeaderProps = {
  title?: string;
  tabs?: tabs[];
  activeTab?: string;
  setActiveTab?: React.Dispatch<React.SetStateAction<string>>;
  className?: string;
  updateParamsOnTabChange?: boolean; // Update the query params on tab change  eg: /?tab=tab1
} & React.HTMLAttributes<HTMLElement>;

const CustomHeader: React.FC<HeaderProps> = ({
  title,
  tabs,
  activeTab,
  setActiveTab,
  className,
  updateParamsOnTabChange = false,
}) => {
  const { set } = useQueryID();
  const handleTabClick = (tab: string): void => {
    if (setActiveTab) {
      setActiveTab(tab);
    }
    if (set && tab && updateParamsOnTabChange) {
      set(tab);
    }
  };

  return (
    <section className={cn("my-6", className)}>
      <div className="flex justify-between align-center mb-4 sm:h-12 md:h-10">
        <div className="flex items-center gap-2">
          {title && <h2 className="font-medium  md:text-2xl">{title}</h2>}
        </div>
      </div>

      {tabs && activeTab && setActiveTab && (
        //TODO: Handle Overflow
        <div className="flex gap-4 h-8 ">
          {tabs.map((tab) => {
            return (
              <Button
                key={tab?.value}
                variant={`${activeTab !== tab?.value ? "ghost" : "underlined"}`}
                className={cn(
                  "dark:text-white",
                  activeTab === tab?.value && "text-primary"
                )}
                onClick={() => handleTabClick(tab?.value)}
              >
                {tab?.name}
              </Button>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default CustomHeader;
