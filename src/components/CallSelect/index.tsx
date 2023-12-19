import { useState } from 'react';
import './CallSelect.scss';

import { ArrowDown } from '../../assets/icons/ArrowDown';
import { Cross } from '../../assets/icons/Cross';
import {
  useGetCallsListMutation,
  useGetListMutation,
} from '../../store/skilla/skilla.api';
import { useActions } from '../../hooks/actions';
import { useOutsideClick } from '../../hooks/useOutsideClick';

export const CallSelect = () => {
  const [state, setState] = useState({ id: 'all', label: 'Все типы' });
  const [isOpen, setIsOpen] = useState(false);
  const { setList } = useActions();
  const [getCallsList] = useGetCallsListMutation();
  const [getList] = useGetListMutation();

  const ref = useOutsideClick(() => {
    setIsOpen(!isOpen);
    console.log('click outside');
  });

  const options = [
    { id: 'all', label: 'Все типы' },
    { id: '1', label: 'Входящие' },
    { id: '0', label: 'Исходящие' },
  ];

  const handleItemClick = (id: string, label: string) => {
    setState({ id, label });
    setIsOpen(false);
    getCallsList(id).then((res) => {
      if ('data' in res) {
        setList(res.data.results);
      } else {
        console.log(res);
      }
    });
  };

  const handleResetFilters = () => {
    setState({ id: 'all', label: 'Все типы' });
    getList({}).then((res) => {
      if ('data' in res) {
        setList(res.data.results);
      } else {
        console.log(res);
      }
    });
  };

  return (
    <div className="call-select" ref={ref}>
      <button
        className={`call-select__button ${
          state.id !== 'all' && 'call-select__button_active'
        }`}
        type="button"
        onClick={() => setIsOpen(!isOpen)}
      >
        {state.label} <ArrowDown />
      </button>

      {isOpen && (
        <ul className="call-select__list">
          {options.map(({ id, label }) => (
            <li
              key={id}
              id={id}
              className={`call-select__list-item ${
                state.id === id && 'call-select__list-item_active'
              }`}
              onClick={() => handleItemClick(id, label)}
            >
              {label}
            </li>
          ))}
        </ul>
      )}

      {state.id !== 'all' && (
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
