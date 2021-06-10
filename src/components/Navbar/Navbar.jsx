import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import CartDrawer from '../CartDrawer/CartDrawer';
import { StyledLink } from '../../shared/styles';
import { AiFillShopping } from 'react-icons/ai';

import { IoMdCart } from 'react-icons/io';

import logo from '../../shared/logo.svg';
import { Box } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const Navbar = () => {
  const classes = useStyles();

  return (
    <AppBar
      color='default'
      position='fixed'
      title={<img src='../../../public/logo.svg' alt='merchmania' />}
    >
      <Toolbar>
        <Typography variant='h6' className={classes.title}>
          <StyledLink to='/'>
            <Box display='flex' alignItems='center'>
              <img src={logo} alt='merchmania' />
            </Box>
          </StyledLink>
        </Typography>

        <StyledLink to='/products'>
          <Button color='secondary' startIcon={<AiFillShopping />}>
            Products
          </Button>
        </StyledLink>

        <StyledLink to='/cart'>
          <Box mx={2}>
            <Button color='secondary' startIcon={<IoMdCart />}>
              Cart
            </Button>
          </Box>
        </StyledLink>

        <Box mx={1}>
          <CartDrawer />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
