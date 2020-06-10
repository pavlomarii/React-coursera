import {createStore, combineReducers} from 'redux';
import {Dishes} from './dishes';
import {Comments} from './comments';
import {Leaders} from './leaders';
import {Promotions} from './promotions';

export const ConfigureStore = () => {
	const Store = createStore(
		combineReducers({
			dishes: Dishes,
			comments: Comments,
			leaders: Leaders,
			promotions: Promotions
		})
	);
	return Store;
}