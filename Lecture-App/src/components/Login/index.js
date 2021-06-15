import React, {useState} from 'react';
import {
  TouchableOpacity,
  KeyboardAvoidingView,
  Text,
  View,
  StyleSheet,
  TextInput,
  Button,
} from 'react-native';
// import {passwordValidator} from '../../helpers/passwordValidator';
// import {usernameValidator} from '../../helpers/usernameValidator';
// import Toast from 'react-native-toast-message';
export default Login = ({token, setToken}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  let [error, setError] = useState({username: false, password: false});
  const onLoginPress = async e => {
    e.preventDefault();
    //setError({ username: usernameValidator(username), password: passwordValidator(password) })
    await fetch('http://quocha.xyz/auth/lecture/sign-in', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        //   'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify({
        phone: username,
        password: password,
      }),
    })
      .then(res => res.json())
      .then(res => {
        if (res.error == 4000) return setError(res.messages);
        if (res.error == 7000)
          return setError({
            messages: 'Tài khoản hoặc mật khẩu không chính xác',
          });

        return setTimeout(() => setToken(res.data.token), 1000);
      });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <View style={styles.headerView}>
        <Text style={styles.headerText}>Đăng nhập</Text>
      </View>
      <View style={styles.inputLoginView}>
        <TextInput
          style={[
            {marginBottom: 8},
            styles.input,
            {borderColor: !error.username ? '#E9EEF4' : '#ED557A'},
          ]}
          placeholder="Username"
          selectionColor="#f13a59"
          onChangeText={text => {
            setUsername(text);
          }}
        />
        <Text style={{color: '#ED557A', paddingLeft: 10}}>
          {!error.username ? null : error.username}
        </Text>
        <TextInput
          style={[
            {marginTop: 8},
            styles.input,
            {borderColor: !error.password ? '#E9EEF4' : '#ED557A'},
          ]}
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={text => setPassword(text)}
        />
        <Text style={{color: '#ED557A', paddingLeft: 10}}>
          {!error.password ? null : error.password}
        </Text>
      </View>
      <Button style={styles.button} title="Đăng nhập" onPress={onLoginPress} />
      <TouchableOpacity style={{marginTop: 10}}>
        <Text style={{color: '#067EFC'}}>Quên mật khẩu?</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 5,
    alignItems: 'center',
  },
  image: {
    width: 24,
    height: 24,
  },
  headerText: {
    position: 'relative',
    fontSize: 20,
  },
  headerView: {
    position: 'relative',
    top: 10,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputLoginView: {
    position: 'relative',
    width: '90%',
    marginTop: 120,
    marginBottom: 50,
  },
  input: {
    position: 'relative',
    padding: 10,
    backgroundColor: '#F8FAFD',
    borderWidth: 1,
    borderRadius: 10,
  },
  button: {
    position: 'relative',
  },
});
