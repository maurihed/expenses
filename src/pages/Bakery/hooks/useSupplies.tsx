import { Supply } from "@/classes";
import { SupplyService } from "@/services";
import { useQuery } from "react-query";

export const useSupplies = () => {
  const { data, isLoading, error } = useQuery<Supply[]>(
    "supplies",
    SupplyService.getSupplies,
    {
      staleTime: Infinity, // Disable background fetching
    }
  );

  return {
    supplies: data,
    isLoading,
    error,
  };
};
