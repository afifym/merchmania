import CartItem from '../CartItem/CartItem';
import { Grid, Box, Container, Typography } from '@material-ui/core';
import { useSelector } from 'react-redux';

const CartList = () => {
  const cartItems = useSelector((state) => state.cartItems);
  return (
    <Container maxWidth='lg'>
      <Box py={10}>
        <Grid container className='' spacing={3}>
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <Grid key={item.id} item lg={3} sm={6}>
                <CartItem data={item} />
              </Grid>
            ))
          ) : (
            <Typography component='h2' variant='h4'>
              Cart is empty
            </Typography>
          )}
        </Grid>
      </Box>
    </Container>
  );
};

export default CartList;
