import { Stack } from 'expo-router';
import { View, StyleSheet } from 'react-native';

export default function RootLayout() {
	return (
		<View style={styles.container}>
			<Stack screenOptions={{}}>
				<Stack.Screen
					name="index"
					options={{ title: 'ToDo App' }}
				/>
			</Stack>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});
