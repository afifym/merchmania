import Navbar from './components/Navbar/Navbar';
import ProductsList from './components/ProductsList/ProductsList';
import CartList from './components/CartList/CartList';
import ProductDetails from './components/ProductDetails/ProductDetails';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import Header from './components/Header/Header';
import SearchResults from './components/SearchResults/SearchResults';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#009E7F',
    },
    secondary: {
      main: '#3A3A3C',
    },
  },
  shape: {},
});

function App() {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <Navbar />
        <Switch>
          <Route
            exact
            path='/'
            render={() => (
              <>
                <Header />
                <ProductsList />
              </>
            )}
          />
          <Route path='/login' component={Login} />
          <Route path='/signup' component={Signup} />
          <Route path='/cart' component={CartList} />
          <Route path='/products' component={ProductsList} />
          <Route path='/product-details/:id' component={ProductDetails} />
          <Route path='/search' component={SearchResults} />
        </Switch>
        {/* </Container> */}
        {/* </Box> */}
      </ThemeProvider>
    </Router>
  );
}

export default App;
