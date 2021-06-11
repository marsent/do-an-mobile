import React from 'react';

const TextInput = ({ placeholder, }) => {
    return (
        <View >
            <TextInput
                style={[styles.input, !error.email ? null : styles.borderErr]}
                placeholder='Email'
                value={account.email}
                onChangeText={text => setAccount({ ...account, email: text })} />
            {!error.email ? null : <Text style={styles.textErr}>{error.email}</Text>}

        </View>
    );
};

export default TextInput;