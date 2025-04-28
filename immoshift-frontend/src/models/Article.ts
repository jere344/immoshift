import { Paragraph, processParagraph } from './Paragraph';
import { getImageUrl } from '../utils/imageUtils';

export interface Author {
    id: number;
    name: string;
    picture?: string;
    bio?: string;
}

export interface Article {
    id: number;
    title: string;
    slug: string;
    excerpt: string;
    content?: string;
    image: string;
    author?: Author;
    source_url?: string;
    is_published: boolean;
    created_at: string;
    published_at: string;
    updated_at: string;
    paragraphs?: Paragraph[];
}

// For list view (homepage, etc.)
export interface ArticleSummary {
    id: number;
    title: string;
    slug: string;
    excerpt: string;
    image: string;
    published_at: string;
    author_name?: string;
    author_picture?: string;
    source_url?: string;
}

// Process article with full data
export const processArticle = (article: Article): Article => ({
    ...article,
    image: getImageUrl(article.image),
    author: article.author ? {
        ...article.author,
        picture: article.author.picture ? getImageUrl(article.author.picture) : undefined
    } : undefined,
    paragraphs: article.paragraphs?.map(processParagraph)
});

// Process article summary
export const processArticleSummary = (article: ArticleSummary): ArticleSummary => ({
    ...article,
    image: getImageUrl(article.image),
    author_picture: article.author_picture ? getImageUrl(article.author_picture) : undefined
});
