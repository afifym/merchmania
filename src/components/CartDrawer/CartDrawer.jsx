import {
  Drawer,
  IconButton,
  Badge,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  Box,
  makeStyles,
} from '@material-ui/core';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';

import { useSelector } from 'react-redux';
import { useState } from 'react';
import { StyledLink } from '../../shared/styles';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    height: '270px',
    borderRadius: 0,
    boxShadow: 'none',
  },
  media: {
    height: 140,
    objectFit: 'contain',
    backgroundSize: 'contain',
  },
});

const CartDrawer = () => {
  const cartItems = useSelector((state) => state.cartItems);
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const handleCartOpen = () => {
    setOpen(true);
  };

  const handleCartClose = () => {
    setOpen(false);
  };

  const getAllAmounts = (items) => {
    return items.reduce((acc, item) => {
      return acc + item.amount;
    }, 0);
  };
  return (
    <>
      <Drawer anchor='right' open={open} onClose={handleCartClose}>
        <Box p={3}>
          {cartItems.length > 0 ? (
            cartItems.map((data) => {
              return (
                <Card key={data.id} className={classes.root}>
                  <CardActionArea>
                    <StyledLink to={`/product-details/${data.id}`}>
                      <CardMedia
                        className={classes.media}
                        image={data.image}
                        title={data.title}
                      />
                      <CardContent>
                        <Typography noWrap variant='h6' component='h2'>
                          {data.title}
                        </Typography>
                        <Box
                          display='flex'
                          alignItems='center'
                          justifyContent='space-between'
                          mt={1}
                        >
                          <Typography noWrap component='p'>
                            Quantity: {data.amount}
                          </Typography>
                          <Typography
                            noWrap
                            variant='h5'
                            component='h2'
                            style={{ fontWeight: 700 }}
                          >
                            ${data.price}
                          </Typography>
                        </Box>
                      </CardContent>
                    </StyledLink>
                  </CardActionArea>
                </Card>
              );
            })
          ) : (
            <Typography m={5}>No items in cart</Typography>
          )}
        </Box>
      </Drawer>
      <IconButton color='secondary' onClick={handleCartOpen}>
        <Badge badgeContent={getAllAmounts(cartItems)} color='error'>
          <AddShoppingCartIcon />
        </Badge>
      </IconButton>
    </>
  );
};

export default CartDrawer;
