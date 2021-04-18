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
import WorkshopService from '../../services/workshopService';
import ErrorBox from '../dialog/errorBox';
import PlaceService from '../../services/placeService';

const validate = values => {
  const errors = {};
  if (!values.studioName) {
    errors.place = 'Обязательно';
  }
  if (!values.address) {
    errors.date = 'Обязательно';
  }
  
  return errors;
};

export default function PlaceForm(props) {
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const onSubmit = values => {
    
    if(!props.editing){
        PlaceService.createPlace(values).then(response => props.showFormCallback(props.showForm, response));
    }
    else{
        PlaceService.updatePlace(values).then(response => props.showFormCallback(props.showForm, response, props.editing))
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
                    fullWidth
                    required
                    name="studioName"
                    component={TextField}
                    type="text"
                    label="Студия"
                  />
                </Grid>
                <Grid item xs={6}>
                  <Field
                    fullWidth
                    name="address"
                    component={TextField}
                    label="Адрес"
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

