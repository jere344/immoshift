import { ArticleSummary, processArticleSummary } from './Article';
import { TrainingSummary, processTrainingSummary } from './Training';
import { EbookSummary, processEbookSummary } from './Ebook';
import { Testimonial, processTestimonial } from './Testimonial';

export interface HomeContent {
    testimonials: Testimonial[];
    trainings: TrainingSummary[];
    articles: ArticleSummary[];
    ebooks: EbookSummary[];
}

// Process home content
export const processHomeContent = (content: HomeContent): HomeContent => ({
    ...content,
    testimonials: content.testimonials.map(processTestimonial),
    trainings: content.trainings.map(processTrainingSummary),
    articles: content.articles.map(processArticleSummary),
    ebooks: content.ebooks.map(processEbookSummary)
});
