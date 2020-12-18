import {React, useEffect, useState} from 'react';
import { Redirect } from 'react-router-dom';
import storageHelper from '../helpers/storageHelper';
import WorkshopTable from '../components/dataTable/workshopTable';
import WorkshopService from '../services/workshopService';
import RegistrationService from '../services/registrationService';


export default function Main(){
    const [workshopData, setWorkshopData] = useState([]);
    let regs = [];

    // useEffect(() => {
    //     if((workshopData.length === 0 && storageHelper.isAuthenticated()) || regs.length !== 0)
        

    //     WorkshopService.getAllWorkshops().then(workshops => {
    //         console.log('HERERER');

    //         RegistrationService.getAllRegistrations().then(registrations => {
    //             if(registrations.length === 0){
    //                 regs.push([...registrations]);
    //                 setWorkshopData([...workshops]);
    //             }
    //             else{
    //                 setWorkshopData([...workshops.filter(x => !registrations.some(y => x.id === y.workshopId && y.userId === storageHelper.getCurrentUserId()))]);
    //             }
    //         })
    //     });
    // })

    return(
        <>
            {storageHelper.isAuthenticated() ? 
                
                <WorkshopTable fromWorkshops={false} isAdmin={storageHelper.isAdmin()} />
            
            :
                <Redirect to='/login' />
            }
        </>
    );
}