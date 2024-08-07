import React from 'react';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import {
  Box, Button, IconButton, Popover, Typography,
} from '@mui/material';
import { Product } from '../model/productTypes';
import ModalComponent from './Modal';
import ProductForm from './ProductForm';
import { deleteProduct } from '../features/productsSlice';
import { useAppDispatch } from '../app/hooks';

interface ManagerToolsProps {
  product: Product;
  onSave: (product: Product) => void;
}

const ManagerTools: React.FC<ManagerToolsProps> = ({ product, onSave }) => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
  const [openEditModal, setOpenEditModal] = React.useState(false);
  const [openDeleteModal, setOpenDeleteModal] = React.useState(false);
  const dispatch = useAppDispatch();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOpenEditModal = () => {
    setOpenEditModal(true);
    handleClose();
  };
  const handleCloseEditModal = () => {
    setOpenEditModal(false);
  };

  const handleOpenDeleteModal = () => {
    setOpenDeleteModal(true);
    handleClose();
  };
  const handleCloseDeleteModal = () => setOpenDeleteModal(false);

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const handleSaveProductChanges = (updatedProduct: Product) => {
    onSave(updatedProduct);
    handleCloseEditModal();
  };

  const handleDelete = async () => {
    await dispatch(deleteProduct(product.id));
    handleCloseDeleteModal();
  };

  return (
    <Box component="div">
      <Button aria-describedby={id} variant="contained" size="small" onClick={handleClick}>
        <ManageAccountsIcon />
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <IconButton aria-label="edit" size="small" onClick={handleOpenEditModal}><ModeEditIcon /></IconButton>
        <IconButton aria-label="delete" size="small" onClick={handleOpenDeleteModal}><DeleteIcon /></IconButton>
      </Popover>

      <ModalComponent open={openEditModal} onClose={handleCloseEditModal}>
        <ProductForm onSave={handleSaveProductChanges} existingProduct={product} />
      </ModalComponent>

      <ModalComponent open={openDeleteModal} onClose={handleCloseDeleteModal}>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
        >
          <Typography component="p" sx={{ marginBottom: '15px' }}>Are you sure you want to delete the product?</Typography>
          <Button onClick={handleDelete} variant="contained" size="small">Ok</Button>
        </Box>
      </ModalComponent>
    </Box>
  );
};

export default ManagerTools;
