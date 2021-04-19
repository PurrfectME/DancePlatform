import {React, useEffect, useState} from 'react';
import {
    Paper,
    Grid,
    Button,
    CssBaseline,
    MenuItem,
    TextField,
    makeStyles,
    Typography
  } from '@material-ui/core';
import ImageUploading from 'react-images-uploading';
import '../styles/profileInfo.css'
import defaultUpload from '../images/defaultUpload.png';
import ProfileService from '../services/profileService';
import storageHelper from '../helpers/storageHelper';
import timeHelper from '../helpers/dateHelper';
import ProfileForm from '../components/forms/profileForm';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      display: 'flex',
      justifyContent: 'start',
      maxWidth: 1198,
      margin: 'auto',
      
    },
    grid: {
        flexDirection: 'row',
        padding: 55,
    },
    generalInfo: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: 30,
        width: 445,
        justifyContent: 'space-between'
    },
    img: {
        display: 'block',
        marginRight: 15,
        minWidth: 300,
        minHeight: 300,
        backgroundPosition: 'center', 
        backgroundSize: 'cover', 
        backgroundRepeat: 'no-repeat',
        borderTopRightRadius: 4,
        borderTopLeftRadius: 4,
    },
    userName: {
        fontSize: 30,
        fontWeight: 'bold',
    },
    fullName: {
        fontSize: 15,
    },
    dob: {
    },
    personalInfoTab: {
        display: 'inline-block'
    },
    imageButtons: {
        display: 'flex',
        justifyContent: 'space-evenly'
    }
}));

export default function ProfileInfo(){
    const classes = useStyles();
    const [images, setImages] = useState([]);
    const [defaultImg, setDefaultImg] = useState([]);
    const [user, setUser] = useState(storageHelper.getCurrentUser());
    const [editing, setEditing] = useState(false);
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        ProfileService.getImage().then(response => {
            const xhr = new XMLHttpRequest();       
            xhr.open("GET", defaultUpload); 
            xhr.responseType = "blob";
            xhr.onload = (e) => {
                const reader = new FileReader();
                reader.onload = (event) => {
                const res = event.target.result;
                setDefaultImg([{base64Img: res}]);
                }

                const file = xhr.response;
                reader.readAsDataURL(file)
            };
            xhr.send();
            if(response){
                setImages([{base64Img: `data:image/jpg;base64,${response}`}]);
                return;
            }
        })
    }, [])

    const onChange = (imageList, addUpdateIndex) => {
        // data for submit
        if(imageList.length){
            ProfileService.uploadImage(imageList[0]).then(x => {
                setImages(imageList);
            });
            return;
        }

        ProfileService.deleteImage().then(x => {
            setImages([]);
        });
    };

    const editHandle = () => {
        setEditing(true);
    }

    const updateHandle = () => {
        setEditing(false);
    }

    const showFormCallback = (show, user, editing) => {
        setEditing(false);
        setShowForm(false);

        setUser(user);
    }

    return(
        <>
            <Paper className={classes.paper}>
                <Grid className={classes.grid} container>
                <Grid className={classes.img} item>
                    <ImageUploading
                        value={images}
                        onChange={onChange}
                        dataURLKey="base64Img"
                    >
                        {({
                        imageList,
                        onImageUpload,
                        onImageRemove,
                        isDragging,
                        dragProps,
                        }) => (
                        // write your building UI
                        <Grid container>
                        <div className="upload__image-wrapper">
                            {images.length !== 0 ? <></> :
                                defaultImg.length === 0 ? <></> :
                                <img src={defaultImg[0].base64Img} alt="" width="200" height="200"/>
                            }
                            {imageList.map((image, index) => (
                            <div key={index} className="image-item">
                                <img src={image['base64Img']} alt="" width="200" height="200" />
                            </div>
                            ))}
                            <div className={classes.imageButtons}>
                                <Button
                                type="button" variant="contained" color="primary"
                                style={isDragging ? { color: 'red' } : undefined}
                                onClick={onImageUpload}
                                {...dragProps}
                                >
                                    Загрузить
                                </Button>
                                <Button type="button" variant="contained" color="primary" onClick={onImageRemove}>Удалить</Button>
                            </div>
                        </div>
                        </Grid>
                        )}
                    </ImageUploading>
                </Grid>
                <Grid item>
                    {editing ? 
                    <ProfileForm
                        showForm={true}
                        editing={editing}
                        initialData={editing ? user : {}}
                        showFormCallback={showFormCallback}
                    />
                    :
                    <>
                        <Typography className={classes.userName}>
                            Логин: {user.userName}
                        </Typography>
                        <Typography className={classes.fullName}>
                            Имя: {user.name}
                        </Typography>
                        <Typography className={classes.fullName}>
                            Фамилия: {user.surname}
                        </Typography>
                        <Typography className={classes.dob}>
                            Дата рождения: {timeHelper.normalizeDate(user.dateOfBirth)}
                        </Typography>
                        <Typography className={classes.dob}>
                            Телефон: {user.phoneNumber}
                        </Typography>
                        <Button onClick={editHandle}>Редактировать</Button>

                    </>
                    }
                </Grid>
                </Grid>
            </Paper>
        </>
    );
};