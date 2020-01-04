
export default class Utils {
   
    static checkFavorite(item, keys = []) {
        if (!keys) {
            return false
        }
        for (let index = 0; index < keys.length; index++) {
            let id = item.id ? item.id : item.fullName
            if (id.toString() == items[i]) {
                return true
            }
        }
        return false
    }
}

