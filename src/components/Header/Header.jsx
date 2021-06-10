import React, { useState } from 'react';
import styled from 'styled-components';
import headerBG from '../../shared/header-bg.jpg';
import { AiOutlineSearch } from 'react-icons/ai';
import { useHistory } from 'react-router-dom';

import { Box, Button, TextField, Typography } from '@material-ui/core';

const Wrapper = styled.div`
  height: 100vh;
  background-image: url(${headerBG});
  background-position: center top;
  background-size: 100%;
  object-fit: contain;
  background-repeat: no-repeat;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const Header = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchTerm('');
    history.push('/search?key=' + searchTerm);
  };

  return (
    <Wrapper>
      <Box>
        <Typography style={{ color: 'white' }} variant='h3' component='h1'>
          Shop for whatever you want
        </Typography>
        <Typography style={{ color: 'white' }} component='p'>
          Ready to start buying? we have it all
        </Typography>
        <form onSubmit={handleSubmit}>
          <Box my={4} style={{ position: 'relative' }}>
            <TextField
              id='search'
              label='Search'
              placeholder='e.g. jacket'
              variant='filled'
              color='secondary'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              fullWidth
            />

            <Button
              disableElevation
              color='primary'
              variant='contained'
              startIcon={<AiOutlineSearch />}
              type='submit'
              style={{
                position: 'absolute',
                right: 0,
                width: '30%',
                height: '100%',
              }}
            >
              Search
            </Button>
          </Box>
        </form>
      </Box>
    </Wrapper>
  );
};

export default Header;
