import React from 'react';
import { useDispatch } from 'react-redux';

import type { AppDispatch } from '../../store';
import { addFiveTickets } from '../../store/ticketsSlice';

import classes from './ShowMore.module.scss';

export default function ShowMore() {
  const dispatch = useDispatch<AppDispatch>();
  const handleClick = () => {
    dispatch(addFiveTickets());
  };
  return (
    <button className={classes.button} onClick={handleClick}>
      ПОКАЗАТЬ ЕЩЕ 5 БИЛЕТОВ
    </button>
  );
}
