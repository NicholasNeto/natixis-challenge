import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import ProductForm from '../ProductForm';

describe('Componente: ProductForm', () => {
  
  it('deve chamar a função onSubmit com os dados do formulário quando submetido', async () => {
    
    const mockOnSubmit = vi.fn();
    render(<ProductForm onSubmit={mockOnSubmit} isSubmitting={false} />);

    
    await userEvent.type(screen.getByLabelText(/Nome do Produto/i), 'Produto Novo');
    await userEvent.type(screen.getByLabelText(/Descrição/i), 'Descrição do produto novo');
    await userEvent.type(screen.getByLabelText(/Preço/i), '150');
    await userEvent.type(screen.getByLabelText(/Stock/i), '50');
    
    
    await userEvent.click(screen.getByRole('button', { name: /Guardar Produto/i }));

    
    expect(mockOnSubmit).toHaveBeenCalledTimes(1);
    expect(mockOnSubmit).toHaveBeenCalledWith({
      name: 'Produto Novo',
      description: 'Descrição do produto novo',
      price: 150,
      stock: 50,
    });
  });

  it('deve preencher os campos com os dados iniciais quando em modo de edição', () => {
    const initialData = {
      id: 1,
      name: 'Produto Existente',
      description: 'Descrição existente.',
      price: 200,
      stock: 10,
    };
    const mockOnSubmit = vi.fn();
    
    render(<ProductForm initialData={initialData} onSubmit={mockOnSubmit} isSubmitting={false} />);

    expect(screen.getByLabelText(/Nome do Produto/i)).toHaveValue('Produto Existente');
    expect(screen.getByLabelText(/Descrição/i)).toHaveValue('Descrição existente.');
    expect(screen.getByLabelText(/Preço/i)).toHaveValue(200);
    expect(screen.getByLabelText(/Stock/i)).toHaveValue(10);
  });
});

