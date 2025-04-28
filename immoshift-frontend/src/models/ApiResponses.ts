import { Article } from './Article';
import { Training } from './Training';
import { Ebook } from './Ebook';
import { HomeContent } from './HomeContent';

export interface ArticleDetailResponse extends Article {}
export interface TrainingDetailResponse extends Training {}
export interface EbookDetailResponse extends Ebook {}
export interface HomePageResponse extends HomeContent {}

export interface EbookDownloadResponse {
    success: boolean;
    download_url?: string;
    message?: string;
    ebook_id?: number;
    ebook_title?: string;
}

