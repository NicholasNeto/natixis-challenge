import React, { useState, useEffect, type FormEvent } from 'react';
import type { Product, ProductData } from '../../api/productApi';
import './styles/ProductForm.css'; 

interface ProductFormProps {
  initialData?: Product | null; 
  onSubmit: (data: ProductData) => void; 
  isSubmitting: boolean;
}

const ProductForm: React.FC<ProductFormProps> = ({ initialData, onSubmit, isSubmitting }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setDescription(initialData.description);
      setPrice(initialData.price);
      setStock(initialData.stock);
    }
  }, [initialData]);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    onSubmit({ name, description, price, stock });
  };

  return (
    <form onSubmit={handleSubmit} className="product-form">
      <div className="form-group">
        <label htmlFor="name">Nome do Produto</label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          disabled={isSubmitting}
        />
      </div>
      <div className="form-group">
        <label htmlFor="description">Descrição</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          disabled={isSubmitting}
          rows={4}
        />
      </div>
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="price">Preço (€)</label>
          <input
            id="price"
            type="number"
            step="0.01"
            min="0"
            value={price}
            onChange={(e) => setPrice(parseFloat(e.target.value))}
            required
            disabled={isSubmitting}
          />
        </div>
        <div className="form-group">
          <label htmlFor="stock">Stock</label>
          <input
            id="stock"
            type="number"
            min="0"
            value={stock}
            onChange={(e) => setStock(parseInt(e.target.value, 10))}
            required
            disabled={isSubmitting}
          />
        </div>
      </div>
      <button type="submit" className="submit-button" disabled={isSubmitting}>
        {isSubmitting ? 'A guardar...' : 'Guardar Produto'}
      </button>
    </form>
  );
};

export default ProductForm;

