import React, { useEffect, useState } from 'react';
import { Form, Field } from 'react-final-form';
import { TextField, Select, Input } from 'final-form-material-ui';
import {
  Paper,
  Grid,
  Button,
  CssBaseline,
  MenuItem,
  makeStyles
} from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  TimePicker,
  DatePicker,
} from '@material-ui/pickers';
import WorkshopService from '../../services/workshopService';
import ruLocale from "date-fns/locale/ru";
import ErrorBox from '../dialog/errorBox';
import moment from 'moment';
import timeHelper from '../../helpers/dateHelper';
import ImageUploading from 'react-images-uploading';
import '../../styles/profileInfo.css';
import ProfileService from '../../services/profileService'


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
      ampm={false}
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
  if (!values.studioName) {
    errors.studioName = 'Обязательно';
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
  if (!values.choreographerName) {
    errors.choreographerName = 'Обязательно';
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
  // if (!values.photo) {
  //   errors.photo = 'Обязательно';
  // }
  return errors;
};


const useStyles = makeStyles((theme) => ({
  photoContainer: {
    flexGrow: 1,
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  photoButton: {
    lineHeight: 1.3,
  },
  photoField: {
    marginTop: 16,
  },
  photoFieldContainer: {
    display: 'flex',
    flexDirection: 'column',
    color: 'red'
  }
}));


export default function WorkshopForm(props) {
  const classes = useStyles();
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [imageName, setImageName] = useState('');
  const [images, setImages] = useState([]);

  const onSubmit = values => {
    var today = moment();
    values.photo = images[0].base64Img

    values.placeId = props.places.find(x => x.studioName === values.studioName).id;
    values.choreographerId = props.choreographers.find(x => x.name === values.choreographerName).id;

    if(!props.editing){
        if(timeHelper.normalizeDate(today) > timeHelper.normalizeDate(values.date)){
          setError(true);
          setErrorMessage('Некорректная дата');
          return;
        }
        if(timeHelper.normalizeDate(today) === timeHelper.normalizeDate(values.date) &&
                timeHelper.normalizeTime(today) > timeHelper.normalizeTime(values.time)){
          setError(true);
          setErrorMessage('Некорректное время');
          return;
        }
        
        WorkshopService.createWorkshop(values).then(response => props.showFormCallback(props.showForm, response.data));
    }
    else{
      if(timeHelper.normalizeDate(today) === timeHelper.normalizeDate(values.date) &&
                timeHelper.normalizeTime(today) > timeHelper.normalizeTime(values.time)){
          setError(true);
          setErrorMessage('Некорректное время');
          return;
        }
        WorkshopService.editWorkshop(values).then(response => props.showFormCallback(props.showForm, response.data, props.editing))
    }
  };

  let stylesData = [];
  let categoriesData = [];
  let placesData = [];
  let choreographersData = [];
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
      <MenuItem key={x.id} value={x.studioName}>{x.studioName}</MenuItem>
    )
  }
  for (const x of props.choreographers) {
    choreographersData.push(
      <MenuItem key={x.id} value={x.name}>{x.name}</MenuItem>
    )
  }

  const errorCallback = error => {
    setError(error);
  }

  const onCloseClick = () => {
    props.showFormCallback(props.showForm, null, props.editing)
  }


  const onChange = (imageList, addedIndex) => {
    setImageName(imageList[0].file.name);
    console.log('LIST', imageList[0].base64Img)
    setImages(imageList);
    // data for submit
  //   if(imageList.length){
  //     ProfileService.uploadImage(imageList[0]).then(x => {
  //         setImages(imageList);
  //     });
  //     return;
  // }
  }

  return(
    props.showForm ?
    <div style={{ padding: 16, margin: 'auto', maxWidth: 700 }}>
        {error ? <ErrorBox callback={errorCallback} isOpen={error} message={errorMessage}/> : <></>}
      <CssBaseline />
      <Form
        onSubmit={onSubmit}
        initialValues={props.initialData}
        validate={validate}
        render={({ handleSubmit, reset, submitting, pristine, values }) => (
          <form onSubmit={handleSubmit}>
            <Paper style={{ padding: 16 }}>
              <Grid container alignItems="flex-start" spacing={2}>
                <Grid item xs={4}>
                  <Field
                    name="studioName"
                    component={Select}
                    label="Место *"
                    type="text"
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
                <Grid item xs={6}>
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
                <Grid item xs={3} className={classes.photoFieldContainer}>
                    {/* <div>{imageName}</div> */}
                    <Field
                      name="photo"
                      component={TextField}
                      type="text"
                      disabled={true}
                      label={imageName}
                      className={classes.photoField}
                      defaultValue={imageName}
                      validate={false}
                    ></Field>
                    
                </Grid>
                <Grid item xs={3} className={classes.photoContainer}>
                  <ImageUploading
                    value={images}
                    onChange={onChange}
                    dataURLKey="base64Img"
                  >
                    {({
                    onImageUpload,
                    isDragging,
                    dragProps,
                    }) => (
                    // write your building UI
                      <div className={classes.imageButtons}>
                        <Button
                              type="button" variant="contained" color="primary"
                              style={isDragging ? { color: 'red' } : undefined}
                              onClick={onImageUpload}
                              {...dragProps}
                              >
                          Добавить фото
                        </Button>
                      </div>
                    )}
                  </ImageUploading>
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
                    name="choreographerName"
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
                    name="price"
                    component={TextField}
                    type="number"
                    label="Цена"
                    formControlProps={{ fullWidth: true, required: true }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Field
                    fullWidth
                    name="maxUsers"
                    component={TextField}
                    type="number"
                    label="Максимальное количество участников"
                    formControlProps={{ fullWidth: true, required: true }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Field
                    fullWidth
                    name="minAge"
                    component={TextField}
                    type="number"
                    label="Минимальный возраст"
                    formControlProps={{ fullWidth: true, required: true }}
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

