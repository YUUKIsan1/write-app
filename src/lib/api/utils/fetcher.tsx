import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL; // 環境変数からベースURLを取得


export const fetcher = async (
  url: string,
  responseType: "json" | "blob" = "json",
) => {
  console.log("fetcher", url);
  console.log(`[API Request] BASE_URL: ${BASE_URL}`);
  console.log(`[API Request] Full URL: ${BASE_URL}${url}`);
  console.log(`[API Request] Response type: ${responseType}`);



}


interface FetchErrorExtension {
  statusCode?: number;
  response?: Response;
  data?: unknown;
  url?: string;
  headers?: Record<string, string>;
  timestamp?: string;
  contentType?: string;
  originalError?: unknown;
  isCorsError?: boolean;
  isSTGError?: boolean;
}

type EnhancedError = Error & FetchErrorExtension;

//TODO: token取得部分を複数箇所で重複したコードで定義している。一元管理できないか？
const getToken = (): string | null => {
  //クライアントサイドであればtokenを取得
  //typeof window=="undefined"であれば サーバーサイド。localStorageはクライアントサイドでしか動作しない
  if (typeof window !== "undefined") {
      return localStorage.getItem("auth_token");
  }
  return null;
};

export const fileSendRequest = async <T = unknown>(url: string, { arg }: { arg: T }) => {
  console.log(`[API Request] POST (File): ${url}`);
  const token = getToken();
  try {
      const response = await axios.post(`${BASE_URL}${url}`, arg, {
          headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
          },
      });
      return response.data;
  } catch (error: unknown) {
      console.error(`[API Error] POST (File) ${url} - Status: ${(error as { response?: { status?: number } })?.response?.status}, Body:`, (error as { response?: { data?: unknown } })?.response?.data);
      const apiError: EnhancedError = new Error(`API Error: ${(error as { response?: { status?: number, statusText?: string } })?.response?.status} ${(error as { response?: { statusText?: string }, message?: string })?.response?.statusText || (error as Error)?.message}`);
      apiError.statusCode = (error as { response?: { status?: number } })?.response?.status || 500;
      apiError.response = (error as { response?: Response })?.response;
      apiError.data = (error as { response?: { data?: unknown } })?.response?.data;
      throw apiError;
  }
};