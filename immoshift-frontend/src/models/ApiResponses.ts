import { Article } from './Article';
import { Training } from './Training';
import { Ebook } from './Ebook';
import { HomeContent } from './HomeContent';
import { RGPDContent } from './RGPD';
import { SiteConfig } from './SiteConfig';

export interface ArticleDetailResponse extends Article {}
export interface TrainingDetailResponse extends Training {}
export interface EbookDetailResponse extends Ebook {}
export interface HomePageResponse extends HomeContent {}
export interface RGPDContentResponse extends RGPDContent {}
export interface SiteConfigResponse extends SiteConfig {}

export interface EbookDownloadResponse {
    success: boolean;
    download_url?: string;
    message?: string;
    ebook_id?: number;
    ebook_title?: string;
}
