import { IconButton } from "@mui/material";
import React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Link from "next/link";
import { useRouter } from "next/router";

export default function TopBar(props: { text: string; link: string }) {
  const router = useRouter();
  return (
    <div className="bg-gray-700 text-white text-lg px-8 flex items-center gap-4">
      <div
        onClick={() => {
          if (window.history?.length && window.history.length > 1) {
            router.back();
          } else {
            router.push("/");
          }
        }}
      >
        <IconButton aria-label="delete" size="large" color="inherit">
          <ArrowBackIcon fontSize="small" />
        </IconButton>
      </div>
      <p className="py-3">{props.text}</p>
    </div>
  );
}
