import {React, useEffect, useState} from 'react';
import MUIDataTable from "mui-datatables";
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import WorkshopForm from '../forms/workshopForm';
import WorkshopService from '../../services/workshopService';
import { categories, styles } from '../../constants/commonData';
import normalizeDate from '../../helpers/dateHelper';

const columns = [
    { name: 'id', label: 'Номер' },
    { name: 'place', label: 'Место' },
    { name: 'date', label: 'Время' },
    { name: 'choreographer', label: 'Хореограф' },
    { name: 'style', label: 'Стиль' },
    { name: 'category', label: 'Уровень' },
    { name: 'price', label: 'Цена, BYN' },
  ];

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      display: 'flex',
      justifyContent: 'space-evenly',
      maxWidth: 1198,
      margin: 'auto',
    }
}));

export default function AdminTable(props) {
    const classes = useStyles();

    const [showForm, setShowForm] = useState(false);
    const [workshops, setWorkshops] = useState([]);

    const showFormCallback = (show) => {
        setShowForm(!show);
    }

    useEffect(() => {
          WorkshopService.getAllWorkshops().then(workshops => {
            setWorkshops([...workshops.map(x => {
                x.style = styles[x.style];
                x.category = categories[x.category];
                x.date = normalizeDate(x.date);
                return x;
            })]);
        })
    }, [])

    return(
        <>
        <div className={classes.root}>
            <Button onClick={() => setShowForm(!showForm)} type="button" variant="contained" color="primary">
                Создать
            </Button>
            <Button onClick={() => alert('idi nahyu')} type="button" variant="contained" color="primary">
                Удалить
            </Button>
            <Button onClick={() => alert('idi nahyu')} type="button" variant="contained" color="primary">
                Редактировать
            </Button>
        </div>
        
            <MUIDataTable
                title={"WORKSHOPS"}
                data={workshops}
                columns={columns}
                options={{}}
            />


            <WorkshopForm categories={categories} styles={styles} showForm={showForm} showFormCallback={showFormCallback}/>
        </>
    );
}