export interface NewsFilters {
  query: string ;
  selectedChannel: string | null;
  category: string | null;
}
export interface NewsArticle {
  source: {
    id: string | null;
    name: string;
  };
  author: string | null;
  title: string;
  description: string;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  content: string | null;
  category?: string
  trending?: boolean
  readTime?: number
}
export interface NewsQueryParams {
  skip?: number;
  take?: number;
  orderBy?: string;
  orderByDesc?: string;
  q?: string;
  sources?: string;
  [key: string]: string | number | undefined;
}

export interface NewsResponse {
  status: string;
  totalResults: number;
  articles: NewsArticle[];
}

export interface NewsOverviewResponse {
  status: string;
  sources: NewsSource[];
}



export interface NewsSource {
  id: string;
  name: string;
  description: string;
  url: string;
  category: string;
  language: string;
  country: string;
}


export interface  NewsState {
  articles: NewsArticle[];
  overview: {
    status: string;
    sources: NewsSource[];
  } | null;
  error: string | undefined;
  overViewLoading: boolean;
  loading: boolean;
}
