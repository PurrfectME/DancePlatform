import WorkshopTable from '../components/dataTable/workshopTable';
import { Redirect } from 'react-router-dom';
import storageHelper from '../helpers/storageHelper';

export default function Workshops(){

    return(
        <>
            {storageHelper.isAuthenticated() ? 
                    
                <WorkshopTable fromWorkshops={true} isAdmin={storageHelper.isAdmin()}
                    data={[]}/>
            
            :
                <Redirect to='/login' />
            }
        </>
    )
}