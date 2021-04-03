import React from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';


export default function WorkshopBox(props) {

return (
      <>
        <Paper className={props.classes.paper}>
            <Grid className={props.classes.grid} container >
                <Grid className={props.classes.img} item>
                    {/* <img className={props.classes.img} alt="Промо" src={sex}/> */}
                </Grid>
                <Grid className={props.classes.gridInfo} item xs={12} sm container>
                    <Grid item>
                        <Typography gutterBottom variant="subtitle1">
                        Standard license
                        </Typography>
                        
                    </Grid>
                    <Grid item>
                        <Typography variant="body2" style={{ cursor: 'pointer' }}>
                            Remove
                        </Typography>
                    </Grid>
                    <Grid item>
                    <Typography variant="subtitle1">$19.00</Typography>
                    </Grid>
                </Grid>
        </Grid>
        </Paper>
        </>
  );
}