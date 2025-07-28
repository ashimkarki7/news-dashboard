import type {NewsArticle, NewsSource} from './new.ts';

export interface HomepageProps {
    newsError?:string;
    news: NewsArticle[];
    newsLoading: boolean;
    overViewLoading: boolean;
    overViewChannels: NewsSource[];
    getNews: () => void;
    getOverView: () => void;
}