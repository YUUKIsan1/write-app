import React from "react";
import { Button } from "@mui/material";

type GoogleLoginButtonProps = {
  googleUrl: string;
  setError: (msg: string) => void;
  loading: boolean;
};

const GoogleLoginButton: React.FC<GoogleLoginButtonProps> = ({ googleUrl, setError, loading }) => {
  const handleGoogleLogin = async () => {
    try {
      if (googleUrl) {
        window.location.href = googleUrl;
      } else {
        setError("GoogleログインURLの取得に失敗しました");
      }
    } catch {
      setError("Googleログインに失敗しました");
    }
  };

  return (
    <Button
      fullWidth
      variant="outlined"
      color="secondary"
      sx={{ mt: 2 }}
      onClick={handleGoogleLogin}
      disabled={loading}
    >
      Googleでログイン
    </Button>
  );
};

export default GoogleLoginButton; 