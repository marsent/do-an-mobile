
import React, { useState } from 'react';
import Login from './src/components/Login';
import SetAccount from './src/components/SetAccount'
import TimeTable from './src/components/TimeTable'
import Notification from './src/components/Notification'
import OnlineExam from './src/components/OnlineExam'
import AccountDetail from './src/components/accountDetail'
import { Provider as PaperProvider } from 'react-native-paper';
import { BottomNavigation, Text, Appbar } from 'react-native-paper';

const App = () => {
  // const [token, setToken] = useState();
  // if (!token) {
  //   return (
  //     <PaperProvider>
  //       <Login token={token} setToken={setToken} />
  //     </PaperProvider>
  //   )
  // }
  // return (
  //   <Home />
  // )
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'TimeTable', title: 'TKB', icon: 'calendar-clock' },
    { key: 'OnlineExam', title: 'Kiểm tra', icon: 'timer-outline' },
    { key: 'Notification', title: 'Thông báo', icon: 'bell-outline'},
    { key: 'AccountDetail', title: 'Sinh viên', icon: 'account-circle-outline' },
  ]);
  const renderScene = BottomNavigation.SceneMap({
    TimeTable: TimeTable,
    OnlineExam: OnlineExam,
    Notification: Notification,
    AccountDetail: AccountDetail,
  });
  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
      barStyle={{ backgroundColor: '#4B75F2', margin: 7.5}}
    />
  );
};

export default App;