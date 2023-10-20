"use client";

import { ReactNode } from "react";
import { cn } from "../lib/utils";
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function Providers({ children }: { children: ReactNode }) {


  return (

      <body className={cn("bg-secondary", inter.className)}>
        {children}
      </body>

  );
}
