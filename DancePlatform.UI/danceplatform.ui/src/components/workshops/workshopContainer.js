import {React, useEffect, useState} from 'react';
import WorkshopBox from '../workshops/workshopBox';
import sex from '../../images/sex.PNG';
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

export default function WorkshopContainer() {
    const classes = useStyles();
    const [workshops, setWorkshops] = useState([]);

    useEffect(() => {
        WorkshopService.getAvailableWorkshopsForUser(storageHelper.getCurrentUserId()).then(data => {
            setWorkshops(data);
        })
    }, []);

    return(
        <div className={classes.root}>
            {workshops.map(workshop => 
                <WorkshopBox workshop={workshop} classes={classes}/>)
            }
        </div>
    );
}