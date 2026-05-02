import { getImageUrl } from '../utils/imageUtils';

export interface SiteConfig {
    id: number;
    company_name: string;
    company_description: string;
    contact_email: string;
    contact_address: string;
    contact_city: string;
    logo: string | null;
    transparent_logo: string | null;
    linkedin_url: string;
    facebook_url: string;
    twitter_url: string;
    instagram_url: string;
    calendly_url: string;
    calendly_title: string;
    calendly_description: string;
    calendly_description_short: string;
    calendly_button_text: string;
    hero_title: string;
    hero_subtitle: string;
    hero_description_1: string;
    hero_description_2: string;
    hero_catchphrase: string;
    hero_image: string | null;
}

export const processSiteConfig = (data: any): SiteConfig => {
    return {
        ...data,
        logo: data.logo ? getImageUrl(data.logo) : null,
        transparent_logo: data.transparent_logo ? getImageUrl(data.transparent_logo) : null,
        hero_image: data.hero_image ? getImageUrl(data.hero_image) : null,
    };
};
