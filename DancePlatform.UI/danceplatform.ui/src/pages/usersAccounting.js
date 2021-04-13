import React from 'react';
import WorkshopTable from '../components/dataTable/workshopTable';
import storageHelper from '../helpers/storageHelper';


export default function UsersAccounting(){

    const isAdmin = storageHelper.isAdmin();
    return(
        <>
            <WorkshopTable fromWorkshops={false} isAdmin={isAdmin}  />
        </>
    )
}