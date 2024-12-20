import { authorizedApiRoutes } from "@/constants/route";
import { useAuthAxios } from "@/hooks/use-auth-axios";
import { TMember } from "@/schema/members.schema";
import { useQuery } from "@tanstack/react-query";

/**
For Get User Query
*/

export const TAuthQueries = {
  GetMember: ["GetMember"],
};
export const useGetMemberQuery = () => {
  const authAxios = useAuthAxios();
  const getMemberQuery = useQuery<TMember | undefined>({
    queryKey: TAuthQueries.GetMember,
    queryFn: async () => {
      const response = await authAxios.get(authorizedApiRoutes.MEMBERS);
      return response?.data?.data;
      console.log("auth queries ko data", response.data);
    },
  });
  return getMemberQuery;
};
