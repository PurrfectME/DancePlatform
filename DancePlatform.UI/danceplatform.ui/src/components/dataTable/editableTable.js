import React, { useState, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import { EditingState } from '@devexpress/dx-react-grid';
import {
  Grid,
  Table,
  TableHeaderRow,
  TableEditRow,
  TableEditColumn,
} from '@devexpress/dx-react-grid-material-ui';
import WorkshopService from '../../services/workshopService';
import normalizeDate from '../../helpers/dateHelper';
import { categories, styles } from '../../constants/commonData';


const getRowId = row => row.id;

export default function EditableTable() {
  const [columns] = useState([
    { name: 'id', title: 'Номер' },
    { name: 'name', title: 'Название' },
    { name: 'date', title: 'Время' },
    { name: 'choreographer', title: 'Хореограф' },
    { name: 'style', title: 'Стиль' },
    { name: 'category', title: 'Уровень' },
    { name: 'price', title: 'Цена, BYN' },
  ]);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    if((rows.length === 0)){
      WorkshopService.getAllWorkshops().then(workshops => {
        setRows([...workshops.map(x => {
            x.style = styles[x.style];
            x.category = categories[x.category];
            x.date = x.date.toString();
            return x;
        })]);
    })}
}, [])

  const commitChanges = ({ added, changed, deleted }) => {
    let changedRows;
    if (added) {
        const startingAddedId = rows.length > 0 ? rows[rows.length - 1].id + 1 : 0;
        changedRows = [
            ...rows,
            ...added.map((row, index) => ({
                id: startingAddedId + index,
                ...row,
            })),
        ];
        WorkshopService.createWorkshop(added[0]).then(x => x);
        }
        if (changed) {
            changedRows = rows.map(row => (changed[row.id] ? { ...row, ...changed[row.id] } : row));
            let id = Object.keys(changed)[0];
            WorkshopService.editWorkshop((changedRows.filter(x => x.id == id))[0]).then(x => x);
        }
        if (deleted) {
            const deletedSet = new Set(deleted);
            changedRows = rows.filter(row => !deletedSet.has(row.id));

            WorkshopService.deleteWorkshop(deleted[0]).then(x => x);
        }
        setRows(changedRows);
  };

  return (
    <Paper>
      <Grid
        rows={rows}
        columns={columns}
        getRowId={getRowId}
      >
        <EditingState
          onCommitChanges={commitChanges}
        />
        <Table />
        <TableHeaderRow />
        <TableEditRow />
        <TableEditColumn
          showAddCommand
          showEditCommand
          showDeleteCommand
        />
      </Grid>
    </Paper>
  );
};