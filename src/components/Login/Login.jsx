import React from 'react';
import { Box, FormControlLabel, Switch } from '@material-ui/core';
import { Formik, Form, Field } from 'formik';

import styled from 'styled-components';

const Wrapper = styled.div``;

const Login = () => {
  console.log('re-render login');
  return (
    <Wrapper>
      <Formik
        initialValues={{
          email: '',
          password: '',
          rememberMe: false,
        }}
      >
        <Form>
          <Box margin={1}>
            <FormControlLabel
              control={
                <Field component={Switch} type='checkbox' name='rememberMe' />
              }
              label='Remember Me'
            />
          </Box>
        </Form>
      </Formik>
    </Wrapper>
  );
};

export default Login;
