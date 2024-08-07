import {
  Grid, Box, Switch, Fab,
} from '@mui/material';
import React, { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import { connect, ConnectedProps } from 'react-redux';
import { RootState, AppDispatch } from '../app/store';
import { toggleManagerTools as toggleManagerToolsAction } from '../features/managerSlice';
import { addProduct as addProductAction } from '../features/productsSlice';
import ModalComponent from './Modal';
import ProductForm from './ProductForm';
import { Product } from '../model/productTypes';

const mapStateToProps = (state: RootState) => ({
  isManagerToolsVisible: state.manager.isManagerToolsVisible,
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  toggleManagerTools: () => dispatch(toggleManagerToolsAction()),
  addProduct: (product: Product) => dispatch(addProductAction(product)).then(() => {}),
});

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

const AdminPanel: React.FC<PropsFromRedux> = ({ isManagerToolsVisible, toggleManagerTools, addProduct }) => {
  const [openAddNewProductModal, setOpenAddNewProductModal] = useState(false);

  const handleOpenAddNewProductModal = () => setOpenAddNewProductModal(true);
  const handleCloseAddNewProductModal = () => setOpenAddNewProductModal(false);

  const handleAddNewProduct = async (newProduct: Product) => {
    await addProduct(newProduct);
    handleCloseAddNewProductModal();
  };

  return (
    <Box sx={{ padding: '15px' }}>
      <Grid
        container
        direction="row"
        justifyContent="flex-start"
        alignItems="center"
      >
        <Grid item xs="auto">Turn on manage mode</Grid>
        <Grid item xs="auto">
          <Switch
            onChange={() => {
              toggleManagerTools();
            }}
            checked={isManagerToolsVisible}
          />
        </Grid>
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

export default connector(AdminPanel);
