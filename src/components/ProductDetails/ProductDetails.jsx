import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import {
  Box,
  Button,
  ButtonGroup,
  CardActions,
  Chip,
  Divider,
  Grid,
  LinearProgress,
} from '@material-ui/core';
import { MdAddShoppingCart } from 'react-icons/md';
import { AiOutlineSearch } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { add_item, increase_amount } from '../../store/actions';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: 151,
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  playIcon: {
    height: 38,
    width: 38,
  },
}));

const ProductDetails = ({ match }) => {
  const [productDetails, setProductDetails] = useState({});
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cartItems);
  const [isLoading, setIsLoading] = useState(false);
  const classes = useStyles();
  const history = useHistory();

  const handleAddToCart = () => {
    const inCart = cartItems.find(
      (item) => item.id === parseInt(match.params.id)
    );
    console.log(match.params.id);
    console.log(cartItems);

    if (inCart) {
      dispatch(increase_amount(parseInt(match.params.id)));
    } else {
      productDetails.amount = 1;
      dispatch(add_item(productDetails));
    }
  };

  useEffect(() => {
    setIsLoading(true);
    const fetchDetails = async () => {
      const response = await fetch(
        `https://fakestoreapi.com/products/${match.params.id}`
      );
      const data = await response.json();
      setProductDetails(data);
      setIsLoading(false);
    };

    fetchDetails();
  }, [match.params.id]);

  const handleSearch = () => {
    history.push('/search?category=' + productDetails.category);
  };

  return (
    <Box py={10}>
      {isLoading && <LinearProgress />}
      {productDetails.id && (
        <Card className={classes.root}>
          <Grid container>
            <Grid item sm={8}>
              <CardContent className={classes.content}>
                <Box m={5}>
                  <Typography component='h2' variant='h2'>
                    {productDetails.title}
                  </Typography>

                  <Chip
                    variant='outlined'
                    color='primary'
                    label={productDetails.category}
                  />
                </Box>
                <Divider />
                <Box m={5}>
                  <Typography variant='h6' color='textSecondary'>
                    {productDetails.description}
                  </Typography>
                  <Typography variant='h3' color='textSecondary'>
                    ${productDetails.price}
                  </Typography>
                </Box>

                <Box>
                  <CardActions>
                    <ButtonGroup
                      disableElevation
                      size='large'
                      color='primary'
                      variant='contained'
                    >
                      <Button
                        color='secondary'
                        startIcon={<AiOutlineSearch />}
                        style={{ textTransform: 'capitalize' }}
                        onClick={handleSearch}
                      >
                        Similar Items
                      </Button>
                      <Button
                        startIcon={<MdAddShoppingCart />}
                        onClick={handleAddToCart}
                        style={{ textTransform: 'capitalize' }}
                      >
                        Add to Cart
                      </Button>
                    </ButtonGroup>
                  </CardActions>
                </Box>
              </CardContent>
            </Grid>
            <Grid className='' item sm={4}>
              <Box
                display='flex'
                alignItems='center'
                justifyContent='center'
                style={{ height: '100%' }}
              >
                <img
                  className={classes.cover}
                  src={productDetails.image}
                  alt={productDetails.title}
                  style={{ width: '70%' }}
                />
              </Box>
            </Grid>
          </Grid>
        </Card>
      )}
    </Box>
  );
};

export default ProductDetails;
