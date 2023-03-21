import React, { CSSProperties } from 'react';
import { useDispatch } from 'react-redux';
import BarLoader from 'react-spinners/BarLoader';

import plane from '../../img/plane.svg';
import FilterTransfer from '../FilterTransfer/FilterTransfer';
import Tabs from '../Tabs/Tabs';
import TicketList from '../TicketList/TicketList';
import ShowMore from '../ShowMore/ShowMore';
import type { AppDispatch } from '../../store';
import { fetchSearchId, fetchTicketsData, removeAlert } from '../../store/ticketsSlice';
import { useAppSelector } from '../../type/hooks';

import classes from './App.module.scss';

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const status = useAppSelector((state) => state.tickets.status);
  const checkedState = useAppSelector((state) => state.checkbox.checkedState);

  const override: CSSProperties = {
    marginTop: '20px',
  };

  React.useEffect(() => {
    dispatch(fetchSearchId())
      .then((action) => {
        dispatch(fetchTicketsData(action.payload));
      })
      .catch((e) => console.log(e));
  }, []);

  React.useEffect(() => {
    if (status === 'resolved') {
      setTimeout(() => {
        dispatch(removeAlert());
      }, 2000);
    }
  });

  const emptyList = checkedState.some((el: boolean) => el === true) ? (
    <ShowMore />
  ) : (
    <div className={classes.loading}>No tickets match these filters</div>
  );

  return (
    <div className={classes.app}>
      <img src={plane} alt="plane logo " className={classes.img} />
      <div className={classes.wrapper}>
        <FilterTransfer />
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <Tabs />
          {status === 'loading' && (
            <>
              <div className={classes.loading}>Loading all tickets...</div>
              <BarLoader
                color={'#2196f3'}
                loading={true}
                height={4}
                width={502}
                cssOverride={override}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            </>
          )}
          {status === 'resolved' && (
            <div className={classes.loading}>
              <span>Tickets have been downloaded</span>
              <img
                className={classes.imgCheck}
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Eo_circle_light-blue_checkmark.svg/1200px-Eo_circle_light-blue_checkmark.svg.png"
                alt=""
              />
            </div>
          )}
          <TicketList />
          {emptyList}
          <br />
        </div>
      </div>
    </div>
  );
}

export default App;
