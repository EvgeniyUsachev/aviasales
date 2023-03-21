import React from 'react';
import { useDispatch } from 'react-redux';

import { checkboxNames } from '../../utls/checkboxNames';
import { setChecked, setCheckedAll } from '../../store/checkBoxSlice';
import type { AppDispatch } from '../../store';
import { useAppSelector } from '../../type/hooks';

import classes from './FilterTransfer.module.scss';

function FilterTransfer() {
  const checkedState = useAppSelector((state) => state.checkbox.checkedState);

  const dispatch = useDispatch<AppDispatch>();
  const handleCheck = (value: number) => {
    dispatch(setChecked(value));
    dispatch(setCheckedAll(value));
  };

  return (
    <>
      <ul className={classes.filter}>
        <div className={classes.header}>КОЛИЧЕСТВО ПЕРЕСАДОК</div>
        {checkboxNames.map(({ name }, index) => {
          return (
            <li key={index} className={classes.checkbox}>
              <label>
                <input
                  type="checkbox"
                  name={name}
                  value={name}
                  id={`checkbox-${index}`}
                  checked={checkedState[index]}
                  onChange={() => handleCheck(index)}
                />{' '}
                <span>{name}</span>
              </label>
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default FilterTransfer;
