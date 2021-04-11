import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Form, Field } from 'react-final-form';
import { TextField, Checkbox, Radio, Select } from 'final-form-material-ui';
import {
  Typography,
  Paper,
  Link,
  Grid,
  Button,
  CssBaseline,
  RadioGroup,
  FormLabel,
  MenuItem,
  FormGroup,
  FormControl,
  FormControlLabel,
} from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  TimePicker,
  DatePicker,
} from '@material-ui/pickers';
import WorkshopService from '../../services/workshopService';
import {styles} from '../../constants/commonData'

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
      clearLabel="Очистить"
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
    errors.place = 'Required';
  }
  if (!values.date) {
    errors.date = 'Required';
  }
  if (!values.style) {
    errors.style = 'Required';
  }
  if (!values.category) {
    errors.category = 'Required';
  }
  if (!values.choreographerId) {
    errors.choreographerId = 'Required';
  }
  if (!values.price) {
    errors.price = 'Required';
  }
  if (!values.minAge) {
    errors.minAge = 'Required';
  }
  if (!values.maxUsers) {
    errors.maxUsers = 'Required';
  }
  return errors;
};

export default function WorkshopForm(props) {

  const onSubmit = values => {
    values.date = new Date(values.date);
    if(!props.editing){
        WorkshopService.createWorkshop(values).then(response => props.showFormCallback(props.showForm, response.data));
    }
    else{
        WorkshopService.editWorkshop(values).then(response => props.showFormCallback(props.showForm, response.data, props.editing))
    }
    
  };

  let stylesData = [];
  let categoriesData = [];

//   if(props.initialData){
    
//     for (const [key, value] of Object.entries(props.styles)) {
//         if(value !== props.styles[props.initialData.style])
//         stylesData.push(
//           <MenuItem value={key}>{value}</MenuItem>
//         )
//     }
//     categoriesData = props.categories[props.initialData.category];
//   }
//   else{
    for (const [key, value] of Object.entries(props.styles)) {
        let i = 0;
        stylesData.push(
            <MenuItem key={i++} value={key}>{value}</MenuItem>
        )
    }
    for (const [key, value] of Object.entries(props.categories)) {
        let i = 0;
        categoriesData.push(
          <MenuItem key={i++} value={key}>{value}</MenuItem>
        )
    }
//    }

  const choreographersData = [
        <MenuItem value={1}>{'TOHA'}</MenuItem>,
        <MenuItem value={2}>{'value1'}</MenuItem>,
        <MenuItem value={3}>{'value1'}</MenuItem>
    ];


  return(
    props.showForm ?
    <div style={{ padding: 16, margin: 'auto', maxWidth: 700 }}>
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
                    name="place"
                    component={TextField}
                    type="text"
                    label="Место"
                  />
                </Grid>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <Grid item xs={6}>
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
                <Grid item xs={12}>
                  <Field
                    fullWidth
                    name="style"
                    component={Select}
                    label="Выберите стиль"
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
                    label="Выберите категорию"
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
                  {props.editing ? <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    disabled={submitting}
                  >
                    Сохранить
                  </Button>
                  :
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    disabled={submitting}
                  >
                    Добавить
                  </Button>}
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

