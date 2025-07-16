
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductById, createProduct, updateProduct } from '../api/productApi';
import type { Product, ProductData } from '../api/productApi';
import ProductForm from '../components/product/ProductForm';
import './styles/ProductFormPage.css';

const ProductFormPage: React.FC = () => {
  const { id } = useParams<{ id: string }>(); 
  const navigate = useNavigate();
  const isEditMode = Boolean(id);

  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(isEditMode);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isEditMode && id) {
      const fetchProduct = async () => {
        try {
          const response = await getProductById(Number(id));
          setProduct(response.data);
        } catch (err) {
          setError('Não foi possível carregar os dados do produto.');
          console.error(err);
        } finally {
          setIsLoading(false);
        }
      };
      fetchProduct();
    }
  }, [id, isEditMode]);

  const handleSubmit = async (data: ProductData) => {
    setIsSubmitting(true);
    setError(null);
    try {
      if (isEditMode && id) {
        await updateProduct(Number(id), data);
      } else {
        await createProduct(data);
      }
      navigate('/produtos');
    } catch (err) {
      setError('Falha ao guardar o produto. Por favor, tente novamente.');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) return <div className="page-status">A carregar dados do produto...</div>;
  
  return (
    <div className="product-form-page">
      <h1>{isEditMode ? 'Editar Produto' : 'Cadastrar Novo Produto'}</h1>
      {error && <p className="error-message">{error}</p>}
      <ProductForm 
        onSubmit={handleSubmit}
        initialData={product}
        isSubmitting={isSubmitting}
      />
    </div>
  );
};

export default ProductFormPage
