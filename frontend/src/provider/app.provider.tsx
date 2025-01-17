import React from "react";
import {QueryClientProvider} from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import {queryClient} from "../lib/react-query.ts";
import {AuthProvider} from "./auth.provider.tsx";

type AppProviderProps = {
    children: React.ReactNode
}
export const AppProvider = ({ children }: AppProviderProps) => {
   return(
       <QueryClientProvider client={queryClient}>
           <AuthProvider>
               { children }
           </AuthProvider>
           <ReactQueryDevtools initialIsOpen={false} />
       </QueryClientProvider>
   )
}
