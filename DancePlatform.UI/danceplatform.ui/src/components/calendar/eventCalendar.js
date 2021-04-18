import {React, useState} from 'react';
import {
    MonthlyBody,
    MonthlyCalendar,
    MonthlyNav,
    DefaultMonthlyEventItem,
  } from '@zach.codes/react-calendar';
  import {
    startOfMonth,
    subHours,
    subYears,
    getHours,
    getMinutes,
  } from 'date-fns';
  import '@zach.codes/react-calendar/dist/calendar-tailwind.css';
import { Button } from '@material-ui/core';


export default function EventCalendar() {
    let [currentMonth, setCurrentMonth] = useState(
      startOfMonth(new Date())
    );
  
    return (
      <MonthlyCalendar
        currentMonth={currentMonth}
        onCurrentMonthChange={date => setCurrentMonth(date)}
      >
        <MonthlyNav />
        <MonthlyBody
          events={[
            { title: 'ElGato DC', date: subHours(new Date(), 2) },
            { title: 'DiVa Studio', date: subHours(new Date(), 1) },
            { title: 'Devil Dance Studio', date: new Date() },
          ]}
          renderDay={data =>
            data.map((item, index) => (
              <Button href="/users-accounting">
                <DefaultMonthlyEventItem
                key={index}
                title={item.title}
                date={`${item.date.getHours()}:${item.date.getMinutes()}`}
              />
              </Button>
              
            ))
          }
        />
      </MonthlyCalendar>
    );
  };
