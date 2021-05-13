import React, {useState} from 'react';
import Login from './src/components/Login';
import ListClass from './src/components/ClassManagement/listClass';
import SetAccount from './src/components/SetAccount';
import listStudent from './src/components/ClassManagement/listStudent';
// import information from './src/components/ClassManagement/informationOfStudent';
import listNoti from './src/components/createNotification/listNoti';
import createNotification from './src/components/createNotification/createNotification';
import ListNoti from './src/components/createNotification/listNoti';
import {Provider as PaperProvider} from 'react-native-paper';
import {BottomNavigation} from 'react-native-paper';
import detail from './src/components/accountDetail';
const App = () => {
  // const [token, setToken] = useState();
  // if (!token) {
  //   return (
  //     <PaperProvider>
  //       <SetAccount token={token} setToken={setToken} />
  //     </PaperProvider>
  //   )
  // }
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'ListClass', title: 'Quản lý lớp học', icon: 'calendar-clock'},
    {key: 'ListNoti', title: 'Quản lý hông báo', icon: 'bell-outline'},
    {key: 'detail', title: 'Thông tin cá nhân', icon: 'account-circle-outline'},
  ]);
  const renderScene = BottomNavigation.SceneMap({
    ListClass: ListClass,
    ListNoti: ListNoti,
    detail: detail,
  });
  return (
    <BottomNavigation
      navigationState={{index, routes}}
      onIndexChange={setIndex}
      renderScene={renderScene}
      barStyle={{backgroundColor: '#4B75F2'}}
    />
  );
};

export default App;
