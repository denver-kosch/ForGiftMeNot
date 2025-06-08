import { Button, Text, View, Image } from 'react-native';
import { useNavigation, NavigationProp, useFocusEffect } from '@react-navigation/native';
import { RootStackParamList, } from '@/types';
import { useDispatch, useSelector } from 'react-redux';
import { useProfileStyles } from '@/styles';
import { useCallback, useState } from 'react';
import apiCall from '@/services/apiCall';

const ProfilePage = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const token = useSelector((state: any) => state.auth.token);
    const styles = useProfileStyles();
    const [profile, setProfile] = useState<any>({});

    useFocusEffect(
        useCallback(() => {
            if (!token) navigation.navigate('Home');

            const fetchProfile = async () => {
                const response = await apiCall(
                    'getUser', 
                    {include: ['firstName', 'lastName', 'admin', 'phoneNum', 'verified', 'username', 'profilePic']}, 
                    {"Authorization": `Bearer ${token}`}
                );
                console.log(response);
                if (response?.success) setProfile(response.userData);
            };

            fetchProfile();
        }, [token, navigation])
    );

    const logout = () => {
        dispatch({ type: 'REMOVE_TOKEN' });
        navigation.navigate('Home');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Profile</Text>
            <Image 
                src={profile?.profilePic}
                style={styles.profilePic}
            />

            <Text style={styles.button}>Change Profile Picture</Text>



            <Button title="Logout" onPress={logout} />
        </View>
    );
};

export default ProfilePage;