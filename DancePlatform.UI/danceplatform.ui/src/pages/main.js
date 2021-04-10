import {React} from 'react';
import { Redirect } from 'react-router-dom';
import storageHelper from '../helpers/storageHelper';
import EditableTable from '../components/dataTable/editableTable';
import WorkshopContainer from '../components/workshops/workshopContainer';

export default function Main(){
    const isAdmin = storageHelper.isAdmin();
    return(
        <>
            {storageHelper.isAuthenticated() ? 
                
                isAdmin ? <EditableTable /> :
                // <WorkshopTable fromWorkshops={false} isAdmin={isAdmin} />
                <WorkshopContainer />
            :
                <Redirect to='/login' />
            }
        </>
    );
}