import {React, useEffect, useState} from 'react';
import { Redirect } from 'react-router-dom';
import storageHelper from '../helpers/storageHelper';
import WorkshopTable from '../components/dataTable/workshopTable';
import WorkshopService from '../services/workshopService';

export default function Main(){
    const [workshopData, setWorkshopData] = useState([]);

    useEffect(() => {
        if(workshopData.length === 0)
        WorkshopService.getAllWorkshops().then(x => {
            setWorkshopData(x);
        });
    })

    return(
        <>
            {storageHelper.isAuthenticated() ? 
                
                <WorkshopTable isAdmin={storageHelper.isAdmin()} data={workshopData}/>
            
            :
                <Redirect to='/login' />
            }
        </>
    );
}