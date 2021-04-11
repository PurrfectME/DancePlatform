import {React, useEffect, useState} from 'react';
import MUIDataTable from "mui-datatables";
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import WorkshopForm from '../forms/workshopForm';
import WorkshopService from '../../services/workshopService';
import { categories, styles } from '../../constants/commonData';
import normalizeDate from '../../helpers/dateHelper';
import DialogBox from '../dialog/dialog';


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
    const [selectedRowToEdit, setSelectedRowToEdit] = useState();
    const [selectedStyle, setSelectedStyle] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [editing, setEditing] = useState(false);

    const columns = [
        {
            name: " ",
            options: {
              customBodyRender: (value, tableMeta, updateValue) => {
                return (
                    <Button disabled={showForm} onClick={() => 
                    {
                        setShowForm(!showForm);
                        setEditing(true);
                    }} type="button" variant="contained" color="primary">
                        Редактировать
                    </Button>
                );
              }
            }
        },
        {
            name: " ",
            options: {
              customBodyRender: (value, tableMeta, updateValue) => {
                return (
                    <Button onClick={() => {
                        setShowForm(!showForm);
                        
                        }} type="button" variant="contained" color="primary">
                        Удалить
                    </Button>
                );
              }
            }
        },
        { name: 'id', label: 'Номер' },
        { name: 'place', label: 'Место' },
        { name: 'date', label: 'Время' },
        { name: 'choreographer', label: 'Хореограф' },
        { name: 'style', label: 'Стиль' },
        { name: 'category', label: 'Уровень' },
        { name: 'price', label: 'Цена, BYN' },
        { name: 'minAge', label: 'Мин. возраст' },
        { name: 'maxUsers', label: 'Макс. людей' },
    ];

    const handleRowClick = (rowData, rowMeta) => {
        setSelectedRowToEdit(rowMeta.dataIndex);
        setSelectedStyle(rowData[6]);
        setSelectedCategory(rowData[7]);
    };

    const options = {
        filterType: 'dropdown',
        responsive: 'standard',
        onRowClick: handleRowClick,
        selectableRows: 'none'
        // expandableRowsHeader: true,
        // expandableRowsOnClick: true,
        // expandableRows: true
    };

    const showFormCallback = (show, addedWorkshop, editing) => {
        setShowForm(!show);
        
        if(!editing)
            setWorkshops([...workshops, {
                place: addedWorkshop.place,
                date: normalizeDate(addedWorkshop.date),
                choreographer: addedWorkshop.choreographerId,
                style: styles[addedWorkshop.style],
                category: categories[addedWorkshop.category],
                price: addedWorkshop.price,
                minAge: addedWorkshop.minAge,
                maxUsers: addedWorkshop.maxUsers,
                id: addedWorkshop.id
            }]);
        else{
            var index = workshops.map(x => x.id).indexOf(addedWorkshop.id);

            const newArr = workshops.slice(0, index);
            newArr.push({
                place: addedWorkshop.place,
                date: normalizeDate(addedWorkshop.date),
                choreographer: addedWorkshop.choreographerId,
                style: styles[addedWorkshop.style],
                category: categories[addedWorkshop.category],
                price: addedWorkshop.price,
                minAge: addedWorkshop.minAge,
                maxUsers: addedWorkshop.maxUsers,
                id: addedWorkshop.id
            });

            const secArr = workshops.slice(index + 1, workshops.length - 1);

            const res = newArr.concat(secArr);
            setWorkshops(res);
            setEditing(!editing);
        }
    }

    useEffect(() => {
          WorkshopService.getAllWorkshops().then(workshops => {
            setWorkshops([...workshops.map(x => {
                x.style = styles[x.style];
                x.category = categories[x.category];
                x.date = normalizeDate(x.date);
                return x;
            })]);
        });
    }, []);

    let currentWorkshop = {...workshops[selectedRowToEdit]};
    currentWorkshop.style = Object.keys(styles).find(key => styles[key] === selectedStyle);
    currentWorkshop.category = Object.keys(categories).find(key => categories[key] === selectedCategory);

    return(
        <>
        <div className={classes.root}>
            <Button onClick={() => {
                setShowForm(!showForm);
                setEditing(false);
            }} type="button" variant="contained" color="primary">
                Создать
            </Button>
        </div>
        
            <MUIDataTable
                title={"Мастер-классы"}
                data={workshops}
                columns={columns}
                options={options}
            />

            {/* <DialogBox isError={true} message={'HEHE'}/> */}


            <WorkshopForm categories={categories} styles={styles} showForm={showForm} editing={editing} initialData={editing ? currentWorkshop : {}} showFormCallback={showFormCallback}/>
        </>
    );
}