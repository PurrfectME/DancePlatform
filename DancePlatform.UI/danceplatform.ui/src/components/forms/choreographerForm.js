import React, { useEffect, useState } from 'react';
import { Form, Field } from 'react-final-form';
import { TextField, Select } from 'final-form-material-ui';
import {
  Paper,
  Grid,
  Button,
  CssBaseline,
  MenuItem,
} from '@material-ui/core';
import DialogBox from '../dialog/dialog';
import ChoreographerService from '../../services/choreographerService';

const validate = values => {
  const errors = {};
  if (!values.name) {
    errors.name = 'Обязательно';
  }
  if (!values.style) {
    errors.style = 'Обязательно';
  }
  if (!values.description) {
    errors.description = 'Обязательно';
  }
  if (!values.dateOfBirth) {
    errors.dateOfBirth = 'Обязательно';
  }
  
  return errors;
};

export default function ChoreographerForm(props) {
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const onSubmit = values => {
    
    if(!props.editing){
        ChoreographerService.create(values).then(response => props.showFormCallback(props.showForm, response));
    }
    else{
        ChoreographerService.update(values).then(response => props.showFormCallback(props.showForm, response, props.editing))
    }
  };

  const errorCallback = error => {
    setError(error);
  }

  const onCloseClick = () => {
    props.showFormCallback(props.showForm, null, props.editing)
  }


  return(
    props.showForm ?
    <div style={{ padding: 16, margin: 'auto', maxWidth: 700 }}>
        {error ? <DialogBox callback={errorCallback} isError={error} message={errorMessage}/> : <></>}
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
                    fullWidth
                    required
                    name="name"
                    component={TextField}
                    type="text"
                    label="Имя"
                  />
                </Grid>
                <Grid item xs={6}>
                  <Field
                    fullWidth
                    name="description"
                    component={TextField}
                    label="Описание"
                  />
                </Grid>
                <Grid item xs={6}>
                  <Field
                    fullWidth
                    name="dateOfBirth"
                    component={TextField}
                    label="Возраст"
                  />
                </Grid>
                <Grid item xs={6}>
                  <Field
                    fullWidth
                    name="style"
                    component={TextField}
                    label="Стиль"
                  />
                </Grid>
                <Grid item style={{ marginTop: 16 }}>
                  {props.editing ? 
                  <>
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    disabled={submitting}
                  >
                    Сохранить
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    type="button"
                    onClick={onCloseClick}
                    disabled={submitting}
                  >
                    Закрыть
                  </Button>
                  </>
                  :
                  <>
                    <Button
                      variant="contained"
                      color="primary"
                      type="submit"
                      disabled={submitting}
                    >
                      Добавить
                    </Button>
                    <Button
                    variant="contained"
                    color="primary"
                    type="button"
                    onClick={onCloseClick}
                    disabled={submitting}
                  >
                    Закрыть
                  </Button>
                  </>}
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

