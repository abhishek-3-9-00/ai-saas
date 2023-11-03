"use client";

import { useEffect } from "react";
import { Crisp } from "crisp-sdk-web";

export const CrispChat = () => {
  useEffect(() => {
    Crisp.configure("8af801c2-0dca-4016-83f6-fd177fefd91d");
  }, []);
  return null;
};
