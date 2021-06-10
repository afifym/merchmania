import ProductItem from '../ProductItem/ProductItem';
import {
  Grid,
  Box,
  Container,
  LinearProgress,
  Typography,
} from '@material-ui/core';
import { useEffect, useState } from 'react';

const fetchData = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

const SearchResults = ({ location }) => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(location.search);

    setIsLoading(true);
    const fetchProducts = async (url) => {
      const data = await fetchData(url);

      const searchKey = params.get('key');
      if (searchKey) {
        const filteredProducts = data.filter(
          (product) => product.title.toLowerCase().search(searchKey) !== -1
        );
        setProducts(filteredProducts);
      } else {
        const searchCategory = params.get('category');
        const filteredProducts = data.filter(
          (product) => product.category === searchCategory
        );
        setProducts(filteredProducts);
      }
      setIsLoading(false);
    };

    fetchProducts('https://fakestoreapi.com/products');
  }, [location.search]);

  return (
    <Box py={10}>
      <Container>
        {isLoading ? (
          <LinearProgress />
        ) : (
          <Grid container spacing={1}>
            {products.length > 0 ? (
              products.map((item) => (
                <Grid key={item.id} item lg={3} md={4} sm={6}>
                  <ProductItem data={item} />
                </Grid>
              ))
            ) : (
              <Typography variant='h4' component='h4'>
                No matches found
              </Typography>
            )}
          </Grid>
        )}
      </Container>
    </Box>
  );
};

export default SearchResults;
