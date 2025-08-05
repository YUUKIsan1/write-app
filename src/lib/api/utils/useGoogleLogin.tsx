// Googleログイン認証のフック
import useSWR from "swr";
import { fetcher } from "@/lib/api/utils/fetcher"

const UseGoogleLogin = () => {
    const { data, error } = useSWR("/api/auth/google/redirect", fetcher);

    return {
        data: data,
        isError: error,
    };
};

export default UseGoogleLogin;
