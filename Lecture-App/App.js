import React, {useState} from 'react';
import Login from './src/components/Login';
import MainTabScreen from './src/screen/main';
import {TokenProvider} from './src/Context/TokenContext';
import {BottomNavigation, Text} from 'react-native-paper';
import ListClass from './src/components/ClassManagement/listClass';
import ListNoti from './src/components/createNotification/listNoti';
import detail from './src/components/accountDetail/index';
import {NavigationContainer} from '@react-navigation/native';
const App = () => {
  // const [token, setToken] = useState();
  // if (!token) {
  //   return (
  //     <PaperProvider>
  //       <SetAccount token={token} setToken={setToken} />
  //     </PaperProvider>
  //   )
  // }
  // const [index, setIndex] = React.useState(0);
  const [token, setToken] = useState('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGM4NjNmMzlkZTdmNTlmMWVhMTgwM2YiLCJwaG9uZSI6IjA4ODY0NjAzMTUiLCJlbWFpbCI6IlR1YW5hbmg4NDIzQGdtYWlsLmNvbSIsImlhdCI6MTYyMzc0NTg1Nn0.puQSuBtXisPbXpLss5J1eSEHuH3G1cN_7GnOcyX3Mew');
  // const [routes] = React.useState([
  //   {key: 'ListClass', title: 'Quản lý lớp học', icon: 'calendar-clock'},
  //   {key: 'ListNoti', title: 'Quản lý hông báo', icon: 'bell-outline'},
  //   {key: 'detail', title: 'Thông tin cá nhân', icon: 'account-circle-outline'},
  // ]);
  // const renderScene = BottomNavigation.SceneMap({
  //   ListClass: ListClass,
  //   ListNoti: ListNoti,
  //   detail: detail,
  // });
  if (!token) return <Login token={token} setToken={setToken} />;
  return (
    <TokenProvider value={token}>
      {/* <BottomNavigation
        navigationState={{index, routes}}
        onIndexChange={setIndex}
        renderScene={renderScene}
      /> */}
      <NavigationContainer>
        <MainTabScreen />
      </NavigationContainer>
    </TokenProvider>
  );
};

export default App;
