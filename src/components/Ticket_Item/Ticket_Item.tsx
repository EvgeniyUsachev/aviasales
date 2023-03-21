import React from 'react';
import { format, add } from 'date-fns';

import classes from './Ticket_Item.module.scss';

export interface ITicketData {
  // props: {
  ticketData: {
    price: number;
    carrier: string;
    segments: Array<{
      origin: string;
      destination: string;
      date: string;
      duration: number;
      stops: Array<string>;
    }>;
    children?: JSX.Element | JSX.Element[];
  };
  // };
}
export default function Ticket_Item({ ticketData }: ITicketData) {
  const wayToData = ticketData.segments[0];
  const wayBackData = ticketData.segments[1];

  const getTransferCount = (stops: string[]) => {
    if (stops.length === 0) {
      return 'Прямой рейс';
    } else if (stops.length === 1) {
      return '1 пересадка';
    } else if (stops.length === 2) {
      return '2 пересадки';
    } else if (stops.length === 3) {
      return '3 пересадки';
    }
  };

  const convertDateToTime = (date: Date | string) => {
    return format(new Date(date), 'HH:mm');
  };

  const getArrivaltime = (startTime: string, duration: number) => {
    const result = add(new Date(startTime), {
      minutes: duration,
    });
    return result;
  };

  const getFlightTime = (duration: number) => {
    const hours = Math.trunc(duration / 60);
    const mins = duration % 60;
    return `${hours}ч ${mins}м`;
  };

  return (
    <div className={classes.item}>
      <div className={classes.item__header}>
        <div className={classes.item__destination}>{`${wayToData.origin} - ${wayToData.destination}`}</div>
        <div style={{ width: '32%' }}>В ПУТИ</div>
        <div style={{ width: '29%' }}>{getTransferCount(wayToData.stops)?.toUpperCase()}</div>
      </div>
      <div className={classes.item__info}>
        <div style={{ width: '33%' }}>
          <>
            {convertDateToTime(wayToData.date.slice(0, -1))} -
            {convertDateToTime(getArrivaltime(wayToData.date.slice(0, -1), wayToData.duration))}
          </>
        </div>
        <div style={{ width: '32%' }}>{getFlightTime(wayToData.duration)}</div>
        <div style={{ width: '29%' }}>{wayToData.stops.join(', ')}</div>
      </div>
      <div className={classes.item__header}>
        <div
          className={classes.item__destination}
        >{`${ticketData.segments[1].origin} - ${wayBackData.destination}`}</div>
        <div style={{ width: '32%' }}>В ПУТИ</div>
        <div style={{ width: '29%' }}>{getTransferCount(wayBackData.stops)?.toUpperCase()}</div>
      </div>
      <div className={classes.item__info}>
        <div style={{ width: '33%' }}>
          {' '}
          <>
            {convertDateToTime(wayBackData.date.slice(0, -1))} -
            {convertDateToTime(getArrivaltime(wayBackData.date.slice(0, -1), wayBackData.duration))}
          </>
        </div>
        <div style={{ width: '32%' }}>{getFlightTime(wayBackData.duration)}</div>
        <div style={{ width: '29%' }}>{wayBackData.stops.join(', ')}</div>
      </div>
    </div>
  );
}
