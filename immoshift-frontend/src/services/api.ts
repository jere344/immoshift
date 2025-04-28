import axios from 'axios';
import { 
  ArticleDetailResponse,
  TrainingDetailResponse,
  EbookDetailResponse,
  HomePageResponse,
  EbookDownloadResponse
} from '@models/ApiResponses';
import { EbookDownloadRequest } from '@models/Ebook';
import { processArticle } from '@models/Article';
import { processTraining } from '@models/Training';
import { processEbook } from '@models/Ebook';
import { processHomeContent } from '@models/HomeContent';

// Create a simple API client with default configuration
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});


// Simple API object with methods for each endpoint
const api = {
  getArticleBySlug: async (slug: string): Promise<ArticleDetailResponse> => {
    const response = await apiClient.get(`/article/${slug}/`);
    return processArticle(response.data);
  },
  
  getTrainingBySlug: async (slug: string): Promise<TrainingDetailResponse> => {
    const response = await apiClient.get(`/training/${slug}/`);
    return processTraining(response.data);
  },
  
  getEbookBySlug: async (slug: string): Promise<EbookDetailResponse> => {
    const response = await apiClient.get(`/ebook/${slug}/`);
    return processEbook(response.data);
  },
  
  downloadEbook: async (downloadRequest: EbookDownloadRequest): Promise<EbookDownloadResponse> => {
    const response = await apiClient.post('/download-ebook/', downloadRequest);
    return response.data;
  },
  
  // Home content
  getHomePageContent: async (): Promise<HomePageResponse> => {
    const response = await apiClient.get('/home/');
    return processHomeContent(response.data);
  },
};

export default api;
