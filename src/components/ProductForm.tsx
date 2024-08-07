import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import {
  Button, Grid, styled, TextField, Divider, Box,
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Product } from '../model/productTypes';
import AlertMessage from './AlertMessage';
import { PLACEHOLDER_IMG_200X400 } from '../services/config';

interface ProductFormProps {
  existingProduct?: Product | null;
  onSave: (product: Product) => void;
}

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

const ProductForm: React.FC<ProductFormProps> = ({ existingProduct, onSave }) => {
  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors }, reset,
  } = useForm<Product>({
    defaultValues: {
      id: existingProduct?.id || Math.floor(Math.random() * 100000),
      title: existingProduct?.title || '',
      description: existingProduct?.description || '',
      price: existingProduct?.price || 0,
      brand: existingProduct?.brand || '',
      category: existingProduct?.category || '',
      discountPercentage: existingProduct?.discountPercentage || 0,
      images: existingProduct?.images || [],
      rating: existingProduct?.rating || 0,
      stock: existingProduct?.stock || 0,
      thumbnail: existingProduct?.thumbnail || '',
    },
  });

  const thumbnail = watch('thumbnail');
  const images = watch('images');

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setValue('thumbnail', reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleMultipleImagesUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target?.files;
    if (files) {
      const uploadedImages = watch('images') || [];
      Array.from(files).forEach((file) => {
        const reader = new FileReader();
        reader.onload = (e: ProgressEvent<FileReader>) => {
          const result = e.target?.result;
          if (result && typeof result === 'string') {
            uploadedImages.push(result);
            setValue('images', uploadedImages);
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const handleRemoveImage = (index: number) => {
    const currentImages = watch('images') || [];
    const updatedImages = currentImages.filter((_, i) => i !== index);
    setValue('images', updatedImages);
  };

  useEffect(() => {
    if (existingProduct) {
      reset(existingProduct);
    }
  }, [existingProduct, reset]);

  const onSubmit = (data: Product) => onSave(data);

  return (
    <>
      {Object.keys(errors).length > 0 && (
      <Box sx={{ marginBottom: '10px' }}>
        <AlertMessage severity="error" variant="standard">
          Please fill in all the required fields.
        </AlertMessage>
      </Box>
      )}

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Grid container spacing={2} sx={{ padding: '5px 15px' }}>
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Grid container spacing={2}>
                  <Grid item xs={3}>
                    {thumbnail ? (
                      <img src={thumbnail} alt="Thumbnail" className="editable-img" />
                    ) : (
                      <img src={PLACEHOLDER_IMG_200X400} alt="Placeholder" className="editable-img" />
                    )}
                  </Grid>
                  <Grid item xs={9}>
                    <Controller
                      name="thumbnail"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          fullWidth
                          label="Thumbnail URL"
                          variant="outlined"
                          sx={{ marginBottom: '10px' }}
                        />
                      )}
                    />
                    <Button
                      fullWidth
                      component="label"
                      variant="contained"
                      startIcon={<CloudUploadIcon />}
                    >
                      Upload Thumbnail
                      <VisuallyHiddenInput
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                      />
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Divider sx={{ margin: '15px 0' }} />
          </Grid>

          <Grid item xs={12}>
            <Grid container spacing={2}>
              {images && images.map((image, index) => (
                <React.Fragment key={image}>
                  <Grid item xs={3}>
                    <img src={image} alt={`img-${index}`} className="editable-img" />
                  </Grid>
                  <Grid item xs={9}>
                    <TextField
                      fullWidth
                      name={`images[${index}]`}
                      value={image}
                      label="Images URL"
                      variant="outlined"
                      sx={{ marginBottom: '10px' }}
                    />
                    <Button
                      fullWidth
                      onClick={() => handleRemoveImage(index)}
                      variant="contained"
                      color="error"
                    >
                      Remove
                    </Button>
                  </Grid>
                </React.Fragment>
              ))}

              <Grid item xs={12}>
                <Divider sx={{ margin: '15px 0' }} />
              </Grid>

              <Grid item xs={12}>
                <Button
                  component="label"
                  fullWidth
                  variant="contained"
                  startIcon={<CloudUploadIcon />}
                >
                  {existingProduct ? 'Add More Images' : 'Upload Images'}
                  <VisuallyHiddenInput
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleMultipleImagesUpload}
                  />
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Divider sx={{ margin: '15px 0' }} />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="title"
              control={control}
              rules={{ required: 'Title is required' }}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Title"
                  error={Boolean(errors.title)}
                  helperText={errors.title?.message}
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="description"
              control={control}
              rules={{ required: 'Description is required' }}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  multiline
                  rows={4}
                  label="Description"
                  error={Boolean(errors.description)}
                  helperText={errors.description?.message}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="price"
              control={control}
              rules={{
                required: 'Price is required',
                min: {
                  value: 0.01,
                  message: 'Price must be more than 0',
                },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  type="number"
                  label="Price"
                  error={Boolean(errors.price)}
                  helperText={errors.price?.message}
                  InputProps={{ inputProps: { min: 0.01, step: 'any' } }}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="brand"
              control={control}
              rules={{ required: 'Brand is required' }}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Brand"
                  error={Boolean(errors.brand)}
                  helperText={errors.brand?.message}
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="category"
              control={control}
              rules={{ required: 'Category is required' }}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Category"
                  error={Boolean(errors.category)}
                  helperText={errors.category?.message}
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="discountPercentage"
              control={control}
              rules={{
                min: {
                  value: 0,
                  message: 'Discount Percentage must be at least 0',
                },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  type="number"
                  label="Discount Percentage"
                  error={Boolean(errors.discountPercentage)}
                  helperText={errors.discountPercentage?.message}
                  InputProps={{ inputProps: { min: 0, step: 'any' } }}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="rating"
              control={control}
              rules={{
                min: {
                  value: 0,
                  message: 'Rating must be at least 0',
                },
                max: {
                  value: 5,
                  message: 'Rating must not exceed 5',
                },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  type="number"
                  label="Rating"
                  error={Boolean(errors.rating)}
                  helperText={errors.rating?.message}
                  InputProps={{ inputProps: { min: 0, max: 5, step: 'any' } }}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="stock"
              control={control}
              rules={{
                required: 'Stock is required',
                min: {
                  value: 0,
                  message: 'Stock must be at least 0',
                },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  type="number"
                  label="Stock"
                  error={Boolean(errors.stock)}
                  helperText={errors.stock?.message}
                  InputProps={{ inputProps: { min: 0 } }}
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              {existingProduct ? 'Update Product' : 'Add Product'}
            </Button>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default ProductForm;
