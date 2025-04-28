import { getImageUrl } from '../utils/imageUtils';

export interface Testimonial {
    id: number;
    name: string;
    role: string;
    avatar: string;
    quote: string;
    rating: number;
}

// Process testimonial
export const processTestimonial = (testimonial: Testimonial): Testimonial => ({
    ...testimonial,
    avatar: getImageUrl(testimonial.avatar)
});
