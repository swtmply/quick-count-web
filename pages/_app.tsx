import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import { useState } from "react";
import SelectedPositionProvider from "../context/SelectedPosition";

function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1000 * 60,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <SelectedPositionProvider>
          <Component {...pageProps} />
        </SelectedPositionProvider>
      </Hydrate>
    </QueryClientProvider>
  );
}

export default MyApp;
