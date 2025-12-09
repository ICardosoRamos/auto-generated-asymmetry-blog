import client from './client.js';

export const fetchArticles = async () => {
  try {
    const { data } = await client.get('/articles');
    return data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Falha ao carregar artigos');
  }
};

export const fetchArticleById = async (id) => {
  try {
    const { data } = await client.get(`/articles/${id}`);
    return data;
  } catch (error) {
    if (error.response?.status === 404) {
      throw new Error('Artigo não encontrado');
    }
    throw new Error(error.response?.data?.message || 'Falha ao carregar artigo');
  }
};
