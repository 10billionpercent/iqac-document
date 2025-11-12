import React from 'react';
import { AuthProvider } from './AuthContext'; // Import AuthProvider
import IQACDocumentRepository from './IQACDocumentRepository';

function App() {
  return (
    <AuthProvider>
      <IQACDocumentRepository />
    </AuthProvider>
  );
}

export default App;