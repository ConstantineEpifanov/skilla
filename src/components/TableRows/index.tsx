import { useEffect, useState } from 'react';
import { InCall } from '../../assets/icons/InCall';
import { OutCall } from '../../assets/icons/OutCall';
import { TableItem } from '../../models/models';
import { BadStatus } from '../../assets/icons/BadStatus';
import { GreatStatus } from '../../assets/icons/GreatStatus';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

import avatar from '../../assets/icons/avatar.svg';
// import { useGetRecordMutation } from '../../store/skilla/skilla.api';

export const TableRows = () => {
  const dataList = useSelector((state: RootState) => state.skilla.list);

  const [todayList, setTodayList] = useState<TableItem[]>([]);
  const [yesterdayList, setYesterdayList] = useState<TableItem[]>([]);
  const [elseList, setElseList] = useState<TableItem[]>([]);

  // const [getRecord, { data: recordData }] = useGetRecordMutation();

  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);

  useEffect(() => {
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

  const formatCallTime = (time: number) => {
    const timestamp = time;
    const minutes = Math.floor(timestamp / 60);
    const seconds = timestamp % 60;

    const formatted = [
      minutes.toString().padStart(2, '0'),
      seconds.toString().padStart(2, '0'),
    ].join(':');

    return formatted;
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
  // Получение ссылки на запись
  // function handleRecordClick(record: string, partnership_id: string) {
  //   getRecord({ record, partnership_id })
  // }

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
      <td className="table__item">
        {item.time !== 0 && (
          <div className="table__item-record">
            <audio controls className="table__item-record-audio">
              <source
                src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
                type="audio/mpeg"
              />
            </audio>
            <p>{formatCallTime(item.time)}</p>{' '}
          </div>
        )}
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
