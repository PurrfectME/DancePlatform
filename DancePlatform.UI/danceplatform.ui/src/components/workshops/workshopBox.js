import React from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {styles, categories} from '../../constants/commonData';

export default function WorkshopBox(props) {
const {workshop} = props;

return (
        <Paper className={props.classes.paper}>
            <Grid className={props.classes.grid} container >
                <Grid className={props.classes.img} item />
                <Grid className={props.classes.gridInfo} item xs={12} sm container>
                    <Grid item>
                        <Typography variant="subtitle1">
                            {styles[workshop.style]} <Typography display='inline' variant="subtitle1">({categories[workshop.category]})</Typography>
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant="subtitle1">
                            {workshop.choreographer}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant="subtitle1">{workshop.price} BYN</Typography>
                    </Grid>
                    <Grid item>
                        <Button href='/workshop-info' className={props.classes.registerButton} type="button" variant="contained" color="primary">
                            Подробнее
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </Paper>
  );
}