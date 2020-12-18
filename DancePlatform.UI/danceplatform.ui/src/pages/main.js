import {React, useEffect, useState} from 'react';
import { Redirect } from 'react-router-dom';
import storageHelper from '../helpers/storageHelper';
import WorkshopTable from '../components/dataTable/workshopTable';
import WorkshopService from '../services/workshopService';
import RegistrationService from '../services/registrationService';
import EditableTable from '../components/dataTable/editableTable';


export default function Main(){

    const isAdmin = storageHelper.isAdmin();
    return(
        <>
            {storageHelper.isAuthenticated() ? 
                
                isAdmin ? <EditableTable /> :
                <WorkshopTable fromWorkshops={false} isAdmin={isAdmin} />
            
            :
                <Redirect to='/login' />
            }
        </>
    );
}