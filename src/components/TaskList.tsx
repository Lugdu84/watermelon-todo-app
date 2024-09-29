import { View, Button } from 'react-native';
import FooterList from './FooterList';
import TaskListItem from './TaskListItem';
import { withObservables } from '@nozbe/watermelondb/react';
import { database } from '../database/watermelon';
import Task from '../model/Task';
import { Model, Q } from '@nozbe/watermelondb';
import { FlatList } from 'react-native-gesture-handler';
import { useState } from 'react';

const enhance = withObservables(['tasks'], ({ tasks }) => {
	const observable = ['id', 'title', 'completed'];
	const query = Q.where('completed', true);
	return {
		tasks: database.get('tasks').query().observeWithColumns(observable),
	};
});

type TaskListProps = {
	tasks: Model[];
	filtered: boolean | undefined;
};

function TaskList({ tasks }: TaskListProps) {
	const [filteredChecked, setFilteredChecked] = useState<boolean | undefined>(
		undefined
	);

	return (
		<FlatList
			ListHeaderComponent={() => (
				<View style={{ flexDirection: 'row' }}>
					<Button
						color={filteredChecked === undefined ? 'green' : 'blue'}
						title="All"
						onPress={() => setFilteredChecked(undefined)}
					/>
					<Button
						color={filteredChecked === false ? 'green' : 'blue'}
						title="Active"
						onPress={() => setFilteredChecked(false)}
					/>
					<Button
						color={filteredChecked ? 'green' : 'blue'}
						title="Completed"
						onPress={() => setFilteredChecked(true)}
					/>
				</View>
			)}
			// Pour être en dessous de la searchBar
			contentInsetAdjustmentBehavior="automatic"
			data={tasks}
			contentContainerStyle={{ gap: 10, padding: 10 }}
			renderItem={({ item, index }) => <TaskListItem task={item as Task} />}
			ListFooterComponent={() => <FooterList />}
		/>
	);
}

export default enhance(TaskList);
