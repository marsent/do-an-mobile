import React from 'react'
import { View } from 'react-native'
import App from '../../App';

export default Logout = (props) => {
    let { setToken } = props.route.params;
    setToken()
    return (
        <App />
    )
}