import React from 'react';

import Ticket from '../Ticket/Ticket';
import type { TicketType } from '../../store/ticketsSlice';
import { useAppSelector } from '../../type/hooks';

export default function TicketList() {
  const ticketData = useAppSelector((state) => state.tickets.ticketsData);
  const slice = useAppSelector((state) => state.tickets.slice);
  const checkedState = useAppSelector((state) => state.checkbox.checkedState);

  const cheapSort = useAppSelector((state) => state.checkbox.cheapSort);
  const fastSort = useAppSelector((state) => state.checkbox.fastSort);
  const optimalSort = useAppSelector((state) => state.checkbox.optimalSort);

  // console.log(ticketData);
  // console.log(checkedState);

  const copyTicketData = JSON.parse(JSON.stringify(ticketData));

  const getSorted: any = (a: TicketType, b: TicketType) => {
    if (cheapSort) {
      if (a.price && b.price) return a.price - b.price;
    }
    if (fastSort) {
      if (a.segments[0].duration && a.segments[1].duration && b.segments[0].duration && b.segments[1].duration)
        return a.segments[0].duration + a.segments[1].duration - (b.segments[0].duration + b.segments[1].duration);
    }
    if (optimalSort) {
      if (a.segments[0].stops.length && b.segments[0].stops.length)
        return a.segments[0].stops.length - b.segments[0].stops.length;
    }
  };

  const filter = (arr: TicketType[]) => {
    const filteredArr: any = [];

    if (checkedState[0]) return arr;
    else {
      checkedState.slice(1, 5).forEach((item: boolean, index: number) => {
        if (item) {
          const midArr = arr.filter(
            (ticket: TicketType) =>
              ticket.segments[0].stops.length === index || ticket.segments[1].stops.length === index
          );
          filteredArr.push([...midArr]);
        }
      });
    }
    // console.log('from filter func', [...filteredArr].flat());
    return [...filteredArr].flat();
  };

  const sortedAndFilteredData = filter(copyTicketData).sort(getSorted);
  // console.log('final', sortedAndFilteredData);

  const unique = new Set(sortedAndFilteredData);
  const finalArr = Array.from(unique);
  // console.log('needed', finalArr);

  return (
    <>
      {finalArr.slice(0, slice).map((item: TicketType, index: number) => {
        return <Ticket key={index} item={item} />;
      })}
    </>
  );
}
