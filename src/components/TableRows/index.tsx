import { FC, useLayoutEffect, useState } from 'react';
import { InCall } from '../../assets/icons/InCall';
import { OutCall } from '../../assets/icons/OutCall';
import { TableItem } from '../../models/models';
import { BadStatus } from '../../assets/icons/BadStatus';
import { GreatStatus } from '../../assets/icons/GreatStatus';
import avatar from '../../assets/icons/avatar.svg';

export const TableRows: FC<{
  dataList: TableItem[];
}> = ({ dataList }) => {
  const [todayList, setTodayList] = useState<TableItem[]>([]);
  const [yesterdayList, setYesterdayList] = useState<TableItem[]>([]);
  const [elseList, setElseList] = useState<TableItem[]>([]);

  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);

  useLayoutEffect(() => {
    filterByDate(dataList);
  }, [dataList]);

  const fixTelNumber = (tel: string) => {
    if (tel) {
      return tel.replace(
        /(\d{1})(\d{3})(\d{3})(\d{2})(\d{2})/,
        '+$1 ($2) $3-$4-$5',
      );
    }
  };

  const trimDate = (date: string) => {
    if (date) {
      return date.slice(11, 16);
    }
  };

  const getRating = (rating: string) => {
    switch (rating) {
      case 'Не дозвонился':
        return <BadStatus />;
      case 'Дозвонился':
        return <GreatStatus />;
    }
  };

  function filterByDate(array: TableItem[]) {
    const todayArray = array?.filter(
      (item) => item.date_notime === today.toISOString().slice(0, 10),
    );
    const yesterdayArray = array?.filter(
      (item) => item.date_notime === yesterday.toISOString().slice(0, 10),
    );
    const elseArray = array?.filter(
      (item) =>
        item.date_notime !== yesterday.toISOString().slice(0, 10) &&
        item.date_notime !== today.toISOString().slice(0, 10),
    );
    return (
      setTodayList(todayArray),
      setYesterdayList(yesterdayArray),
      setElseList(elseArray)
    );
  }

  const renderRows = (item: TableItem) => (
    <tr key={item.id} className="table__item-row">
      <td className="table__item">
        {item.in_out === 1 ? <InCall /> : <OutCall />}
      </td>
      <td className="table__item">{trimDate(item.date)}</td>
      <td className="table__item">
        <img
          className="table__item-avatar"
          src={item.person_avatar ? item.person_avatar : avatar}
          alt={item.person_name + ' ' + item.person_surname}
        />
      </td>
      <td className="table__item">{fixTelNumber(item.from_number)}</td>
      <td className="table__item">{item.source}</td>
      <td className="table__item">{getRating(item.status)}</td>
      {/* <td className='table__item'>{item.time !== 0 ? <><audio controls>
                <source src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" type="audio/mpeg" />
            </audio> <p>{item.time}:00</p></> : ''}</td> */}
      <td className="table__item">
        {item.time !== 0 ? `${item.time}:00` : ''}
      </td>
    </tr>
  );

  return (
    <>
      {todayList && todayList.map((item) => renderRows(item))}

      {yesterdayList && yesterdayList.length !== 0 && (
        <>
          <div className="table__date-divider">
            <p className="table__date-divider-text">Вчера</p>
            <span className="table__date-divider-number">
              {yesterdayList.length}
            </span>
          </div>
          {yesterdayList.map((item) => renderRows(item))}
        </>
      )}

      {elseList && elseList.length !== 0 && (
        <>
          <div className="table__date-divider">
            <p className="table__date-divider-text">Ранее</p>
            <span className="table__date-divider-number">
              {elseList.length}
            </span>
          </div>
          {elseList.map((item) => renderRows(item))}
        </>
      )}
    </>
  );
};
