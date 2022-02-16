import React, { useState, useContext } from 'react';
import axios from 'axios';
import { Context, addClimbAction, Trip } from '../store';

interface Props {
  trip: Trip
}

const REACT_APP_BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:3004';

const AddClimbForm = ({ trip }: Props) => {
  const { dispatch } = useContext(Context);
  const [climbName, setClimbName] = useState<string | undefined>('');
  const [difficulty, setDifficulty] = useState<string | undefined >('');

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => setClimbName(e.target.value);
  const handleDifficultyChange = (e:React.ChangeEvent<HTMLInputElement>) => setDifficulty(e.target.value);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formObj = { name: climbName, difficulty, tripId: trip.id };
    try {
      const response = await axios.post(`${REACT_APP_BACKEND_URL}/climbs`, formObj);
      console.log(response.data);
      dispatch(addClimbAction(trip, response.data.climb));
    } catch (err) {
      if (err instanceof Error) console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex mt-4 justify-center items-start">
        <input className="p-2 mb-4 mr-3 text-indigo-700 border-2 border-indigo-500 outline-none focus:bg-gray-300" value={climbName} onChange={handleNameChange} required placeholder="Name" />
        <input className="p-2 mb-4 mr-3 text-indigo-700 border-2 border-indigo-500 outline-none focus:bg-gray-300" value={difficulty} onChange={handleDifficultyChange} required placeholder="Difficulty" />
        <input className="w-24 bg-indigo-700 hover:bg-pink-700 hover:cursor-pointer text-white font-bold py-2 px-4 rounded" type="submit" value="Submit" />
      </div>
    </form>
  );
};

export default AddClimbForm;
