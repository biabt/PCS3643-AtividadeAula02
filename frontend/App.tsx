import React from 'react';
import Navigation from "./src/navegation";
import { AuthProvider } from "./src/context/AuthContext";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

export default function App() {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <Navigation />
      </QueryClientProvider>
    </AuthProvider>
  );
}