import { QueryClient, QueryFunction } from "@tanstack/react-query";
import { onUserInfo } from "@/actions/user";

const prefetch = async (
    client: QueryClient,
    action: QueryFunction,
    key: string,
) => {
    return await client.prefetchQuery({
        queryKey: [key],
        queryFn: action,
        staleTime: 60000,
    });
};

export const PrefetchUserProfile = async (client: QueryClient) => {
    return await prefetch(client, onUserInfo, "user-profile");
};