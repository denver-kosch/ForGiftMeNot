import { useListStyles } from '@/styles';
import { useFocusEffect, useNavigation, NavigationProp } from '@react-navigation/native';
import { Suspense, useCallback, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import apiCall from '@/services/apiCall';
import { ListType, RootStackParamList, AuthState } from '@/types';
import { useSelector } from 'react-redux';
import PageBreak from '@/components/pagebreak';



const List = () => {
	const styles = useListStyles();
	const navigation = useNavigation<NavigationProp<RootStackParamList>>();
	const token = useSelector((state: AuthState) => state.auth.token);
	const [lists, setLists] = useState<{ owned: ListType[], shared: ListType[] }>({ owned: [], shared: [] });

	useFocusEffect(
		useCallback(() => {
			const fetchLists = async () => {
				const response = await apiCall('getLists', {owned: true, shared: true}, {"Authorization": `Bearer ${token}`});
				if (response.success) setLists(response.lists);
			};
			fetchLists();
		}, [])
	);

	const ListPreview = ({ list }: { list: ListType }) => {
		const { id, name, description, owner } = list;
		return (
			<TouchableOpacity onPress={() => navigation.navigate('ListDetail', { id })} style={styles.listPreview} key={id}>
				<View >
					<Text style={styles.listName}>{name}</Text>
					<Text style={styles.listDescription}>{description}</Text>
					{owner && <Text style={styles.listOwner}>Owner: {owner}</Text>}
				</View>
			</TouchableOpacity>
		)
	};

	return (
	<View style={styles.container}>
		<View style={styles.topBar}>
			<Text style={[styles.header, {width: '50%'}]}>Lists</Text>
			<TouchableOpacity style ={{width: '50%'}} onPress={() => navigation.navigate('CreateList')}>
				<Text style={[styles.button]}>Create New List</Text>
			</TouchableOpacity>
		</View>
		<View style={styles.listBlock}>
			<Text style={styles.header}>Your Lists:</Text>
			<Suspense fallback={<ActivityIndicator size="large" color="#b8a96e" />}>
				{lists.owned.length > 0 ? 
				<ScrollView>
					{lists.owned.map(list => <ListPreview key={list.id} list={list} />)}
				</ScrollView> :
				<Text style={[styles.text, {padding: 5}]}>You don't have any lists yet.</Text>
				}
			</Suspense>
		</View>
		<PageBreak />
		<View style={styles.listBlock}>
			<Text style={styles.header}>Shared Lists:</Text>
			<Suspense fallback={<ActivityIndicator size="large" color="#b8a96e" />}>
				{lists.shared.length > 0 ? 
				<ScrollView>
					{lists.shared.map(list => <ListPreview key={list.id} list={list} />)}
				</ScrollView> :
				<Text style={[styles.text, {padding: 5, justifyContent: 'center'}]}>You haven't been shared any lists yet.</Text>
				}
			</Suspense>
		</View>
	</View>
	)
};

export default List;