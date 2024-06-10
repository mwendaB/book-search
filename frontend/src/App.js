import React from 'react';
import { ApolloProvider } from '@apollo/client';
import client from './apolloClient';
import BookAssignmentView from './components/BookAssignmentView';

function App() {
  return (
    <ApolloProvider client={client}>
      <BookAssignmentView />
    </ApolloProvider>
  );
}

export default App;
