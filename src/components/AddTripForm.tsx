import React, { useState, useContext } from 'react';
import axios from 'axios';
import { Context, addTripAction } from '../store';

axios.defaults.withCredentials = true;
const REACT_APP_BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:3004';

const AddTripForm = () => {
  const { dispatch } = useContext(Context);
  const [tripName, setTripName] = useState<string>('');
  const [btnDisabled, setBtnDisabled] = useState<boolean>(true);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTripName(e.target.value);
    if (e.target.value !== '') setBtnDisabled(false);
    else setBtnDisabled(true);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const resp = await axios.post(`${REACT_APP_BACKEND_URL}/trips`, { name: tripName });
      if (resp.data.trip) {
        console.log('i have trips');
        setTripName('');
        setBtnDisabled(true);
        dispatch(addTripAction(resp.data.trip));
      }
    } catch (err) {
      if (err instanceof Error) console.log(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex mt-4 justify-center items-start">
        <input className="p-2 mb-4 mr-3 text-indigo-700 border-2 border-indigo-500 outline-none focus:bg-gray-300" value={tripName} onChange={handleChange} required />
        <input className="w-24 bg-indigo-700 hover:bg-pink-700 hover:cursor-pointer text-white font-bold py-2 px-4 rounded-full" disabled={btnDisabled} type="submit" value="Go" />
      </div>
    </form>
  );
};

export default AddTripForm;
