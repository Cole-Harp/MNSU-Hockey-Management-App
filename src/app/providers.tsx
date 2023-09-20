"use client";

import { Dispatch, ReactNode, SetStateAction, createContext } from "react";

import { cn } from "../lib/utils";

import { Inter } from 'next/font/google'

export const AppContext = createContext<{
  font: string;
  setFont: Dispatch<SetStateAction<string>>;
}>({
  font: "Mono",
  setFont: () => {},
});

const inter = Inter({ subsets: ['latin'] })

import "./styles/globals.css"
export default function Providers({ children }: { children: ReactNode }) {


  return (

        <body className={cn("bg-secondary", inter.className)}>
          {children}
        </body>

  );
}