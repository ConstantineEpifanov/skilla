import './Table.scss';
import { TableRows } from '../TableRows';
import { useState } from 'react';
import { useGetSortedListMutation } from '../../store/skilla/skilla.api';
import { useActions } from '../../hooks/actions';
import { Arrow } from '../../assets/icons/Arrow';
import { RootState } from '../../store';
import { useSelector } from 'react-redux';

export default function Table() {
  const [sortOrderByTime, setSortOrderByTime] = useState<'ASC' | 'DESC'>('ASC');
  const [sortOrderByDuration, setSortOrderByDuration] = useState<
    'ASC' | 'DESC'
  >('ASC');
  const { setList } = useActions();
  const [getSortedList] = useGetSortedListMutation();
  const dateFilterState = useSelector((state: RootState) => state.dateFilter);
  const callFilterState = useSelector((state: RootState) => state.callFilter);

  function handleSortByTime() {
    setSortOrderByTime(sortOrderByTime === 'ASC' ? 'DESC' : 'ASC');
    getSortedList({
      order: sortOrderByTime,
      sort_by: 'date',
      date_start: dateFilterState.date_start,
      date_end: dateFilterState.date_end,
      in_out: callFilterState.id,
    })
      .unwrap()
      .then((data) => {
        setList(data?.results);
        console.log(data?.results);
      });
  }
  function handleSortByDuration() {
    setSortOrderByDuration(sortOrderByDuration === 'ASC' ? 'DESC' : 'ASC');
    getSortedList({
      date_start: dateFilterState.date_start,
      date_end: dateFilterState.date_end,
      in_out: callFilterState.id,
      order: sortOrderByDuration,
      sort_by: 'duration',
    })
      .unwrap()
      .then((data) => {
        setList(data?.results);
        console.log(data?.results);
      });
  }

  return (
    <table className="table">
      <thead className="table__header">
        <tr className="table__header-row">
          <th className="table__header-item table__header-item_type">Тип</th>
          <th className="table__header-item table__header-item_date">
            <div className="table__header-item-sort">
              Время
              <button
                className="table__header-item-sort-btn"
                onClick={() => handleSortByTime()}
              >
                <Arrow direction={sortOrderByTime === 'ASC' ? '0' : '180deg'} />
              </button>
            </div>
          </th>
          <th className="table__header-item table__header-item_avatar">
            Сотрудник
          </th>
          <th className="table__header-item table__header-item_tel">Звонок</th>
          <th className="table__header-item table__header-item_source">
            Источник
          </th>
          <th className="table__header-item table__header-item_rating">
            Оценка
          </th>
          <th className="table__header-item table__header-item_duration">
            <div className="table__header-item-sort table__header-item-sort_justify-end">
              Длительность
              <button
                className="table__header-item-sort-btn"
                onClick={() => handleSortByDuration()}
              >
                <Arrow
                  direction={sortOrderByDuration === 'ASC' ? '0' : '180deg'}
                />
              </button>
            </div>
          </th>
        </tr>
      </thead>
      <tbody className="table__body">
        <TableRows />
      </tbody>
    </table>
  );
}
