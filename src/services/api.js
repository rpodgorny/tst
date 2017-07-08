import axios from 'axios';
import { state, CONFIG } from '../app/store';

export const getLayout = () => {
  return axios.get(`${state(CONFIG).placesUrl}/layout`);
};

export const getPlacements = () => {
  return axios.get(`${state(CONFIG).placesUrl}/placements`);
};

export const updatePlacement = (id, data) => {
  return axios.put(`${state(CONFIG).placesUrl}/placements/${id}`, data);
};
