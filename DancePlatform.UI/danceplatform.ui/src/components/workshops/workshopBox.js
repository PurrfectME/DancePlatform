import React from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {styles, categories} from '../../constants/commonData';
import ImageUploading from 'react-images-uploading';
import { makeStyles } from '@material-ui/core/styles';
import '../../styles/profileInfo.css'

const useStyles = makeStyles((theme) => ({
    btn: {
      color: 'black',
      backgroundColor: '#B2C8D6',
      "&:hover": {
        backgroundColor: '#F59B69',
      },
  },
  }));

export default function WorkshopBox(props) {
    const classes = useStyles();
    const {workshop} = props;

    return (
            <Paper className={props.classes.paper}>
                <Grid className={props.classes.grid} container >
                    <Grid className={props.classes.img} item>
                    <ImageUploading
                            value={workshop.photo}
                            dataURLKey="photo"
                        >
                            {({
                            imageList,
                            }) => (
                            // write your building UI
                            <Grid container>
                            <div className="upload__image-wrapper">
                                <div key={1} className="image-item">
                                    <img src={workshop['photo']} alt="" width="200" height="200" />
                                </div>
                            </div>
                            </Grid>
                            )}
                        </ImageUploading>
                    </Grid>
                    <Grid className={props.classes.gridInfo} item xs={12} sm container>
                        <Grid item>
                            <Typography variant="subtitle1">
                                {styles[workshop.style]} <Typography display='inline' variant="subtitle1">({categories[workshop.category]})</Typography>
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant="subtitle1">
                                {workshop.choreographer.name}
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant="subtitle1">{workshop.price} BYN</Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant="subtitle1">Свободных мест: {workshop.maxUsers - workshop.currentUsersCount}</Typography>
                        </Grid>
                        <Grid item>
                            <Button href={`/workshop-info/${workshop.id}?desired=${props.isDesired}`} className={`${props.classes.registerButton} ${classes.btn}`} type="button" variant="contained" color="primary">
                                Подробнее
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
    );
}