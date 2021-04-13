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
      minWidth: 1000,
      minHeight: 300,
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
    const [workshop, setWorkshop] = useState({});

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
                        <Button href='/' onClick={register} className={classes.registerButton} type="button" variant="contained" color="primary">
                            Зарегистрироваться
                        </Button>
                    </Grid>

                    <Grid item>
                        <YMap />
                    </Grid>


                    </Grid>
                </Grid>
            </Paper>
        </>
    );
}