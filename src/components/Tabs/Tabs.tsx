import React from 'react';
import { Button, Space } from 'antd';
import { useDispatch } from 'react-redux';

import { useAppSelector } from '../../type/hooks';
import { setCheapSorting, setFastSorting, setOptimalSorting } from '../../store/checkBoxSlice';
import type { AppDispatch } from '../../store';

import classes from './Tabs.module.scss';

export default function Tabs() {
  const dispatch = useDispatch<AppDispatch>();

  const handleCheapClick = () => {
    dispatch(setCheapSorting());
  };

  const handleFastClick = () => {
    dispatch(setFastSorting());
  };

  const handleOptimalClick = () => {
    dispatch(setOptimalSorting());
  };

  const cheapSort = useAppSelector((state) => state.checkbox.cheapSort);
  const fastSort = useAppSelector((state) => state.checkbox.fastSort);
  const optimalSort = useAppSelector((state) => state.checkbox.optimalSort);

  const classezCheap = cheapSort ? `${classes.button} ${classes.active}` : `${classes.button}`;
  const classezFast = fastSort ? `${classes.button} ${classes.active}` : `${classes.button}`;
  const classezOpt = optimalSort ? `${classes.button} ${classes.active}` : `${classes.button}`;

  return (
    <Space.Compact>
      <Button className={classezCheap} onClick={handleCheapClick}>
        САМЫЙ ДЕШЕВЫЙ
      </Button>
      <Button className={classezFast} onClick={handleFastClick}>
        САМЫЙ БЫСТРЫЙ
      </Button>
      <Button className={classezOpt} onClick={handleOptimalClick}>
        ОПТИМАЛЬНЫЙ
      </Button>
    </Space.Compact>
  );
}
