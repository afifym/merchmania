import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { ButtonGroup, Button, Box, Chip } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { useDispatch, useSelector } from 'react-redux';
import { add_item, increase_amount } from '../../store/actions';
import { MdAddShoppingCart } from 'react-icons/md';
import { AiOutlineSearch } from 'react-icons/ai';
import { StyledLink } from '../../shared/styles';
import styled from 'styled-components';
import { FaStarHalfAlt, FaStar } from 'react-icons/fa';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const StarFull = styled(FaStar)`
  color: #009e7f;
  font-size: 1rem;
`;

const StarNull = styled(FaStar)`
  color: #939394;
  font-size: 1rem;
`;

const StarHalf = styled(FaStarHalfAlt)`
  color: #009e7f;
  font-size: 1rem;
`;

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    height: '100%',
    borderRadius: '10px',
    boxShadow: 'none',
  },
  media: {
    height: 140,
    marginTop: '10px',
    objectFit: 'contain',
    backgroundSize: 'contain',
  },
});

const starsPattern = (reviews) => {
  const stars = [];
  const [whole, part] = parseFloat(reviews).toString().split('.');

  for (let i = 0; i < whole; i++) {
    stars.push(1);
  }

  if (part) {
    stars.push(0.5);
  }

  for (let i = whole; i < (part ? 4 : 5); i++) {
    stars.push(0);
  }

  return stars;
};

const ProductItem = ({ data }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cartItems);
  const classes = useStyles();
  const history = useHistory();

  useEffect(() => {
    data.reviews = Math.round((Math.random() * 2 + 3).toFixed(1) * 2) / 2;
  }, [data]);

  const handleAddToCart = () => {
    const inCart = cartItems.find((item) => item.id === data.id);
    if (inCart) {
      dispatch(increase_amount(data.id));
    } else {
      data.amount = 1;
      dispatch(add_item(data));
    }
  };

  const handleSearch = () => {
    history.push('/search?category=' + data.category);
  };

  return (
    <Card className={classes.root}>
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
            <Chip variant='outlined' color='primary' label={data.category} />

            <Box
              mt={3}
              display='flex'
              justifyContent='space-between'
              alignItems='center'
            >
              <Box display='flex' alignItems='center'>
                {starsPattern(data.reviews)?.map((star, i) => {
                  if (star === 1) return <StarFull key={i} />;
                  else if (star === 0.5) return <StarHalf key={i} />;
                  else return <StarNull key={i} />;
                })}{' '}
                <Typography
                  style={{ marginLeft: '0.5em' }}
                  variant='h6'
                  color='initial'
                >
                  ({data.reviews})
                </Typography>
              </Box>
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
      <CardActions>
        <ButtonGroup
          disableElevation
          fullWidth
          size='small'
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
    </Card>
  );
};

export default ProductItem;
