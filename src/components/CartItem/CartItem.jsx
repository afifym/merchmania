import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { Button, ButtonGroup } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { useDispatch } from 'react-redux';
import {
  increase_amount,
  decrease_amount,
  remove_item_entirely,
} from '../../store/actions';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

const CartItem = ({ data }) => {
  const dispatch = useDispatch();

  const classes = useStyles();

  const handleIncreaseAmount = () => {
    dispatch(increase_amount(data.id));
  };
  const handleDecreaseAmount = () => {
    data.amount === 1
      ? dispatch(remove_item_entirely(data.id))
      : dispatch(decrease_amount(data.id));
  };

  const handleRemove = () => {
    dispatch(remove_item_entirely(parseInt(data.id)));
  };

  return (
    <Card className={classes.root}>
      <CardActionArea disableElevation>
        <CardMedia
          className={classes.media}
          image={data.image}
          title={data.title}
        />
        <CardContent>
          <Typography noWrap gutterBottom variant='h5' component='h2'>
            {data.title}
          </Typography>
          <Typography gutterBottom variant='h6' component='p'>
            Quantity: {data.amount}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <ButtonGroup
          disableElevation
          fullWidth
          color='primary'
          variant='contained'
          mt='auto'
        >
          <Button onClick={handleDecreaseAmount}>-</Button>
          <Button onClick={handleIncreaseAmount}>+</Button>
          <Button onClick={handleRemove}>remove</Button>
        </ButtonGroup>
      </CardActions>
    </Card>
  );
};

export default CartItem;
