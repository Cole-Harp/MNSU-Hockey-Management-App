"use client";

import { ReactNode } from "react";
import { cn } from "../lib/utils";
import { Inter } from 'next/font/google'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';


const inter = Inter({ subsets: ['latin'] })

export default function Providers({ children }: { children: ReactNode }) {


  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <body className={cn("bg-secondary", inter.className)}>
        {children}
      </body>
      </LocalizationProvider>
  );
}
