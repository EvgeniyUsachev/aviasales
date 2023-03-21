import React from 'react';

import Ticket_Item from '../Ticket_Item/Ticket_Item';

import classes from './Ticket.module.scss';

export default function Ticket({ item }: any) {
  const getPrice = (price: number) => {
    if (price.toString().length === 6) {
      return `${price.toString().slice(0, 3)} ${price.toString().slice(2, 6)} Р`;
    } else {
      return `${price.toString().slice(0, 2)} ${price.toString().slice(2, 5)} Р`;
    }
  };

  return (
    <>
      <div className={classes.Ticket} key={item.date}>
        <div className={classes.header}>
          <div className={classes.price}>{getPrice(item.price)}</div>
          <img src={`https://pics.avs.io/99/36/${item.carrier}.png`} alt="company logo" />
        </div>
        <Ticket_Item ticketData={item} />
      </div>
    </>
  );
}
