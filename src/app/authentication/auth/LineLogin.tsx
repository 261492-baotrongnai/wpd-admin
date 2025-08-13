"use client";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";

import { createTheme } from "@mui/material/styles";
import Image from "next/image";
import LineLogo from "@/app/authentication/logo/LINE_Brand_icon.png";

// Module augmentation for custom palette
declare module "@mui/material/styles" {
  interface Palette {
    line: Palette["primary"];
  }
  interface PaletteOptions {
    line?: PaletteOptions["primary"];
  }
}

const theme = createTheme({
  palette: {
    line: {
      main: "#06c755",
      dark: "#04a74c",
      contrastText: "#ffffff",
    },
  },
});

export default function LineLogin() {
  const [loginUrl, setLineLoginUrl] = useState("");

  useEffect(() => {
    fetch("/api/line-login-url")
      .then((res) => res.json())
      .then((data) => setLineLoginUrl(data.url));
  }, []);

  return (
    <a href={loginUrl}>
      <Button
        variant="contained"
        size="large"
        sx={{
          backgroundColor: theme.palette.line.main,
          color: theme.palette.line.contrastText,
          marginBottom: "16px",
          marginTop: "16px",
          "&:hover": {
            backgroundColor: theme.palette.line.dark,
          },
        }}
        startIcon={<Image src={LineLogo} alt="LINE Icon" width={20} />}
        fullWidth
      >
        Login with LINE
      </Button>
    </a>
  );
}
