import {React, useEffect, useState} from 'react';
import MUIDataTable from "mui-datatables";
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import WorkshopForm from '../forms/workshopForm';
import WorkshopService from '../../services/workshopService';
import { categories, styles } from '../../constants/commonData';
import timeHelper from '../../helpers/dateHelper';

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
                    <Button onClick={() => {
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
        { name: 'place', label: 'Место' },
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

const showFormCallback = (show, addedWorkshop, editing, isError) => {
    setShowForm(!show);
    
    if(!editing)
        setWorkshops([...workshops, {
            place: addedWorkshop.place,
            date: timeHelper.normalizeDate(addedWorkshop.date),
            time: timeHelper.normalizeTime(addedWorkshop.time),
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
            date: timeHelper.normalizeDate(addedWorkshop.date),
            time: timeHelper.normalizeTime(addedWorkshop.time),
            choreographer: addedWorkshop.choreographerId,
            style: styles[addedWorkshop.style],
            category: categories[addedWorkshop.category],
            price: addedWorkshop.price,
            minAge: addedWorkshop.minAge,
            maxUsers: addedWorkshop.maxUsers,
            id: addedWorkshop.id
        });

        const secArr = workshops.slice(index + 1, workshops.length);

        const res = newArr.concat(secArr);
        setWorkshops(res);
        setEditing(!editing);
    }
}

    useEffect(() => {
          WorkshopService.getAllWorkshops().then(workshops => {
            setWorkshops([...workshops.map(x => {
                //console.log('X', x)
                x.style = styles[x.style];
                x.category = categories[x.category];
                x.date = timeHelper.normalizeDate(x.date);
                x.time = timeHelper.normalizeTime(x.time);
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

            <WorkshopForm
                categories={categories}
                styles={styles}
                showForm={showForm}
                diting={editing}
                initialData={editing ? currentWorkshop : {}}
                showFormCallback={showFormCallback}
            />
            
        </>
    );
}