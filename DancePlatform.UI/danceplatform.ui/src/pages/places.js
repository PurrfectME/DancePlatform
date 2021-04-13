import {React, useEffect, useState} from 'react';
import MUIDataTable from "mui-datatables";
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import PlaceForm from '../components/forms/placeForm';
import PlaceService from '../services/placeService';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      display: 'flex',
      justifyContent: 'space-evenly',
      maxWidth: 1198,
      margin: 'auto',
    }
}));

export default function Places(props) {
    const classes = useStyles();

    const [showForm, setShowForm] = useState(false);
    const [places, setPlaces] = useState([]);
    const [selectedRowToEdit, setSelectedRowToEdit] = useState(null);
    const [editing, setEditing] = useState(false);

    const columns = [
        {
            name: " ",
            options: {
                filter: false,
                sort: false,
                customBodyRender: (value, tableMeta, updateValue) => {
                    return (
                        <Button disabled={showForm} onClick={() => 
                        {
                            setShowForm(!showForm);
                            setEditing(true);
                        }} type="button" variant="contained" color="primary" fullWidth={true}>
                            Редактировать
                        </Button>
                    );
                }
                }
        },
        {
            name: " ",
            options: {
              filter: false,
              sort: false,
              customBodyRender: (value, tableMeta, updateValue) => {
                return (
                    <Button onClick={() => {
                        const idToDelete = places[tableMeta.rowIndex].id;

                        PlaceService.deletePlace(idToDelete).then(response => {
                            setPlaces([...places.filter(x => x.id !== idToDelete)])
                        });
                        }} type="button" variant="contained" color="primary">
                        Удалить
                    </Button>
                );
              }
            }
        },
        { name: 'id', label: 'Номер' },
        { name: 'studioName', label: 'Студия' },
        { name: 'address', label: 'Адрес' },
    ];

    const handleRowClick = (rowData, rowMeta) => {
        setSelectedRowToEdit(rowMeta.dataIndex);
    };

    const options = {
        filterType: 'dropdown',
        responsive: 'standard',
        download: false,
        print: false,
        viewColumns: false,
        onRowClick: handleRowClick,
        onDownload: (buildHead, buildBody, columns, data) => {
            return "\uFEFF" + buildHead(columns) + buildBody(data); 
        },
        selectableRows: 'none',
        textLabels: {
            body: {
              noMatch: "Извините, данных нет",
              toolTip: "Сортировка",
              columnHeaderTooltip: column => `Сортировать по ${column.label}`
            },
            toolbar: {
                search: "Поиск",
                viewColumns: "Показать колонки",
                filterTable: "Фильтр таблицы",
            },
            pagination: {
                next: "Следующая страница",
                previous: "Предыдущая страница",
                rowsPerPage: "Строк на странице:",
                displayRows: "из",
            },
            filter: {
                all: "ВСЕ",
                title: "ФИЛЬТРЫ",
                reset: "СБРОСИТЬ",
              },
        }
    };

const showFormCallback = (show, addedPlace, editing) => {
    setShowForm(!show);
    
    if(!editing && addedPlace)
        setPlaces([...places, {
            studioName: addedPlace.studioName,
            address: addedPlace.address,
            id: addedPlace.id
        }]);
    else if(addedPlace){
        var index = places.map(x => x.id).indexOf(addedPlace.id);
        const newArr = places.slice(0, index);
        newArr.push({
            studioName: addedPlace.studioName,
            address: addedPlace.address,
            id: addedPlace.id
        });

        const secArr = places.slice(index + 1, places.length);

        const res = newArr.concat(secArr);
        setPlaces(res);
        setEditing(!editing);
    }
}

    useEffect(() => {
          PlaceService.getAllPlaces().then(places => {
            setPlaces([...places]);
        });
    }, []);

    const currentPlace = {...places[selectedRowToEdit]};
    // currentWorkshop.style = Object.keys(styles).find(key => styles[key] === selectedStyle);
    // currentWorkshop.category = Object.keys(categories).find(key => categories[key] === selectedCategory);

    return(
        <>
        <div className={classes.root}>
            <Button disabled={showForm} onClick={() => {
                setShowForm(true);
                setEditing(false);
            }} type="button" variant="contained" color="primary">
                Создать
            </Button>
        </div>
        
            <MUIDataTable
                title={"Студии"}
                data={places}
                columns={columns}
                options={options}
            />

            <PlaceForm
                showForm={showForm}
                editing={editing}
                initialData={editing ? currentPlace : {}}
                showFormCallback={showFormCallback}
            />
            
        </>
    );
}