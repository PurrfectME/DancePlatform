import {React, useEffect, useState} from 'react';
import WorkshopService from '../services/workshopService';
import { makeStyles } from '@material-ui/core/styles';
import {Paper, Grid, Typography, Button} from '@material-ui/core';
import _ from 'lodash';
import YMap from '../components/maps/YMap';
import RegistrationService from '../services/registrationService';
import {categories, styles} from '../constants/commonData';
import ImageUploading from 'react-images-uploading';
import '../styles/profileInfo.css'
import PayPalComponent from '../components/paypal/paypalComponent';
import storageHelper from '../helpers/storageHelper';
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      flexWrap: 'wrap',
      maxWidth: 1198,
      margin: 'auto',
    },
    paper: {
        margin: '58px 10px 0px 10px',
      minWidth: 300,
    },
    grid: {
        flexDirection: 'column',
    },
    gridInfo: {
        flexDirection: 'inherit',
        alignItems: 'center',
        alignContent: 'center',
        marginTop: 15,
        marginBottom: 10,
    },
    img: {
      margin: 'auto',
    },
    registerButton: {
        marginBottom: 5,
        marginTop: 5,
    },
}));

export default function WorkshopInfo(){
    let history = useHistory();
    const classes = useStyles();
    const [workshop, setWorkshop] = useState({
        minAge: 0,
        maxUsers: 0,
        choreographer: {
            name: '',
            description: '',
        },
        place: {
            address: '',
        }
    });

    const [isDesired] = useState(new URLSearchParams(window.location.search).get('desired'));

    useEffect(() => {
        var pathname = window.location.pathname.split("/");
        var id = pathname[pathname.length-1];
        WorkshopService.getById(id).then(response => {
            response.photo = `data:image/jpg;base64,${response.photo}`;
            setWorkshop(response);
        });
    }, []);

    const addToDesired = () => {
        const registration = {
            workshopId: workshop.id,
            userId: storageHelper.getCurrentUserId(),
            isDesired: true,
            isPaid: false
          };
        RegistrationService.registerOnWorkshop(registration).then(response => {
            history.push('/');
        })
    }

    console.log(isDesired)

    return(
        <>
            <Paper className={classes.paper}>
                <Grid className={classes.grid} container>
                    
                    <Grid className={classes.img} item>
                        <ImageUploading
                            value={workshop.photo}
                            dataURLKey="photo"
                        >
                            {({
                            }) => (
                            // write your building UI
                            <Grid container>
                            <div className="upload__image-wrapper">
                                <div key={1} className="image-item">
                                    <img src={workshop['photo']} alt="" width="200" height="200" />
                                </div>
                            </div>
                            </Grid>
                            )}
                        </ImageUploading>
                    </Grid>
                    <Grid className={classes.gridInfo} item xs={12} sm container>
                    
                    <Grid item>
                        <Typography variant="subtitle1">{styles[workshop.style]}</Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant="subtitle1">{categories[workshop.category]}</Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant="subtitle1">Минимальный возраст: {workshop.minAge}</Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant="subtitle1">Максимум участников: {workshop.maxUsers}</Typography>
                    </Grid>

                    <Grid item>
                        <Typography variant="subtitle1">Хореограф: {workshop.choreographer.name}</Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant="subtitle1">{workshop.choreographer.description}</Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant="subtitle1">{workshop.place.address}</Typography>
                    </Grid>

                    <Grid xs={12} item >
                        <YMap address={workshop.place.address}/>
                    </Grid>

                    {isDesired == 'false' ?
                        <button style={{width: 500, marginTop: 35}} onClick={addToDesired} className={classes.registerButton} type="button" variant="contained" color="primary">
                            Добавить в желаемое 
                        </button>
                    :
                        <></>
                    }
                        <button style={{width: 500, marginTop: 35}} className={classes.registerButton} type="button" variant="contained" color="primary">
                            <PayPalComponent workshop={workshop}/>
                        </button>
                    </Grid>
                </Grid>
            </Paper>
        </>
    );
}