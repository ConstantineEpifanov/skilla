import { useState } from 'react';
import './CallSelect.scss';

import { Arrow } from '../../assets/icons/Arrow';
import { Cross } from '../../assets/icons/Cross';
import { useGetListMutation } from '../../store/skilla/skilla.api';
import { useActions } from '../../hooks/actions';
import { useOutsideClick } from '../../hooks/useOutsideClick';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

export const CallSelect = () => {
  const callFilterState = useSelector((state: RootState) => state.callFilter);
  const [isOpen, setIsOpen] = useState(false);
  const { setList, setCallFilter } = useActions();

  const [getList] = useGetListMutation();

  const ref = useOutsideClick(() => {
    setIsOpen(false);
  });

  const options = [
    { id: 'all', label: 'Все типы' },
    { id: '1', label: 'Входящие' },
    { id: '0', label: 'Исходящие' },
  ];

  const handleItemClick = (id: string, label: string) => {
    setCallFilter({ id, label });
    setIsOpen(false);
    getList({ in_out: id })
      .unwrap()
      .then((data) => {
        setList(data?.results);
      });
  };

  const handleResetFilters = () => {
    setCallFilter({ id: 'all', label: 'Все типы' });

    getList({})
      .unwrap()
      .then((data) => {
        setList(data?.results);
      });
  };

  return (
    <div className="call-select" ref={ref}>
      <button
        className={`call-select__button ${
          callFilterState.id !== 'all' && 'call-select__button_active'
        }`}
        type="button"
        onClick={() => setIsOpen(!isOpen)}
      >
        {callFilterState.label} <Arrow />
      </button>

      {isOpen && (
        <ul className="call-select__list">
          {options.map(({ id, label }) => (
            <li
              key={id}
              id={id}
              className={`call-select__list-item ${
                callFilterState.id === id && 'call-select__list-item_active'
              }`}
              onClick={() => handleItemClick(id, label)}
            >
              {label}
            </li>
          ))}
        </ul>
      )}

      {callFilterState.id !== 'all' && (
        <button
          className="call-select__button"
          type="button"
          onClick={() => handleResetFilters()}
        >
          Сбросить фильтры
          <Cross />
        </button>
      )}
    </div>
  );
};
