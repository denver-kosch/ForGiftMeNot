import { View } from 'react-native';
import { useColorScheme } from '@/hooks/useColorScheme';

const PageBreak = () => {
	const colorScheme = useColorScheme();
	return (
		<View style={{ 
			width: "80%",
			height: 1,
			backgroundColor: colorScheme === 'dark' ? "#444" : "#ddd",
			marginVertical: 25,
		}} />
	);
}

export default PageBreak;