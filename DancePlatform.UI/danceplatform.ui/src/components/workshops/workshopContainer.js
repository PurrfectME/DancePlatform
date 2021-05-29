import {React, useEffect, useState} from 'react';
import WorkshopBox from '../workshops/workshopBox';
import { makeStyles } from '@material-ui/core/styles';
import WorkshopService from '../../services/workshopService';
import storageHelper from '../../helpers/storageHelper';
import { categories, styles } from '../../constants/commonData';
import SearchInput, {createFilter} from 'react-search-input';
import '../../styles/profileInfo.css'

const KEYS_TO_FILTERS = ['choreographer.name', 'price', 'style', 'category'];

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      flexWrap: 'wrap',
      maxWidth: 1198,
      margin: 'auto',
      height: 200,
      alignItems: 'center',
      fontSize: 35
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
    const [searchTerm, setSearchTerm] = useState('');

    const removeFromDesiredCallback = (userId) => {
        WorkshopService.getDesiredWorkshops(userId).then(response => {
            setWorkshops([...response.map(item => {
                item.photo = `data:image/jpg;base64,${item.photo}`;

                return item;
            })]);
        })
        .catch(err => {
            if(err.status === 404) {
                setWorkshops([]);
            }
        });
    }

    useEffect(() => {
        const userId = storageHelper.getCurrentUserId();
        const isModerator = storageHelper.isModerator();

        if(isModerator){
            WorkshopService.getWorkshopsForApproval().then(response => {
                setWorkshops([...response.map(item => {
                    item.style = styles[item.style];
                    item.category = categories[item.category];
                    item.photo = `data:image/jpg;base64,${item.photo}`;
    
                    return item;
                })]);
            });
            return;
        }

        if(!props.isDesired){
            WorkshopService.getAvailableWorkshopsForUser(userId).then(response => {
                setWorkshops([...response.map(item => {
                    item.style = styles[item.style];
                    item.category = categories[item.category];
                    item.photo = `data:image/jpg;base64,${item.photo}`;
    
                    return item;
                })]);
            });
        }
        else{
            WorkshopService.getDesiredWorkshops(userId).then(response => {
                setWorkshops([...response.map(item => {
                    item.style = styles[item.style];
                    item.category = categories[item.category];
                    item.photo = `data:image/jpg;base64,${item.photo}`;
    
                    return item;
                })]);
            });
        }
    }, []);

    const searchUpdated = (term) => {
        setSearchTerm(term);
    }

    const filteredWorkshops = workshops.filter(createFilter(searchTerm, KEYS_TO_FILTERS));

    

    return(
        <>
            
            {workshops.length === 0 ? <h1>НЕТ ДОСТУПНЫХ МАСТЕР-КЛАССОВ</h1> : 
            <>
            <SearchInput className="search-input" onChange={searchUpdated} />
            {/* {(() => {
                const inputs = document.getElementsByTagName('input');

                for(var i = 0; i < inputs.length; i++) {
                    if(inputs[i].type.toLowerCase() == 'search') {
                        inputs[i].placeholder = 'Поиск';
                    }
                }
            })} */}
            <div className={classes.root}>

                    <>
                        
                        {filteredWorkshops.map(workshop => {
                            return (
                                <WorkshopBox removeFromDesiredCallback={removeFromDesiredCallback} workshop={workshop} classes={classes} isDesired={props.isDesired}/>
                            )
                        })}
                    </>
                
            </div>
            </>
            }

            

        </>
    );
}