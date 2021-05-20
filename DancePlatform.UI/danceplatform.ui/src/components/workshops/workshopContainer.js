import {React, useEffect, useState} from 'react';
import WorkshopBox from '../workshops/workshopBox';
import { makeStyles } from '@material-ui/core/styles';
import WorkshopService from '../../services/workshopService';
import storageHelper from '../../helpers/storageHelper';

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
      minWidth: 300,
      minHeight: 300,
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

export default function WorkshopContainer(props) {
    const classes = useStyles();
    const [workshops, setWorkshops] = useState([]);

    useEffect(() => {
        const userId = storageHelper.getCurrentUserId();
        if(!props.isDesired){
            WorkshopService.getAvailableWorkshopsForUser(userId).then(response => {
                setWorkshops([...response.map(item => {
                    item.photo = `data:image/jpg;base64,${item.photo}`;
    
                    return item;
                })]);
            });
        }
        else{
            WorkshopService.getDesiredWorkshops(userId).then(response => {
                setWorkshops([...response.map(item => {
                    item.photo = `data:image/jpg;base64,${item.photo}`;
    
                    return item;
                })]);
            });
        }
        
    }, []);

    return(
        <div className={classes.root}>
            {workshops.length === 0 ? <h1>НЕТ ДОСТУПНЫХ МАСТЕР-КЛАССОВ</h1> : workshops.map(workshop => 
                <WorkshopBox workshop={workshop} classes={classes} isDesired={props.isDesired}/>)
            }
        </div>
    );
}