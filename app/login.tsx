import React, { useState, useEffect, useRef } from 'react';
import apiCall from '@/services/apiCall.js';
import { View, Text, TextInput, Button, KeyboardAvoidingView, Platform } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList, AuthState } from '@/types';
import { useDispatch, useSelector } from 'react-redux';
import { loginStyles } from '@/styles';

const LoginPage = () => {
    const dispatch = useDispatch();
    const token = useSelector((state: AuthState) => state.auth.token);
    const styles = loginStyles();
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const [isLogin, setIsLogin] = useState(true);
    const [error, setError] = useState('');
    const inputRef = useRef<TextInput>(null);

    useEffect(() => {
        if (token) navigation.navigate('Home');
    }, [token]);


    const LoginContents = () => {
        const [email, setEmail] = useState('');
        const [password, setPassword] = useState('');

        const handleSubmit = async (event: { preventDefault: () => void; }) => {
            event.preventDefault();
            setError('');

            const response = await apiCall('login', { email, password });

            if (response?.success) {
                console.log('Success:', response.token);
                setEmail('');
                setPassword('');
                dispatch({ type: 'SET_TOKEN', payload: response.token });
                navigation.navigate('Home');
            } else {
                setError(response?.error || 'An error occurred');
            }
        };

        return (
            <View style={{ padding: 20 }}>
                <View>
                    <Text style={styles.text}>Email:</Text>
                    <TextInput
                        style={styles.input}
                        ref={inputRef}
                        keyboardType="email-address"
                        value={email}
                        onChangeText={text => setEmail(text)}
                        autoCapitalize="none"
                    />
                </View>
                <View>
                    <Text style={styles.text}>Password:</Text>
                    <TextInput
                        style={styles.input}
                        secureTextEntry
                        value={password}
                        onChangeText={text => setPassword(text)}
                    />
                </View>
                <Button title="Login" onPress={handleSubmit} />
            </View>
        );
    };

    const RegisterContents = () => {
        const [email, setEmail] = useState('');
        const [username, setUsername] = useState('');
        const [password, setPassword] = useState('');

        const handleSubmit = async (event: { preventDefault: () => void; }) => {
            event.preventDefault();
            setError('');

            const response = await apiCall('register', { email, username, password });

            if (response?.success) {
                console.log('Success:', response.token);
                setEmail('');
                setUsername('');
                setPassword('');
                setIsLogin(true);
                dispatch({ type: 'SET_TOKEN', payload: response.token });
                navigation.navigate('Home');
            } else {
                setError(response?.error || 'An error occurred');
            }
        };

        return (
            <View style={{ padding: 20 }}>
                <View>
                    <Text style={styles.text}>Email:</Text>
                    <TextInput
                        style={styles.input}
                        keyboardType="email-address"
                        value={email}
                        onChangeText={text => setEmail(text)}
                        autoCapitalize="none"
                    />
                </View>
                <View>
                    <Text style={styles.text}>Username:</Text>
                    <TextInput
                        style={styles.input}
                        value={username}
                        onChangeText={text => setUsername(text)}
                        autoCapitalize="none"
                    />
                </View>
                <View>
                    <Text style={styles.text}>Password:</Text>
                    <TextInput
                        style={styles.input}
                        secureTextEntry
                        value={password}
                        onChangeText={text => setPassword(text)}
                    />
                </View>
                {error && <Text style={{ color: 'red', marginBottom: 20 }}>{error}</Text>}
                <Button title="Register" onPress={handleSubmit} />
            </View>
        );
    };

    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
        <View style={styles.container}>
            <Text style={styles.header}>{isLogin ? 'Login' : 'Register'}</Text>
            {isLogin ? <LoginContents /> : <RegisterContents />}
            {error && <Text style={{ color: 'red', marginBottom: 20 }}>{error}</Text>}
            <Button title={isLogin ? 'Switch to Register' : 'Switch to Login'} onPress={() => setIsLogin(!isLogin)} />
        </View>
            </KeyboardAvoidingView>
    );
};

export default LoginPage;
