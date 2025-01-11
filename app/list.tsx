import { useListStyles } from '@/styles';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';
import { View } from 'react-native';

const List = () => {
	const styles = useListStyles();

	useFocusEffect(
		useCallback(() => {
			// Fetch list data
		}, [])
	)

	return (
		<View style={styles.container}>

		</View>
	)
};

export default List;