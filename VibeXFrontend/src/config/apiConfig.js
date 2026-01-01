export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const API_ENDPOINTS = {
  PLAYLIST: {
    CREATE: `${API_BASE_URL}/api/playlists`,
    GET_ALL: `${API_BASE_URL}/api/playlists`,
    GET_BY_ID: (id) => `${API_BASE_URL}/api/playlists/${id}`,
    DELETE: (id) => `${API_BASE_URL}/api/playlists/${id}`,
  },
};
