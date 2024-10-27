import { useToast } from "./use-toast";

interface Props {
  itemID: string;
  title: string;
  description: string;
  duration?: number;
}

export const useCustomToast = () => {
  const { toast } = useToast();

  const loadingToast = (props: Props) => {
    toast({
      itemID: props.itemID,
      title: props.title || "Loading toast title",
      description: props.description || "Loading toast description",
      duration: Infinity,
    });
  };

  const successToast = (props: Props) => {
    toast({
      itemID: props.itemID,
      variant: "success",
      title: props.title || "Success toast title",
      description: props.description || "Success toast description",
      duration: props.duration || 2000,
    });
  };

  const errorToast = (props: Props) => {
    toast({
      itemID: props.itemID,
      variant: "destructive",
      title: props.title || "Error toast title",
      description: props.description || "Error toast description",
      duration: props.duration || 2000,
    });
  };

  return {
    loadingToast,
    successToast,
    errorToast,
  };
};
