import axios from 'axios';
import { useState } from 'react';
import { API_URL } from './env';
import Cookies from 'js-cookie';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    Accept: 'application/json'
  }
});

api.defaults.withCredentials = true;

api.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = Cookies.get('refreshToken');

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  if (refreshToken) {
    config.headers['X-Refresh-Token'] = `Bearer ${refreshToken}`;
  }

  if (config.data instanceof FormData) {
    config.headers['Content-Type'] = 'multipart/form-data';
  }

  return config;
});

api.interceptors.response.use(
  (response) => response.data,
  (error) => Promise.reject(error)
);

function useApi() {
  const [loading, setLoading] = useState(false);

  async function get(url, options = {}) {
    setLoading(true);
    try {
      const response = await api.get(url, options);
      setLoading(false);
      return response;
    } catch (error) {
      setLoading(false);
      throw error;
    }
  }

  async function post(url, data) {
    setLoading(true);
    try {
      const response = await api.post(url, data);
      setLoading(false);
      return response;
    } catch (error) {
      setLoading(false);
      throw error;
    }
  }
  async function patch(url, data) {
    setLoading(true);
    try {
      const response = await api.patch(url, data);
      setLoading(false);
      return response;
    } catch (error) {
      setLoading(false);
      throw error;
    }
  }
  async function deleteFunc(url, data) {
    setLoading(true);
    try {
      const response = await api.delete(url, data);
      setLoading(false);
      return response;
    } catch (error) {
      setLoading(false);
      throw error;
    }
  }

  return { get, post, patch, deleteFunc, loading };
}

export default useApi;
