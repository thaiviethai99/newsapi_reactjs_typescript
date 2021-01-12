export interface IArticleSource {
  id: string;
  name: string;
}

export interface IArticle {
  author: string;
  content: string;
  description: string;
  publishedAt: string;
  title: string;
  url: string;
  urlToImage: string;
  source: IArticleSource
}

export interface TotalResult {
  totalResults: number;
}