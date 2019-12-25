import Types from '../types';
import DataStore from '../../expand/DataStore';

export function onLoadPopularData(storeName, url) {

    return dispatch => {
        dispatch({ type: Types.POPULAR_REFRESH, storeName, url })

        let dataSource = new DataStore()

        dataSource.fetchData(url)
            .then(data => {
                handleData(dispatch, storeName, data)
            })
            .catch(error => {
                console.log(error)
                dispatch({
                    type: Types.LOAD_POPULAR_SUCCESS,
                    storeName
                });
            });
    }

}

function handleData(dispatch, storeName, data) {

    dispatch({
        type: Types.LOAD_POPULAR_SUCCESS,
        items: data && data.data && data.data.items,
        storeName

    })
} 