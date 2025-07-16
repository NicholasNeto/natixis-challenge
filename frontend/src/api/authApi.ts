import apiClient from './axiosConfig';


interface LoginCredentials {
    username: string;
    password: string;
}

/**
 * Login function.
 * Sends the credentials to the API's login endpoint.
 *
 * @param credentials - The object with the user's username and password.
 * @returns The Promise from the Axios call. The AuthContext will handle the response.
 */

export const login = async (credentials: LoginCredentials) => {
  try {
    const response = await apiClient.post('/auth/login', credentials);
    return response;

  } catch (error) {
    console.error("Erro na chamada da API de login:", error);
    throw error; 
  }
};
