export interface RGPDContent {
    owner_name: string;
    trade_name: string;
    legal_status: string;
    siret: string;
    address: string;
    email: string;
    phone: string;
    host_name: string;
    host_address: string;
    host_contact: string;
    personal_data_text: string;
    cookies_text: string;
    updated_at: string;
}

export const processRGPDContent = (content: RGPDContent): RGPDContent => ({
    ...content,
});
