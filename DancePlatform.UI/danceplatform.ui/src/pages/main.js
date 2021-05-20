import {React} from 'react';
import { Redirect } from 'react-router-dom';
import storageHelper from '../helpers/storageHelper';
import WorkshopContainer from '../components/workshops/workshopContainer';
import AdminTable from '../components/dataTable/adminTable';

export default function Main(){
    const isAdmin = storageHelper.isAdmin();
    return(
        <>
            {storageHelper.isAuthenticated() ? 
                
                isAdmin ? <AdminTable /> :
                // <WorkshopTable fromWorkshops={false} isAdmin={isAdmin} />
                <WorkshopContainer isDesired={false} />
            :
                <Redirect to='/login' />
            }
        </>
    );
}