import React, {useState} from 'react';
import Login from './src/screens/Login';
import MainTabScreen from './src/navigation/main';
import {TokenProvider} from './src/Context/TokenContext';
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
  const [token, setToken] = useState(
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGQwMDRjNzk0NDlhN2NhMDg5YTViN2MiLCJwaG9uZSI6IjAzOTU5NTI3NDEiLCJlbWFpbCI6InRodWFucHJvMjAyNUBnbWFpbC5jb20iLCJpYXQiOjE2MjQ2OTAyOTh9.4mqQCpf54JwyxuZXD3_D0A_bnDrV375YM569RRFgsRA',
  );
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
