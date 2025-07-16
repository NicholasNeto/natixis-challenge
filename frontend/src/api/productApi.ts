import apiClient from './axiosConfig';

export interface Product {
  id: number; 
  name: string;
  description: string;
  price: number;
  stock: number;
}

export type ProductData = Omit<Product, 'id'>;


/**
 * READ: Fetches all products.
 * @returns A promise with the Axios response containing the list of products.
 */
export const getProducts = async () => {
  try {
    const response = await apiClient.get<Product[]>('/products');
    console.log("--", response)
    
    return response;
  } catch (error) {
    console.error("Erro ao buscar produtos:", error);
    throw error;
  }
};

/**
 * READ: Fetches a single product by its ID.
 * @param id - The ID of the product to be fetched.
 * @returns A promise with the Axios response containing the product data.
 */
export const getProductById = async (id: number) => {
  try {
    const response = await apiClient.get<Product>(`/products/${id}`);
    return response;
  } catch (error) {
    console.error(`Erro ao buscar o produto com ID ${id}:`, error);
    throw error;
  }
};

/**
 * CREATE: Creates a new product.
 * @param productData - The data for the new product to be created.
 * @returns A promise with the Axios response containing the newly created product.
 */
export const createProduct = async (productData: ProductData) => {
  try {
    const response = await apiClient.post<Product>('/products', productData);
    return response;
  } catch (error) {
    console.error("Erro ao criar o produto:", error);
    throw error;
  }
};

/**
 * UPDATE: Updates an existing product.
 * @param id - The ID of the product to be updated.
 * @param productData - The new data for the product.
 * @returns A promise with the Axios response containing the updated product.
 */
export const updateProduct = async (id: number, productData: ProductData) => {
  try {
    const response = await apiClient.put<Product>(`/products/${id}`, productData);
    return response;
  } catch (error) {
    console.error(`Erro ao atualizar o produto com ID ${id}:`, error);
    throw error;
  }
};

/**
 * DELETE: Deletes a product.
 * @param id - The ID of the product to be deleted.
 * @returns A promise with the Axios response.
 */
export const deleteProduct = async (id: number) => {
  try {
    const response = await apiClient.delete(`/products/${id}`);
    // A resposta de um DELETE bem-sucedido geralmente é 204 No Content (sem corpo)
    return response;
  } catch (error) {
    console.error(`Erro ao apagar o produto com ID ${id}:`, error);
    throw error;
  }
};



