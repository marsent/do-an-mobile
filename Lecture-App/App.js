import React, {useState} from 'react';
import Login from './src/screens/Login';
import MainTabScreen from './src/navigation/main';
import {TokenProvider} from './src/Context/TokenContext';
// import TokenContextProvider from './src/Context/LogoutContext';
import {NavigationContainer} from '@react-navigation/native';
import {SetTokenProvider} from './src/Context/SetTokenContext';
const App = () => {
  const [token, setToken] = useState(
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGQwMDRjNzk0NDlhN2NhMDg5YTViN2MiLCJwaG9uZSI6IjAzOTU5NTI3NDEiLCJlbWFpbCI6InRodWFucHJvMjAyNUBnbWFpbC5jb20iLCJpYXQiOjE2MjUxNTA1NzZ9.HZsmKYrFwxp2Cp1SPSTgOAny6heke6KZSBBwwmIDoXY',
  );

  if (!token) return <Login token={token} setToken={setToken} />;
  return (
    <TokenProvider value={token}>
      <SetTokenProvider value={setToken}>
        <NavigationContainer>
          <MainTabScreen setToken={setToken} />
        </NavigationContainer>
      </SetTokenProvider>
    </TokenProvider>
  );
};

export default App;
