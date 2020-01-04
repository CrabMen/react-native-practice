import ProjectModel from "../model/ProjectModel";
import Util from "../util/Utils";

export function handleData(actionType, dispatch, storeName, data, pageSize, favoriteDAO) {
    let fixItems = [];
    if (data && data.data) {
        if (Array.isArray(data.data)) {
            fixItems = data.data;
        } else if (Array.isArray(data.data.items)) {
            fixItems = data.data.items;
        }
    }
    //第一次要加载的数据
    let showItems = pageSize > fixItems.length ? fixItems : fixItems.slice(0, pageSize);
    _projectModels(showItems, favoriteDAO, projectModels => {
        dispatch({
            type: actionType,
            items: fixItems,
            projectModels: showItems,
            storeName,
            pageIndex: 1,
        })
    })

}
//异步转同步
export async function _projectModels(showItems, favoriteDAO, callback) {
    let keys = [];

    try {
        keys = favoriteDAO.getFavoriteKeys();
    } catch (e) {
        console.log(e)
    }
    let projectModels = []
    for (let index = 0; index < showItems.length; index++) {
        projectModels.push(new ProjectModel(showItems[index], Utils.checkFavorite(showItems[index], keys)))
    }

    if (typeof callback === 'function') {
        callback(projectModels)
    }

}