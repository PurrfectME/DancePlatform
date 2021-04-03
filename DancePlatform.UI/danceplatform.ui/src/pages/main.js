import {React} from 'react';
import { Redirect } from 'react-router-dom';
import { makeStyles, rgbToHex } from '@material-ui/core/styles';
import storageHelper from '../helpers/storageHelper';
import Grid from '@material-ui/core/Grid';
import WorkshopTable from '../components/dataTable/workshopTable';
import EditableTable from '../components/dataTable/editableTable';
import WorkshopBox from '../components/workshops/workshopBox';
import sex from '../images/sex.PNG';
import zIndex from '@material-ui/core/styles/zIndex';

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
        alignContent: 'center'
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
}));

export default function Main(){
    const classes = useStyles();

    const isAdmin = storageHelper.isAdmin();
    return(
        <>
            {storageHelper.isAuthenticated() ? 
                
                isAdmin ? <EditableTable /> :
                // <WorkshopTable fromWorkshops={false} isAdmin={isAdmin} />
                <div className={classes.root}>
                    <WorkshopBox classes={classes}/>
                    <WorkshopBox classes={classes}/>
                    <WorkshopBox classes={classes}/>
                    <WorkshopBox classes={classes}/>
                    <WorkshopBox classes={classes}/>
                </div>
            :
                <Redirect to='/login' />
            }
        </>
    );
}