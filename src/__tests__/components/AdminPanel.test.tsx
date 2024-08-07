import React from 'react';
import {
  render, screen, act, waitFor,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AdminPanel from '../../components/AdminPanel';

jest.mock('../../contexts/ProductsContext', () => {
  const addProductSpy = jest.fn();
  return {
    useProducts: () => ({ addProduct: addProductSpy }),
  };
});

jest.mock('../../contexts/AdminContext', () => ({
  useAdmin: () => ({
    toggleManagerTools: jest.fn(),
    isManagerToolsVisible: true,
  }),
}));

jest.mock('../../components/ProductForm', () => ({
  __esModule: true,
  default: ({ onSave }: { onSave: any }) => (
    <button onClick={async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
      onSave('test');
    }}
    >
      Form
    </button>
  ),
}));

describe('AdminPanel', () => {
  test('renders content', () => {
    render(<AdminPanel />);
    expect(screen.getByText('Turn on manage mode')).toBeInTheDocument();
  });

  test('calls addProductSpy from the form component', async () => {
    render(<AdminPanel />);
    const formButton = screen.getByText('Add new product');

    await act(async () => {
      userEvent.click(formButton);
    });

    const form = screen.getByText('Form');
    expect(form).toBeInTheDocument();

    await act(async () => {
      userEvent.click(form);
    });

    await waitFor(() => {
      const { useProducts } = require('../../contexts/ProductsContext');
      const { addProduct } = useProducts();
      expect(addProduct).toHaveBeenCalledWith('test');
    });
  });

  test('modal opens and closes correctly', async () => {
    render(<AdminPanel />);

    await act(async () => {
      userEvent.click(screen.getByText('Add new product'));
    });

    expect(screen.queryByText('Form')).toBeInTheDocument();

    await act(async () => {
      userEvent.click(screen.getByText('Form'));
    });

    await waitFor(() => {
      expect(screen.queryByText('Form')).not.toBeInTheDocument();
    });
  });
});
