import { Button, Text, View } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList, } from '@/types';
import { useDispatch, useSelector } from 'react-redux';
import { useProfileStyles } from '@/styles';
import { useEffect } from 'react';
import apiCall from '@/services/apiCall';

const ProfilePage = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const token = useSelector((state: any) => state.auth.token);
    const styles = useProfileStyles();

    useEffect(() => {
        if (!token) navigation.navigate('Home');

        const fetchProfile = async () => {
            const response = await apiCall('getUser', {}, {"Authorization": `Bearer ${token}`});

            if (!response?.success) {
            }
        };

        fetchProfile();
    }, [token]);

    const logout = () => {
        dispatch({ type: 'REMOVE_TOKEN' });
        navigation.navigate('Home');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Profile</Text>
            <Button title="Logout" onPress={logout} />
        </View>
    );
};

export default ProfilePage;