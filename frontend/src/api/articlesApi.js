import client from './client.js';

export const fetchArticles = async (params = {}) => {
  try {
    const searchParams = new URLSearchParams();

    const entries = {
      page: params.page ?? 1,
      limit: params.limit ?? 10,
      topic: params.topic ?? '',
      search: params.search ?? '',
      sort: params.sort ?? 'recent',
    };

    Object.entries(entries).forEach(([key, value]) => {
      if (value !== undefined && value !== null && `${value}`.trim() !== '') {
        searchParams.set(key, value);
      }
    });

    const { data } = await client.get(`/articles?${searchParams.toString()}`);
    return data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to load articles');
  }
};

export const fetchArticleById = async (id) => {
  try {
    const { data } = await client.get(`/articles/${id}`);
    return data;
  } catch (error) {
    if (error.response?.status === 404) {
      throw new Error('Article not found');
    }
    throw new Error(error.response?.data?.message || 'Failed to load article');
  }
};

export const generateArticleAdmin = async ({ topic, secret }) => {
  try {
    const { data } = await client.post(
      '/articles/generate',
      { topic: topic?.trim() || undefined },
      {
        headers: { 'x-admin-secret': secret },
      }
    );
    return data;
  } catch (error) {
    const status = error.response?.status;
    if (status === 401) {
      throw new Error('Unauthorized: invalid secret');
    }
    if (status === 429) {
      throw new Error('Please wait before generating another article');
    }
    throw new Error(error.response?.data?.message || 'Failed to generate article');
  }
};
