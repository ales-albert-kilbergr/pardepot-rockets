import { StrictMode } from 'react';
import * as ReactDOMClient from 'react-dom/client';
import { RocketBrowserApp } from './app/app';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { SHIP_TYPE_POLICY } from '@parkdepot/rockets/gql-client';

function boostrapRocketBrowserApp() {
  const root = ReactDOMClient.createRoot(
    document.getElementById('root') as HTMLElement
  );
  const client = new ApolloClient({
    uri: '/graphql',
    cache: new InMemoryCache({
      typePolicies: {
        Ship: SHIP_TYPE_POLICY,
      },
    }),
  });

  root.render(
    <StrictMode>
      <ApolloProvider client={client}>
        <RocketBrowserApp />
      </ApolloProvider>
    </StrictMode>
  );
}

boostrapRocketBrowserApp();
