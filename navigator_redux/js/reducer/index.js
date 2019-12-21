import {combineReducers} from 'redux';
import theme from './theme/theme';
/**
 * 合并reducer
 */
const index = combineReducers({
  theme: theme,
});

export default index;
