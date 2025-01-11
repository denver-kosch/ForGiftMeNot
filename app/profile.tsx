import { Button, Text, View } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '@/types';
import { useDispatch } from 'react-redux';
import { store } from '@/store';
import { profileStyles } from '@/styles';

const ProfilePage = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const token = store.getState().auth.token;
    const styles = profileStyles();


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