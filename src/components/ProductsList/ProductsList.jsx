import ProductItem from '../ProductItem/ProductItem';
import { Grid, Box, Container, LinearProgress } from '@material-ui/core';
import { useEffect, useState } from 'react';
import Pagination from '@material-ui/lab/Pagination';

const fetchData = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

const productsPerPage = 8;
const ProductsList = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    setIsLoading(true);

    const fetchProducts = async (url) => {
      const data = await fetchData(url);
      setProducts(data);
      setIsLoading(false);
    };

    fetchProducts('https://fakestoreapi.com/products');
  }, []);

  const lastItemIndex = page * productsPerPage;
  const firstItemIndex = page * productsPerPage - productsPerPage;
  const currentProducts = products.slice(firstItemIndex, lastItemIndex);
  return (
    <Box py={10}>
      <Container>
        {isLoading && <LinearProgress />}
        <Grid container spacing={1}>
          {currentProducts.length > 0 ? (
            currentProducts.map((item) => (
              <Grid key={item.id} item lg={3} md={4} sm={6}>
                <ProductItem data={item} />
              </Grid>
            ))
          ) : (
            <LinearProgress />
          )}
        </Grid>
        <Box display='flex' justifyContent='center' my={4}>
          <Pagination
            count={Math.ceil(products.length / productsPerPage)}
            color='primary'
            onChange={(e, val) => setPage(val)}
          />
        </Box>
      </Container>
    </Box>
  );
};

export default ProductsList;
