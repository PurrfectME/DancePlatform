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
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  TimePicker,
  DatePicker,
} from '@material-ui/pickers';
import WorkshopService from '../../services/workshopService';
import ruLocale from "date-fns/locale/ru";
import DialogBox from '../dialog/dialog';
import moment from 'moment';
import timeHelper from '../../helpers/dateHelper';

function DatePickerWrapper(props) {
  const {
    input: { name, onChange, value, ...restInput },
    meta,
    ...rest
  } = props;
  const showError =
    ((meta.submitError && !meta.dirtySinceLastSubmit) || meta.error) &&
    meta.touched;

  return (
    <DatePicker
      {...rest}
      name={name}
      helperText={showError ? meta.error || meta.submitError : undefined}
      error={showError}
      inputProps={restInput}
      onChange={onChange}
      value={value === '' ? null : value}
      placeholder="dd/MM/yyyy"
      cancelLabel="Закрыть"
      mask="__/__/____"
      disablePast={true}
    />
  );
}

function TimePickerWrapper(props) {
  const {
    input: { name, onChange, value, ...restInput },
    meta,
    ...rest
  } = props;
  const showError =
    ((meta.submitError && !meta.dirtySinceLastSubmit) || meta.error) &&
    meta.touched;

  return (
    <TimePicker
      {...rest}
      name={name}
      helperText={showError ? meta.error || meta.submitError : undefined}
      error={showError}
      inputProps={restInput}
      onChange={onChange}
      value={value === '' ? null : value}
    />
  );
}



const validate = values => {
  const errors = {};
  if (!values.place) {
    errors.place = 'Обязательно';
  }
  if (!values.date) {
    errors.date = 'Обязательно';
  }
  if (!values.time) {
    errors.time = 'Обязательно';
  }
  if (!values.style) {
    errors.style = 'Обязательно';
  }
  if (!values.category) {
    errors.category = 'Обязательно';
  }
  if (!values.choreographerId) {
    errors.choreographerId = 'Обязательно';
  }
  if (!values.price) {
    errors.price = 'Обязательно';
  }
  if (!values.minAge) {
    errors.minAge = 'Обязательно';
  }
  if (!values.maxUsers) {
    errors.maxUsers = 'Обязательно';
  }
  return errors;
};

export default function WorkshopForm(props) {
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const onSubmit = values => {
    
    var today = moment();
    
    if(!props.editing){
        if(timeHelper.normalizeDate(today) > timeHelper.normalizeDate(values.date)){
          setError(true);
          setErrorMessage('Некорректная дата');
          return;
        }
        else if(timeHelper.normalizeDate(today) === timeHelper.normalizeDate(values.date) &&
                timeHelper.normalizeTime(today) > timeHelper.normalizeTime(values.time)){
          setError(true);
          setErrorMessage('Некорректное время');
          return;
        }
        
        values.placeId = values.place;
        WorkshopService.createWorkshop(values).then(response => props.showFormCallback(props.showForm, response.data));
    }
    else{
        WorkshopService.editWorkshop(values).then(response => props.showFormCallback(props.showForm, response.data, props.editing))
    }
  };

  let stylesData = [];
  let categoriesData = [];
  let placesData = [];
  let i = 0;

  for (const [key, value] of Object.entries(props.styles)) {
      stylesData.push(
          <MenuItem key={i++} value={key}>{value}</MenuItem>
      )
  }
  for (const [key, value] of Object.entries(props.categories)) {
      categoriesData.push(
        <MenuItem key={i++} value={key}>{value}</MenuItem>
      )
  }
  for (const x of props.places) {
    placesData.push(
      <MenuItem key={x.id} value={x.id}>{x.studioName}</MenuItem>
    )
}

  const choreographersData = [
        <MenuItem value={1}>{'TOHA'}</MenuItem>,
        <MenuItem value={2}>{'value1'}</MenuItem>,
        <MenuItem value={3}>{'value1'}</MenuItem>
  ];

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
                <Grid item xs={4}>
                  <Field
                    required
                    name="placeId"
                    component={Select}
                    label="Место *"
                    formControlProps={{ fullWidth: true}}
                  >
                    {placesData}
                  </Field>
                </Grid>
                <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ruLocale}>
                  <Grid item xs={4}>
                    <Field
                    fullWidth
                    required
                    name="date"
                    component={DatePickerWrapper}
                    type="text"
                    label="Дата"
                  />
                  </Grid>
                </MuiPickersUtilsProvider>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <Grid item xs={4}>
                    <Field
                      fullWidth
                      required
                      name="time"
                      component={TimePickerWrapper}
                      type="text"
                      label="Время"
                    />
                  </Grid>
                </MuiPickersUtilsProvider>
                <Grid item xs={12}>
                  <Field
                    fullWidth
                    name="style"
                    component={Select}
                    label="Выберите стиль *"
                    formControlProps={{ fullWidth: true}}
                  >
                    {stylesData}
                  </Field>
                </Grid>
                <Grid item xs={12}>
                  <Field
                    fullWidth
                    name="category"
                    component={Select}
                    label="Выберите категорию *"
                    formControlProps={{ fullWidth: true }}
                  >
                    {categoriesData}
                  </Field>
                </Grid>
                <Grid item xs={12}>
                  <Field
                    fullWidth
                    name="choreographerId"
                    component={Select}
                    label="Выберите хореографа"
                    formControlProps={{ fullWidth: true }}
                  >
                    {choreographersData}
                  </Field>
                </Grid>
                <Grid item xs={6}>
                  <Field
                    fullWidth
                    required
                    name="price"
                    component={TextField}
                    type="number"
                    label="Цена"
                  />
                </Grid>
                <Grid item xs={6}>
                  <Field
                    fullWidth
                    required
                    name="maxUsers"
                    component={TextField}
                    type="number"
                    label="Максимальное количество участников"
                  />
                </Grid>
                <Grid item xs={6}>
                  <Field
                    fullWidth
                    required
                    name="minAge"
                    component={TextField}
                    type="number"
                    label="Минимальный возраст"
                    onChange={()=> {}}
                  />
                </Grid>
                {/* <Grid item style={{ marginTop: 16 }}>
                  <Button
                    type="button"
                    variant="contained"
                    onClick={reset}
                    disabled={submitting || pristine}
                  >
                    Reset
                  </Button>
                </Grid> */}
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

