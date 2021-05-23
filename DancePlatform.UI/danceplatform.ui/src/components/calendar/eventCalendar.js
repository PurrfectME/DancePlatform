import {React, useState, useEffect} from 'react';
import {
    MonthlyBody,
    MonthlyCalendar,
    MonthlyNav,
    DefaultMonthlyEventItem,
  } from '@zach.codes/react-calendar';
  import {
    startOfMonth,
    parseISO
  } from 'date-fns';
  import '@zach.codes/react-calendar/dist/calendar-tailwind.css';
import { Button } from '@material-ui/core';
import WorkshopService from '../../services/workshopService';
import timeHelper from '../../helpers/dateHelper';
import { makeStyles } from '@material-ui/core/styles';
import '../../styles/profileInfo.css'

const useStyles = makeStyles((theme) => ({
  btn: {
    width: '-webkit-fill-available',
  },
}));


export default function EventCalendar() {
  const classes = useStyles();
    let [currentMonth, setCurrentMonth] = useState(
      startOfMonth(new Date())
    );
    const [workshops, setWorkshops] = useState([]);
  
      useEffect(() => {
        WorkshopService.getAllWorkshops().then(response => {
          setWorkshops([...response]);
        })
      }, [])

    return (
      <MonthlyCalendar
        currentMonth={currentMonth}
        onCurrentMonthChange={date => setCurrentMonth(date)}
      >
        <MonthlyNav />
        <MonthlyBody
          events={[...workshops.map(x => {
            const date = parseISO(`${timeHelper.normalizeDate(x.date)}T${timeHelper.toUtc(x.time).substr(11, 5)}`);
            // console.log('DATE', timeHelper.toUtc(x.time))
            if(date < new Date()){
              return false;
            }
            if(!x.isApprovedByModerator || x.isClosed){
              return false;
            }
            return {
              title: x.place.studioName,
              date: date,
              id: x.id
            }
          })]}
          renderDay={data =>
            data.map((item, index) => (
              <Button color="primary" className={classes.btn} href={`/users-accounting/${item.id}`}>
                <DefaultMonthlyEventItem
                  style={{width: 50}}
                  key={item.id}
                  title={item.title}
                  date={`${item.date.toLocaleTimeString()}`}
              />
              </Button>
              
            ))
          }
        />
      </MonthlyCalendar>
    );
  };
