import Types from '../../action/types';
const defaultState = {
  // theme: 'red',
};
export default function test(state = defaultState, action) {
  switch (action.type) {
    case Types.POPULAR_REFRESH_SUCCESS:
      console.log(`state参数:${JSON.stringify(state)}\n action参数:${JSON.stringify(action)}`)
      return {
        ...state,
        [action.storeName]: {
          ...state[action.storeName],
          items: action.items,//原始数据
          projectModes: action.projectModes,//此次要展示的数据
          isLoading: false,
          hideLoadingMore: false,
          pageIndex: action.pageIndex
        }
      }
    case Types.POPULAR_REFRESH_FAIL://下拉刷新失败
      return {
        ...state,
        [action.storeName]: {
          isLoading: false,
        }
      };

    case Types.POPULAR_LOAD_MORE_SUCCESS://上拉加载更多成功
      return {
        ...state,//Object.assign @http://www.devio.org/2018/09/09/ES6-ES7-ES8-Feature/
        [action.storeName]: {
          ...state[action.storeName],
          projectModes: action.projectModes,
          hideLoadingMore: false,
          pageIndex: action.pageIndex,
        }
      }

    case Types.POPULAR_LOAD_MORE_FAIL://上拉加载更多失败
      return {
        ...state,//Object.assign @http://www.devio.org/2018/09/09/ES6-ES7-ES8-Feature/
        [action.storeName]: {
          ...state[action.storeName],
          hideLoadingMore: true,
          pageIndex: action.pageIndex,
        }
      }

    default:
      return state;
  }

  return state;
}
