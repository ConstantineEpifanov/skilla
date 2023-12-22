import { useState } from 'react';

import { Arrow } from '../../assets/icons/Arrow';
import { useActions } from '../../hooks/actions';
import { useOutsideClick } from '../../hooks/useOutsideClick';

import './DateSelect.scss';
import { RootState } from '../../store';
import { useSelector } from 'react-redux';
import { month, today, twoDaysAgo, week, year } from '../../utils/constants';
import { useGetListMutation } from '../../store/skilla/skilla.api';
import { CalendarIcon } from '../../assets/icons/CalendarIcon';

export const DateSelect = () => {
  const dateFilterState = useSelector((state: RootState) => state.dateFilter);
  const callFilterState = useSelector((state: RootState) => state.callFilter);
  const [isOpen, setIsOpen] = useState(false);
  const { setDateFilter, setList } = useActions();
  const [getList] = useGetListMutation();

  const ref = useOutsideClick(() => {
    setIsOpen(false);
  });

  const onDateFocus = (e: React.FocusEvent<HTMLInputElement>) =>
    (e.target.type = 'date');
  const onDateBlur = (e: React.FocusEvent<HTMLInputElement>) =>
    (e.target.type = 'text');

  const options = [
    { date_start: twoDaysAgo, date_end: today, label: '3 дня' },
    { date_start: week, date_end: today, label: 'Неделя' },
    { date_start: month, date_end: today, label: 'Месяц' },
    { date_start: year, date_end: today, label: 'Год' },
  ];

  const handleItemClick = ({
    date_start,
    date_end,
    label = '3 дня',
  }: {
    date_start: string;
    date_end: string;
    label: string;
  }) => {
    setDateFilter({ date_start, date_end, label });
    setIsOpen(false);
    getList({ date_start, date_end, in_out: callFilterState.id })
      .unwrap()
      .then((data) => {
        setList(data?.results);
      });
  };

  const handleClickLeft = () => {
    let newDateStart;
    let newLabel;

    switch (dateFilterState.date_start) {
      case twoDaysAgo:
        newDateStart = year;
        newLabel = 'Год';
        break;
      case year:
        newDateStart = month;
        newLabel = 'Месяц';
        break;
      case month:
        newDateStart = week;
        newLabel = 'Неделя';
        break;
      case week:
        newDateStart = twoDaysAgo;
        newLabel = '3 дня';
        break;
      default:
        newDateStart = twoDaysAgo;
        newLabel = '3 дня';
    }

    handleItemClick({
      ...dateFilterState,
      date_end: today,
      date_start: newDateStart,
    });
    setDateFilter({
      ...dateFilterState,
      date_end: today,
      date_start: newDateStart,
      label: newLabel,
    });
  };

  const handleClickRight = () => {
    let newDateStart;
    let newLabel;

    switch (dateFilterState.date_start) {
      case twoDaysAgo:
        newDateStart = week;
        newLabel = 'Неделя';
        break;
      case year:
        newDateStart = twoDaysAgo;
        newLabel = '3 дня';
        break;
      case month:
        newDateStart = year;
        newLabel = 'Год';
        break;
      case week:
        newDateStart = month;
        newLabel = 'Месяц';
        break;
      default:
        newDateStart = twoDaysAgo;
        newLabel = '3 дня';
    }

    handleItemClick({
      ...dateFilterState,
      date_end: today,
      date_start: newDateStart,
    });
    setDateFilter({
      ...dateFilterState,
      date_end: today,
      date_start: newDateStart,
      label: newLabel,
    });
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleInputDateSubmit = (e: any) => {
    e.preventDefault();
    handleItemClick({
      ...dateFilterState,
      date_start: e.target[0].value,
      date_end: e.target[1].value,
    });
    setDateFilter({
      ...dateFilterState,
      date_start: e.target[0].value,
      date_end: e.target[1].value,
      label: `${e.target[0].value} - ${e.target[1].value}`,
    });
  };

  return (
    <div className="date-select" ref={ref}>
      <div className="date-select__wrapper">
        <button className="date-select__button" onClick={handleClickLeft}>
          <Arrow direction="90deg" />
        </button>
        <div
          className="date-select__button date-select__button_active"
          onClick={() => setIsOpen(!isOpen)}
        >
          <CalendarIcon /> {dateFilterState.label}
        </div>
        <button className="date-select__button" onClick={handleClickRight}>
          <Arrow direction="270deg" />
        </button>
      </div>

      {isOpen && (
        <div className="date-select__dropdown">
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

          <form
            className="date-select__form"
            onSubmit={(e) => handleInputDateSubmit(e)}
          >
            <p className="date-select__title">Указать даты</p>
            <div className="date-select__inputs">
              <input
                onFocus={onDateFocus}
                onBlur={onDateBlur}
                type="text"
                name="date_start"
                className="date-select__input"
                placeholder="__.__.__"
                required
              />
              <input
                onFocus={onDateFocus}
                onBlur={onDateBlur}
                type="text"
                name="date_end"
                className="date-select__input"
                placeholder="__.__.__"
                required
              />
            </div>
            <button type="submit" className="date-select__submit" />
          </form>
        </div>
      )}
    </div>
  );
};
