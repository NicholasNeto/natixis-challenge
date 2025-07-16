import React from 'react';
import { useNavigate } from 'react-router-dom';
import type { Product } from '../../api/productApi'; 
import './styles/ProductCard.css'; 

interface ProductCardProps {
  product: Product;
  onDelete: (id: number) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onDelete }) => {
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/produtos/editar/${product.id}`);
  };

  return (
    <div className="product-card">
      <div className="product-card-content">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-description">{product.description}</p>
        <div className="product-details">
          <span className="product-price">
            {product.price.toLocaleString('pt-PT', { style: 'currency', currency: 'EUR' })}
          </span>
          <span className="product-stock">
            Stock: {product.stock}
          </span>
        </div>
      </div>
      <div className="product-card-actions">
        <button className="action-button edit-button" onClick={handleEdit}>Editar</button>
        <button className="action-button delete-button" onClick={() => onDelete(product.id)}>Apagar</button>
      </div>
    </div>
  );
};

export default ProductCard;

