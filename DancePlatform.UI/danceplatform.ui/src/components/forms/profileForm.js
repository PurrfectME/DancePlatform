import React, { useEffect, useState } from 'react';
import { Form, Field } from 'react-final-form';
import { TextField, Select } from 'final-form-material-ui';
import {
  Paper,
  Grid,
  Button,
  CssBaseline,
  MenuItem,
  makeStyles
} from '@material-ui/core';
import ErrorBox from '../dialog/errorBox';
import ProfileService from '../../services/profileService';
import storageHelper from '../../helpers/storageHelper';
import timeHelper from '../../helpers/dateHelper';


const useStyles = makeStyles((theme) => ({
  submit: {
    color: 'black',
    backgroundColor: '#B2C8D6',
    "&:hover": {
      backgroundColor: '#F59B69',
    }
},
}));

const validate = values => {
  const errors = {};
  if (!values.dateOfBirth) {
    errors.dateOfBirth = 'Обязательно';
  }
  if (!values.surname) {
    errors.surname = 'Обязательно';
  }
  if (!values.name) {
    errors.name = 'Обязательно';
  }
  if (!values.phoneNumber) {
    errors.phoneNumber = 'Обязательно';
  }
  
  return errors;
};

export default function ProfileForm(props) {
  const classes = useStyles();
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const onSubmit = values => {
    values.id = storageHelper.getCurrentUserId();
    ProfileService.updateUser(values).then(response => {
      const user = storageHelper.getCurrentUser();
      user.phoneNumber = values.phoneNumber;
      user.name = values.name;
      user.surname = values.surname;
      user.dateOfBirth = values.dateOfBirth;
      user.photo = values.photo;
      localStorage.setItem('user', JSON.stringify(user));

      props.showFormCallback(props.showForm, response, props.editing);
    })
  };

  const errorCallback = error => {
    setError(error);
  }

  const onCloseClick = () => {
    props.showFormCallback(props.showForm, props.initialData, props.editing)
  }

  props.initialData.dateOfBirth = timeHelper.normalizeDate(props.initialData.dateOfBirth);

  return(
    props.showForm ?
    <div style={{ padding: 16, margin: 'auto', maxWidth: 700 }}>
        {error ? <ErrorBox callback={errorCallback} isError={error} message={errorMessage}/> : <></>}
      <CssBaseline />
      <Form
        onSubmit={onSubmit}
        initialValues={props.initialData}
        validate={validate}
        render={({ handleSubmit, reset, submitting, pristine, values }) => (
          <form onSubmit={handleSubmit} noValidate>
            <Paper style={{ padding: 16 }}>
              <Grid container alignItems="flex-start" spacing={2}>
                <Grid item xs={6}>
                  <Field
                    disabled={props.editing}
                    fullWidth
                    required
                    name="userName"
                    component={TextField}
                    type="text"
                    label="Логин"
                  />
                </Grid>
                <Grid item xs={6}>
                  <Field
                    fullWidth
                    required
                    name="surname"
                    component={TextField}
                    label="Фамилия"
                  />
                </Grid>
                <Grid item xs={6}>
                  <Field
                    fullWidth
                    required
                    name="name"
                    component={TextField}
                    label="Имя"
                  />
                </Grid>
                <Grid item xs={6}>
                  <Field
                    fullWidth
                    required
                    name="phoneNumber"
                    component={TextField}
                    label="Номер телефона"
                  />
                </Grid>
                <Grid item xs={6}>
                  <Field
                    fullWidth
                    required
                    name="dateOfBirth"
                    component={TextField}
                    label="Дата рождения"
                  />
                </Grid>
                <Grid item style={{ marginTop: 16 }}>
                  <>
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    disabled={submitting}
                    className={classes.submit}
                    style={{marginRight: 15}}
                  >
                    Обновить
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    type="button"
                    onClick={onCloseClick}
                    disabled={submitting}
                    className={classes.submit}
                  >
                    Закрыть
                  </Button>
                </>
                </Grid>
              </Grid>
            </Paper>
          </form>
        )}
      />
    </div>
    :
    <></>
    );
}

