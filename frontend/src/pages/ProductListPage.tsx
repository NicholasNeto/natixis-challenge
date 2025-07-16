import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProducts, deleteProduct } from '../api/productApi';
import type { Product } from '../api/productApi';
import ProductCard from '../components/product/ProductCard';
import './styles/ProductListPage.css';

const ProductListPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProducts();
        setProducts(response.data);
      } catch (err) {
        setError('Falha ao carregar os produtos. Por favor, tente novamente mais tarde.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleDeleteProduct = async (id: number) => {
    if (window.confirm('Tem a certeza que quer apagar este produto?')) {
      try {
        await deleteProduct(id);
        setProducts(products.filter(p => p.id !== id));
      } catch (err) {
        setError('Falha ao apagar o produto.');
        console.error(err);
      }
    }
  };

  if (loading) {
    return <div className="page-status">A carregar...</div>;
  }

  if (error) {
    return <div className="page-status error">{error}</div>;
  }

  return (
    <div className="product-list-page">
      <header className="page-header">
        <h1>Catálogo de Produtos</h1>
        <button className="add-product-button" onClick={() => navigate('/produtos/novo')}>
          + Adicionar Produto
        </button>
      </header>
      
      {products.length > 0 ? (
        <div className="product-grid">
          {products.map(product => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onDelete={handleDeleteProduct} 
            />
          ))}
        </div>
      ) : (
        <p className="no-products-message">Ainda não existem produtos no catálogo.</p>
      )}
    </div>
  );
};

export default ProductListPage;
