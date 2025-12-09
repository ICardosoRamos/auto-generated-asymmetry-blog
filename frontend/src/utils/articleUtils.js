const defaultFormatter = new Intl.DateTimeFormat('pt-BR', {
  day: '2-digit',
  month: 'short',
  year: 'numeric',
});

export const formatDate = (value) => defaultFormatter.format(new Date(value));

export const buildExcerpt = (text, words = 40) => {
  if (!text) return '';
  const clean = text.replace(/\s+/g, ' ').trim();
  const parts = clean.split(' ').slice(0, words).join(' ');
  return `${parts}${clean.split(' ').length > words ? '...' : ''}`;
};

export const estimateReadTime = (text, wpm = 200) => {
  const words = text ? text.trim().split(/\s+/).length : 0;
  const minutes = Math.max(1, Math.ceil(words / wpm));
  return `${minutes} min de leitura`;
};

export const placeholderForTitle = (title = 'AutoBlog', width = 800, height = 600) =>
  `/placeholder.svg?width=${width}&height=${height}&title=${encodeURIComponent(title)}`;
