import { useSelector } from 'react-redux';
import { RootState } from '../../store';

import './Table.scss';
import { TableRows } from '../TableRows';

export default function Table() {
  const dataList = useSelector((state: RootState) => state.skilla.list);
  console.log(dataList);

  return (
    <table className="table">
      <thead className="table__header">
        <tr className="table__header-row">
          <th className="table__header-item table__header-item_type">Тип</th>
          <th className="table__header-item table__header-item_date">
            <div className="table__header-item-time-sort">
              Время
              <button
                className="table__header-item-time-sort-btn"
                onClick={() => console.log('sort')}
              ></button>
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
            Длительность
          </th>
        </tr>
      </thead>
      <tbody className="table__body">
        <TableRows dataList={dataList} />
      </tbody>
    </table>
  );
}
