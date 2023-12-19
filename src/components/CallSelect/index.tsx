import { useState } from 'react';
import './CallSelect.scss';

export const CallSelect = () => {
  const [state, setState] = useState('all');

  console.log(state);

  return (
    <form className="react-select">
      <select
        className="react-select__control"
        name="type"
        value={state}
        defaultValue="all"
        onChange={(e) => setState(e.target.value)}
      >
        <option className="react-select__option" value="all">
          Все типы
        </option>
        <option className="react-select__option" value="in">
          Входящие
        </option>
        <option className="react-select__option" value="out">
          Исходящие
        </option>
      </select>
      {state !== 'all' && (
        <button className="react-select__button" type="reset">
          Сбросить фильтры{' '}
          <svg
            style={{ marginLeft: '8px' }}
            width="9"
            height="9"
            viewBox="0 0 9 9"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8.75 0.88125L7.86875 0L4.375 3.49375L0.88125 0L0 0.88125L3.49375 4.375L0 7.86875L0.88125 8.75L4.375 5.25625L7.86875 8.75L8.75 7.86875L5.25625 4.375L8.75 0.88125Z"
              fill="#ADBFDF"
            />
          </svg>
        </button>
      )}
    </form>
  );
};

// import { Controller, DefaultValues, SubmitHandler, useForm } from 'react-hook-form';
// import './CallSelect.scss'
// import * as cross from '../../assets/icons/cross.svg'

// import Select from 'react-select'

// export type FormValues = {
//     ReactSelect: { value: string; label: string };
// };

// export const defaultValues: DefaultValues<FormValues> = {
//     ReactSelect: { value: 'all', label: 'Все типы' },
// };

// const options = [
//     { value: 'all', label: 'Все типы' },
//     { value: 'in', label: 'Входящие' },
//     { value: 'out', label: 'Исходящие' }
// ]

// export const CallSelect = () => {
//     const {
//         reset,
//         control,
//     } = useForm<FormValues>({
//         defaultValues
//     });

//     const onSubmit: SubmitHandler<FormValues> = (data) =>
//         alert(JSON.stringify(data));

//     return (
//         <form className="react-select" onSubmit={onSubmit}>
//             <Controller
//                 render={({ field }) => (
//                     <Select
//                         {...field}
//                         options={options}
//                         unstyled
//                         classNamePrefix="react-select"
//                         isSearchable={false}
//                     />
//                 )}
//                 name="ReactSelect"

//                 control={control}
//             />
//             <button
//                 className="react-select__button"
//                 type="button"
//                 onClick={() => {
//                     reset();
//                 }}
//             >
//                 Сбросить фильтры <svg style={{ marginLeft: '8px' }} width="9" height="9" viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg">
//                     <path d="M8.75 0.88125L7.86875 0L4.375 3.49375L0.88125 0L0 0.88125L3.49375 4.375L0 7.86875L0.88125 8.75L4.375 5.25625L7.86875 8.75L8.75 7.86875L5.25625 4.375L8.75 0.88125Z" fill="#ADBFDF" />
//                 </svg>
//             </button>
//         </form>
//     )
// }
