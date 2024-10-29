import { useSearchParams } from "react-router-dom";

const useQueryID = (
  name?: string
): {
  id: string;
  set: (id: string) => void;
  reset: () => void;
  resetAll: () => void;
  getAll: () => string[] | null;
} => {
  const [params, setParams] = useSearchParams();

  return {
    id: params.get(name || "id") || "",
    set: (id: string): void => {
      params.set(name || "id", id);
      setParams(params);
    },
    reset: (): void => {
      params.delete(name || "id");
      setParams(params);
    },
    resetAll: (): void => {
      setParams("");
    },
    getAll: (): string[] => {
      return params.getAll(name || "");
    },
  };
};

export default useQueryID;
