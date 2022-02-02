import { Fragment } from 'react';
import { useDispatch } from 'react-redux';

function Filter({ value, search }) {
  const dispatch = useDispatch();

  return (
    <Fragment>
      <h2>Contacts</h2>
      <label>
        Find contacts by name
        <input type="text" value={value} onChange={(e) => dispatch(search(e.currentTarget.value))} />
      </label>
    </Fragment>
  );
}

export default Filter;
