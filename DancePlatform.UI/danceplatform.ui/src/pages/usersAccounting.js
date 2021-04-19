import React from 'react';
import WorkshopTable from '../components/dataTable/workshopTable';
import storageHelper from '../helpers/storageHelper';


export default function UsersAccounting({match}){
    const {workshopId} = match.params;
    const isAdmin = storageHelper.isAdmin();
    return(
        <>
            <WorkshopTable fromWorkshops={false} isAdmin={isAdmin} workshopId={workshopId} />
        </>
    )
}