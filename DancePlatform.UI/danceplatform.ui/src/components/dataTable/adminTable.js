import {React, useEffect, useState} from 'react';
import MUIDataTable from "mui-datatables";
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import WorkshopForm from '../forms/workshopForm';

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
    return(
        <>
        <div className={classes.root}>
            <Button onClick={() => alert('idi nahyu')} type="button" variant="contained" color="primary">
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
                data={[]}
                columns={columns}
                options={{}}
            />
        </>
    );
}