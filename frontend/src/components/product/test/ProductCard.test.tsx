import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import ProductCard from '../ProductCard';


describe('ProductCard Component', () => {


  it('deve renderizar as informações do produto corretamente', () => {

    const mockProduct = {
      id: 1,
      name: 'Produto Teste',
      description: 'Uma descrição de teste.',
      price: 99.99,
      stock: 10,
    };


    const mockOnDelete = vi.fn(); 
    render(
      <BrowserRouter>
        <ProductCard product={mockProduct} onDelete={mockOnDelete} />
      </BrowserRouter>
    );

    expect(screen.getByText('Produto Teste')).toBeInTheDocument();
    expect(screen.getByText('Uma descrição de teste.')).toBeInTheDocument();
    expect(screen.getByText(/99,99/)).toBeInTheDocument();
    expect(screen.getByText('Stock: 10')).toBeInTheDocument();
  });
});

