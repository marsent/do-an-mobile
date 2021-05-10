
import React, { useState } from 'react';
import Login from './src/components/Login';
import SetAccount from './src/components/SetAccount'
import TimeTable from './src/components/TimeTable'
import Notification from './src/components/Notification'
import OnlineExam from './src/components/OnlineExam'
import { Provider as PaperProvider } from 'react-native-paper';

const App = () => {
  const [token, setToken] = useState();
  if (!token) {
    return (
      <PaperProvider>
        <Notification token={token} setToken={setToken} />
      </PaperProvider>
    )
  }
  return (
    <Home />
  )
};

export default App;