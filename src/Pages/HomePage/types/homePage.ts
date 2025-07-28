import type {NewsArticle, NewsQueryParams, NewsSource} from './new.ts';

export interface HomepageProps {
    totalResults: number;
    newsError?:string;
    news: NewsArticle[];
    newsLoading: boolean;
    overViewLoading: boolean;
    overViewChannels: NewsSource[];
    getNews: (params?: NewsQueryParams) => void;
    getNewsPaginated: (params?: NewsQueryParams) => void;
    getOverView: () => void;
}