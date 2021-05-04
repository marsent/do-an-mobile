
import React, { useState } from 'react';
import Login from './src/components/Login';

const App = () => {
  const [token, setToken] = useState();
  if (!token) {
    return (
      <Login token={token} setToken={setToken} />
    )
  } return (
    <Home />
  )
};

export default App;