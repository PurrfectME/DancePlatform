import {React, useEffect, useState} from 'react';
import WorkshopService from '../services/workshopService';
import { makeStyles } from '@material-ui/core/styles';
import {Paper, Grid, Typography, Button} from '@material-ui/core';
import sex from '../images/sex.PNG';
import SearchBox from "react-google-maps/lib/components/places/SearchBox";
import {withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker} from 'react-google-maps';
import { compose, withProps, lifecycle, withState, withHandlers, } from 'recompose';
import _ from 'lodash';
import YMap from '../components/maps/YMap';
import RegistrationService from '../services/registrationService';
import storageHelper from '../helpers/storageHelper';
import {categories, styles} from '../constants/commonData';

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
      display: 'block',
      minWidth: 550,
      minHeight: 550,
      backgroundImage: `url(${sex})`,
      backgroundPosition: 'center', 
      backgroundSize: 'cover', 
      backgroundRepeat: 'no-repeat',
      borderTopRightRadius: 4,
      borderTopLeftRadius: 4,
    },
    registerButton: {
        marginBottom: 5,
        marginTop: 5,
    },
}));




export default function WorkshopInfo(props){
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

    useEffect(() => {
        var pathname = window.location.pathname.split("/");
        var id = pathname[pathname.length-1];
        WorkshopService.getById(id).then(response => {
            setWorkshop(response);   
        });
    }, []);

    const register = () => {
        
        RegistrationService.registerOnWorkshop({workshopId: workshop.id, userId: storageHelper.getCurrentUserId()}).then(response => {
            console.log('RTESPONSE', response);
        })
    }

    return(
        <>
            <Paper className={classes.paper}>
                <Grid className={classes.grid} container>
                    
                    <Grid className={classes.img} item />
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

                    <Grid item>
                        <Button href='/' onClick={register} className={classes.registerButton} type="button" variant="contained" color="primary">
                            Зарегистрироваться
                        </Button>
                    </Grid>

                    </Grid>
                </Grid>
            </Paper>
        </>
    );
}