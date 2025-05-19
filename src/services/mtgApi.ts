import axios from 'axios';

const mtgApi = axios.create({
  baseURL: 'https://api.magicthegathering.io/v1',
});

export const getCards = async (name?: string) => {
  const response = await mtgApi.get('/cards', {
    params: name ? { name } : {},
  });
  return response.data.cards;
};

export const getCardById = async (id: string) => {
  const response = await mtgApi.get(`/cards/${id}`);
  return response.data.card;
};
