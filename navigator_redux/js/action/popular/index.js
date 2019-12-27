import Types from '../types';
import DataStore, { FLAG_STORAGE } from '../../expand/DataStore';

export function onLoadPopularData(storeName, url) {

    return dispatch => {
        dispatch({ type: Types.POPULAR_REFRESH, storeName:storeName })

        let dataSource = new DataStore()

        dataSource.fetchData(url,FLAG_STORAGE.flag_popular)
            .then(data => {
                handleData(dispatch, storeName, data)
            })
            .catch(error => {
                console.log(error)
                dispatch({
                    type: Types.LOAD_POPULAR_FAIL,
                    storeName,
                    error 
                });
            });
    }

}

function handleData(dispatch, storeName, data) {

    console.log('返会的数据为:'+JSON.stringify(data))

    dispatch({
        type: Types.LOAD_POPULAR_SUCCESS,
        items: data && data.data && data.data.items,
        storeName
    })
} 