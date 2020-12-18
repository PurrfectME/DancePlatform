
const isAuthenticated = () => {
    const token = localStorage.getItem('token');
    let isAuthenticated = false;
    if(token)
      isAuthenticated = true;

    return isAuthenticated;
}

// const setAuthToFalse = () => {
//     return !isAuthenticated();
// }

const isAdmin = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    let isAdmin = false;
    if(user && user.roles[0] === 'Admin')
    isAdmin = true;

    return isAdmin;
}

const getCurrentUserId = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if(user)
        return user.id;    
}

const storageHelper = {
    isAuthenticated,
    isAdmin,
    getCurrentUserId,
}

export default storageHelper;