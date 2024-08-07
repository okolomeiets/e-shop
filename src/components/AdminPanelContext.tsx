// I want to keep this file as an example of usage with context.

import {
  Grid, Box, Switch, Fab,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import { useAdmin } from '../contexts/AdminContext';
import ModalComponent from './Modal';
import ProductForm from './ProductForm';
import { Product } from '../model/productTypes';
import { useProducts } from '../contexts/ProductsContext';

const AdminPanel = () => {
  const [openAddNewProductModal, setOpenAddNewProductModal] = useState(false);
  const { toggleManagerTools, isManagerToolsVisible, setManagerToolsVisible } = useAdmin();
  const { addProduct } = useProducts();

  const handleOpenAddNewProductModal = () => setOpenAddNewProductModal(true);
  const handleCloseAddNewProductModal = () => setOpenAddNewProductModal(false);

  const handleAddNewProduct = async (newProduct: Product) => {
    await addProduct(newProduct);
    handleCloseAddNewProductModal();
  };

  useEffect(() => () => {
    setManagerToolsVisible(false);
  }, [setManagerToolsVisible]);

  return (
    <Box sx={{ padding: '15px' }}>
      <Grid
        container
        direction="row"
        justifyContent="flex-start"
        alignItems="center"
      >
        <Grid item xs="auto">Turn on manage mode</Grid>
        <Grid item xs="auto"><Switch onChange={toggleManagerTools} /></Grid>
        {isManagerToolsVisible && (
        <Grid item xs="auto">
          <Fab variant="extended" size="small" color="primary" onClick={handleOpenAddNewProductModal}>
            <AddIcon sx={{ mr: 1 }} />
            Add new product
          </Fab>
        </Grid>
        ) }
      </Grid>
      <ModalComponent open={openAddNewProductModal} onClose={handleCloseAddNewProductModal}>
        <ProductForm onSave={handleAddNewProduct} />
      </ModalComponent>
    </Box>
  );
};

export default AdminPanel;
