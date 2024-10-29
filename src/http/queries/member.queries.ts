import { AxiosError } from "axios";

import { authorizedApiRoutes } from "@/constants/route";
import { useAuthAxios } from "@/hooks/use-auth-axios";
import { TMember } from "@/schema/members.schema";
import { useQuery } from "@tanstack/react-query";

/**
Queries Key related to user module
*/
export const MEMBERS_QUERY_KEYS = {
  GET_MEMBERS: "get-member",
  CREATE_MEMBER: "create-member",
  UPDATE_MEMBER: "update-member",
  DELETE_MEMBER: "delete-member",
};

/**
Queries related to user module
*/

export const useGetMembers = () => {
  const authAxios = useAuthAxios();
  const getUsers = useQuery<TMember[], AxiosError>({
    queryKey: [MEMBERS_QUERY_KEYS.GET_MEMBERS],
    queryFn: async () => {
      const { data } = await authAxios.get(authorizedApiRoutes.MEMBERS);
      return data?.data;
    },
  });

  return getUsers;
};
