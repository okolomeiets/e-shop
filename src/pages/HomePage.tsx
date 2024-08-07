import React from 'react';
import {
  Grid, Card, CardMedia, CardContent, Typography, Paper, Button,
} from '@mui/material';
import { Link } from 'react-router-dom';
import bannerImage from '../images/banner.jpg';
import productImg1 from '../images/product_1.jpg';
import productImg2 from '../images/product_2.jpg';
import productImg3 from '../images/product_3.jpg';
import productImg4 from '../images/product_4.jpg';

const products = [
  {
    id: 1, name: 'Samsung Galaxy Book', imageUrl: productImg1, description: 'Samsung Galaxy Book S (2020) Laptop With Intel Lakefield Chip, 8GB of RAM Launched',
  },
  {
    id: 2, name: 'MacBook Pro', imageUrl: productImg2, description: 'MacBook Pro 2021 with mini-LED display may launch between September, November',
  },
  {
    id: 3, name: 'Microsoft Surface Laptop 4', imageUrl: productImg3, description: 'Style and speed. Stand out on HD video calls backed by Studio Mics. Capture ideas on the vibrant touchscreen.',
  },
  {
    id: 4, name: 'Infinix INBOOK', imageUrl: productImg4, description: 'Infinix Inbook X1 Ci3 10th 8GB 256GB 14 Win10 Grey – 1 Year Warranty',
  },

];

const HomePage = () => (
  <div>
    <Paper sx={{
      position: 'relative', textAlign: 'center', color: '#fff', backgroundImage: `url(${bannerImage})`, padding: '50px',
    }}
    >
      <Typography variant="h4" component="h1" gutterBottom sx={{ padding: 8, backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
        Welcome to Our Online Store!
      </Typography>
      <Button
        component={Link}
        to="/products/categories"
        variant="contained"
        color="primary"
        sx={{ marginBottom: 2 }}
      >
        Shop Now
      </Button>
    </Paper>

    <Grid container spacing={2} sx={{ padding: 2 }}>
      {products.map((product) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
          <Card>
            <CardMedia
              component="img"
              height="220"
              image={product.imageUrl}
              alt={product.name}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {product.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {product.description}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  </div>
);

export default HomePage;
