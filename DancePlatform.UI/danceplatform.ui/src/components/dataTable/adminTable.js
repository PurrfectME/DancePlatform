import {React, useEffect, useState} from 'react';
import MUIDataTable from "mui-datatables";
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import WorkshopForm from '../forms/workshopForm';
import WorkshopService from '../../services/workshopService';
import { categories, styles } from '../../constants/commonData';
import timeHelper from '../../helpers/dateHelper';
import PlaceService from '../../services/placeService';

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
    const [selectedRowToEdit, setSelectedRowToEdit] = useState(null);
    const [selectedStyle, setSelectedStyle] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [editing, setEditing] = useState(false);
    const [places, setPlaces] = useState([]);
    const [tableData, setTableData] = useState([]);

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
              filter: false,
              sort: false,
              customBodyRender: (value, tableMeta, updateValue) => {
                return (
                    <Button disabled={showForm} onClick={() => {
                        const idToDelete = workshops[tableMeta.rowIndex].id;

                        WorkshopService.deleteWorkshop(idToDelete).then(response => {
                            setWorkshops([...workshops.filter(x => x.id !== idToDelete)])
                        });
                        }} type="button" variant="contained" color="primary">
                        Удалить
                    </Button>
                );
              }
            }
        },
        { name: 'id', label: 'Номер' },
        { name: 'studioName', label: 'Место' },
        { name: 'date', label: 'Дата' },
        { name: 'time', label: 'Время' },
        //
        //
        //СТРААААААННАЯ НАХУЙ АЙДИШКА ХОРЕОГРАФА!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        //
        //
        { name: 'choreographerId', label: 'Хореограф' },
        { name: 'style', label: 'Стиль' },
        { name: 'category', label: 'Уровень' },
        { name: 'price', label: 'Цена, BYN' },
        { name: 'minAge', label: 'Мин. возраст' },
        { name: 'maxUsers', label: 'Макс. людей' },
    ];

    const handleRowClick = (rowData, rowMeta) => {
        setSelectedRowToEdit(rowMeta.dataIndex);
        console.log('ROWDATA', rowData)
        setSelectedStyle(rowData[7]);
        setSelectedCategory(rowData[8]);
    };

    const options = {
        filterType: 'dropdown',
        responsive: 'standard',
        viewColumns: false,
        onRowClick: handleRowClick,
        onDownload: (buildHead, buildBody, columns, data) => {
            return "\uFEFF" + buildHead(columns) + buildBody(data); 
        },
        selectableRows: 'none',
        textLabels: {
            body: {
              noMatch: "Извините, данных нет",
              toolTip: "Sort",
              columnHeaderTooltip: column => `Сортировать по ${column.label}`
            },
            toolbar: {
                search: "Поиск",
                downloadCsv: "Скачать CSV",
                print: "Распечатать",
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

const showFormCallback = (show, workshop, editing) => {
    setShowForm(!show);
    
    if(!editing && workshop)
        setWorkshops([...workshops, {
            studioName: places.find(x => x.id === workshop.placeId).studioName,
            date: timeHelper.normalizeDate(workshop.date),
            time: timeHelper.normalizeTime(workshop.time),
            choreographer: workshop.choreographerId,
            style: styles[workshop.style],
            category: categories[workshop.category],
            price: workshop.price,
            minAge: workshop.minAge,
            maxUsers: workshop.maxUsers,
            id: workshop.id
        }]);
    else if(workshop){
        var index = workshops.map(x => x.id).indexOf(workshop.id);
        const newArr = workshops.slice(0, index);
        console.log('1131231232', workshop)
        const y = places.find(x => x.id === workshop.placeId).studioName;
        newArr.push({
            studioName: y,
            date: timeHelper.normalizeDate(workshop.date),
            time: timeHelper.normalizeTime(workshop.time),
            choreographer: workshop.choreographerId,
            style: styles[workshop.style],
            category: categories[workshop.category],
            price: workshop.price,
            minAge: workshop.minAge,
            maxUsers: workshop.maxUsers,
            id: workshop.id
        });

        const secArr = workshops.slice(index + 1, workshops.length);

        const res = newArr.concat(secArr);
        setWorkshops(res);
        setEditing(!editing);
    }
}

    useEffect(() => {
          WorkshopService.getAllWorkshops().then(response => {
            setWorkshops(response.map(x => {
                x.style = styles[x.style];
                x.category = categories[x.category];
                x.date = timeHelper.normalizeDate(x.date);
                x.time = timeHelper.normalizeTime(x.time);
                x.studioName = x.place.studioName;
                return x;
            }));


            PlaceService.getAllPlaces().then(places => {
                setPlaces(places);
            });
        });
    }, []);

    let currentWorkshop = {...workshops[selectedRowToEdit]};
    currentWorkshop.style = Object.keys(styles).find(key => styles[key] === selectedStyle);
    currentWorkshop.category = Object.keys(categories).find(key => categories[key] === selectedCategory);

    console.log('CURENT',currentWorkshop)

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
                title={"Мастер-классы"}
                data={workshops}
                columns={columns}
                options={options}
            />

            <WorkshopForm
                categories={categories}
                styles={styles}
                showForm={showForm}
                editing={editing}
                initialData={editing ? currentWorkshop : {}}
                showFormCallback={showFormCallback}
                places={places}
            />
            
        </>
    );
}