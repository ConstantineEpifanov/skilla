import { useEffect, useLayoutEffect } from 'react';
import { useGetListMutation } from '../../store/skilla/skilla.api';
import { useActions } from '../../hooks/actions';
import Table from '../Table';
import './Main.scss';
import { CallSelect } from '../CallSelect';
import { DateSelect } from '../DateSelect';

export default function Main() {
  const [getList, { data }] = useGetListMutation();

  const { setList } = useActions();

  useLayoutEffect(() => {
    getList({});
  }, []);

  useEffect(() => {
    setList(data?.results);
  }, [data]);

  return (
    <main className="main">
      <div className="main__filters">
        <CallSelect /> <DateSelect />
      </div>
      <Table />
    </main>
  );
}
