import { getImageUrl } from '../utils/imageUtils';

export type MediaType = 'none' | 'image' | 'video_url' | 'video_file';

export interface Paragraph {
    id: number;
    title?: string;
    content?: string;
    media_type?: MediaType;
    image?: string;
    video_url?: string;
    video_file?: string;
    thumbnail?: string;
    file_size_mb?: number;
    position: number;
}

// Process paragraph to add image URLs
export const processParagraph = (paragraph: Paragraph): Paragraph => ({
    ...paragraph,
    image: paragraph.image ? getImageUrl(paragraph.image) : undefined,
    thumbnail: paragraph.thumbnail ? getImageUrl(paragraph.thumbnail) : undefined,
    video_file: paragraph.video_file ? getImageUrl(paragraph.video_file) : undefined
});
