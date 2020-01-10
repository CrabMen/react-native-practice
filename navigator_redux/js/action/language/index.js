import Types from '../types'
import DataStore, {FLAG_STORAGE} from '../../expand/DataStore'
import {_projectModels, handleData} from '../ActionUtils'
import FavoriteDao from "../../expand/FavoriteDAO";
import ProjectModel from "../../model/ProjectModel";
import LanguageDao from "../../expand/LanguageDao";

/**
 * 加载标签
 * @param flagKey
 * @returns {function(*)}
 */
export function onLoadLanguage(flagKey) {
    // TODO:dispatch 的具体用法
    return async dispatch => {
        try {
            let languages = await new LanguageDao(flagKey).fetch();
            dispatch({type: Types.LANGUAGE_LOAD_SUCCESS, languages: languages, flag: flagKey})
        } catch (e) {
            console.log(e)
        }
    }
}