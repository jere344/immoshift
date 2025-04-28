import { Paragraph, processParagraph } from './Paragraph';
import { getImageUrl } from '../utils/imageUtils';

export interface Training {
    id: number;
    title: string;
    slug: string;
    short_description: string;
    duration?: string;
    price?: number;
    show_price: boolean;
    image: string;
    video_url?: string;
    is_active: boolean;
    position: number;
    created_at: string;
    updated_at: string;
    paragraphs?: Paragraph[];
}

// For list view (homepage, etc.)
export interface TrainingSummary {
    id: number;
    title: string;
    slug: string;
    short_description: string;
    image: string;
    duration?: string;
    price?: number;
    show_price: boolean;
    position: number;
}

// Process training with full data
export const processTraining = (training: Training): Training => ({
    ...training,
    image: getImageUrl(training.image),
    paragraphs: training.paragraphs?.map(processParagraph)
});

// Process training summary
export const processTrainingSummary = (training: TrainingSummary): TrainingSummary => ({
    ...training,
    image: getImageUrl(training.image)
});
