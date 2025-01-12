import { View, Text } from 'react-native';
import { useListDetailStyles } from '@/styles';


const ListDetail = () => {
    const styles = useListDetailStyles();

    return (
        <View style={styles.container}>
            <Text style={styles.header}>List Detail</Text>
        </View>
    )
};

export default ListDetail;