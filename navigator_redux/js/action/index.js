import {onThemeChange,onShowCustomThemeView,onThemeInit} from './theme';
import { onRefreshPopular, onLoadMorePopular, onFlushPopularFavorite, onFlushTrendingFavorite } from './popular';
import { onRefreshTrending, onLoadMoreTrending } from './trending';
import { onLoadFavoriteData } from './favorite';
import { onLoadLanguage } from './language';


export default {
    onThemeChange,
    onRefreshPopular,
    onLoadMorePopular,
    onRefreshTrending,
    onLoadMoreTrending,
    onLoadFavoriteData,
    onFlushPopularFavorite,
    onFlushTrendingFavorite,
    onLoadLanguage,

    onShowCustomThemeView,
    onThemeInit,

}