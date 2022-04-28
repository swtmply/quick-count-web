import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import { useState } from "react";
import SelectedPositionProvider from "../context/SelectedPosition";
import { FilteredItemsProvider } from "../context/FilteredItems";
import { SelectedImageProvider } from "../context/SelectedImage";

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
        <FilteredItemsProvider>
          <SelectedPositionProvider>
            <SelectedImageProvider>
              <Component {...pageProps} />
            </SelectedImageProvider>
          </SelectedPositionProvider>
        </FilteredItemsProvider>
      </Hydrate>
    </QueryClientProvider>
  );
}

export default MyApp;
