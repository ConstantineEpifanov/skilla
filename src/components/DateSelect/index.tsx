import { useState } from 'react';

import { Arrow } from '../../assets/icons/Arrow';
import { useActions } from '../../hooks/actions';
import { useOutsideClick } from '../../hooks/useOutsideClick';

import './DateSelect.scss';
import { RootState } from '../../store';
import { useSelector } from 'react-redux';
import { month, today, twoDaysAgo, week, year } from '../../utils/constants';
import { useGetListMutation } from '../../store/skilla/skilla.api';

export const DateSelect = () => {
  const dateFilterState = useSelector((state: RootState) => state.dateFilter);
  const [isOpen, setIsOpen] = useState(false);
  const { setDateFilter, setList } = useActions();
  const [getList] = useGetListMutation();

  const ref = useOutsideClick(() => {
    setIsOpen(false);
  });

  const options = [
    { date_start: twoDaysAgo, date_end: today, label: '3 дня' },
    { date_start: week, date_end: today, label: 'Неделя' },
    { date_start: month, date_end: today, label: 'Месяц' },
    { date_start: year, date_end: today, label: 'Год' },
  ];

  const handleItemClick = ({
    date_start,
    date_end,
    label,
  }: {
    date_start: string;
    date_end: string;
    label: string;
  }) => {
    setDateFilter({ date_start, date_end, label });
    setIsOpen(false);
    getList({ date_start, date_end, in_out: 'all' })
      .unwrap()
      .then((data) => {
        setList(data?.results);
      });
  };

  return (
    <div className="date-select" ref={ref}>
      <div className="date-select__wrapper">
        <button className="date-select__button">
          <Arrow direction="90deg" />
        </button>
        <div
          className="date-select__button date-select__button_active"
          onClick={() => setIsOpen(!isOpen)}
        >
          {dateFilterState.label}
        </div>
        <button className="date-select__button">
          <Arrow direction="270deg" />
        </button>
      </div>
      {isOpen && (
        <ul className="date-select__list">
          {options.map((item) => (
            <li
              key={item.label}
              className={`date-select__list-item ${
                dateFilterState.label === item.label &&
                'date-select__list-item_active'
              }`}
              onClick={() => handleItemClick(item)}
            >
              {item.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
