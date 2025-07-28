import type {NewsArticle, NewsSource} from './new.ts';

export interface HomepageProps {
    news: NewsArticle[];
    newsLoading: boolean;
    overViewChannels: NewsSource[];
    getNews: () => void;
    getOverView: () => void;
}