import { ChakraProvider } from "@chakra-ui/react";
import Layout from "components/Layout/Layout";
import { RariProvider } from "context/RariContext";
import { QueryClient, QueryClientProvider } from "react-query";
import { connectors } from "utils/connectors";
import { Provider } from "wagmi";

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <Provider autoConnect connectors={connectors}>
        <QueryClientProvider client={queryClient}>
          <RariProvider>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </RariProvider>
        </QueryClientProvider>
      </Provider>
    </ChakraProvider>
  );
}

export default MyApp;
