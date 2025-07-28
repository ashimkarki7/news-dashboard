
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
  loading: boolean;
}
