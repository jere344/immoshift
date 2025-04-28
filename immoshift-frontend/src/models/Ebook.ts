import { getImageUrl } from '../utils/imageUtils';

export interface Ebook {
    id: number;
    title: string;
    slug: string;
    description: string;
    cover_image: string;
    file?: string;
    is_active: boolean;
    position: number;
    created_at?: string;
}

export interface EbookSummary {
    id: number;
    title: string;
    slug: string;
    description: string;
    cover_image: string;
    is_active: boolean;
    position: number;
}

// For the download form
export interface EbookDownloadRequest {
    ebook: number;
    first_name: string;
    last_name: string;
    email: string;
    phone?: string;
    consent_mailing: boolean;
}

// Process ebook with full data
export const processEbook = (ebook: Ebook): Ebook => ({
    ...ebook,
    cover_image: getImageUrl(ebook.cover_image),
    file: ebook.file ? getImageUrl(ebook.file) : undefined
});

// Process ebook summary
export const processEbookSummary = (ebook: EbookSummary): EbookSummary => ({
    ...ebook,
    cover_image: getImageUrl(ebook.cover_image)
});
