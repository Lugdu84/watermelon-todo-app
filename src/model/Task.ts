// model/Post.js
import { Model } from '@nozbe/watermelondb';
import { field, text } from '@nozbe/watermelondb/decorators';

export default class Task extends Model {
	static table = 'tasks';

	@text('title') title!: string;
	@field('completed') completed!: boolean;
}
