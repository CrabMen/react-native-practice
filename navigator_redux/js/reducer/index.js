import {combineReducers} from 'redux';
import theme from './theme/theme';
import popular from './popular';
import trending from './trending';
import favorite from './favorite';
import language from './language';



/**
 * 合并reducer
 */
const index = combineReducers({
  theme: theme,
  popular:popular,
  trending:trending,
  favorite:favorite,
  language:language,
}); 

export default index;
