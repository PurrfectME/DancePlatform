import {React, useEffect, useState} from 'react';
import { Redirect } from 'react-router-dom';
import storageHelper from '../helpers/storageHelper';
import WorkshopTable from '../components/dataTable/workshopTable';
import WorkshopService from '../services/workshopService';
import RegistrationService from '../services/registrationService';


export default function Main(){
    const [workshopData, setWorkshopData] = useState([]);

    useEffect(() => {
        if(workshopData.length === 0)
        WorkshopService.getAllWorkshops().then(workshops => {

            RegistrationService.getAllRegistrations().then(registrations => {
                if(registrations.length === 0){
                    setWorkshopData(workshops);
                }
                else{
                    setWorkshopData([...workshops.filter(x => !registrations.some(y => x.id === y.workshopId))]);
                }
            })
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