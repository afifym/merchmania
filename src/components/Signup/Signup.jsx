import React from 'react';
import { Formik, Form, Field } from 'formik';
import { TextField, Box, MenuItem } from '@material-ui/core';
import styled from 'styled-components';

const Wrapper = styled.div``;

const cities = ['Alexandria', 'Cairo', 'Bani Swaif'];

const Signup = () => {
  return (
    <Wrapper>
      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          email: '',
          password: '',
        }}
        validate={(values) => {}}
      >
        <Form>
          <Box margin={1}>
            <Field
              component={TextField}
              name='email'
              type='email'
              label='Email'
            />
          </Box>
          <Box margin={1}>
            <Field
              component={TextField}
              type='text'
              name='select'
              label='e.g. Cairo'
              select
              variant='standard'
              helperText='Please select a city'
              margin='normal'
              inputLabelProps={{ shrink: true }}
            >
              {cities.map((city, i) => (
                <MenuItem key={i} value={city}>
                  {city}
                </MenuItem>
              ))}
            </Field>
          </Box>
        </Form>
      </Formik>
    </Wrapper>
  );
};

export default Signup;
