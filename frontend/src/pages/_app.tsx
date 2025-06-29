import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { config } from "@/config/wgami"
import { AppProvider } from "@/context/CryptContext";



let queryClient: QueryClient | undefined;

const getQueryClient = () => {
  if (!queryClient) {
    queryClient = new QueryClient();
  }

  return queryClient;
};
export default function App({ Component, pageProps }: AppProps) {

  useEffect(() => {
  
    // Add scroll observer for animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
          }
        });
      },
      { threshold: 0.1 }
    );

    // Observe all elements with animate-reveal class
    document.querySelectorAll('.animate-reveal').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);
  return (
    <>
      <WagmiProvider config={config}>
        <QueryClientProvider client={getQueryClient()}>
          <AppProvider>
            <Toaster />
            <Sonner />
            <Component {...pageProps} />
          </AppProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </>
  );
}
