import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Loader from '../../components/Loader/loader';
import { LoactionType } from '../../Models/LoactionModel';

const LocationsPage = () => {
  const [locations, setLocations] = useState<LoactionType[]>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>();
  const navigate = useNavigate();

  const getLocations = async () => {
    setLoading(true);
    try {
      const response = await axios.get('https://rickandmortyapi.com/api/location');
      setLocations(response.data.results);
    } catch (err: any) {
      if (axios.isAxiosError(err)) {
        if (err.response?.status === 404) {
          setError('No Data');
        } else {
          setError(err.message);
        }
      } else {
        setError('Not Axios Error');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getLocations().then();
  }, []);

  return (
    <div>
      <h1 className="heading">
        Locations:
      </h1>
      <div className="content">
        {locations && locations.map(({ id, name }) => (
          <div key={id} className="preview">
            <span>
              {id}
              .
            </span>
            <span>
              {name}
            </span>
            <button onClick={() => navigate(`/location/${id}`)} className="button button--arrow">--&gt;</button>
          </div>
        ))}
      </div>
      {loading ? <Loader /> : null}
      { error && <span>{error}</span>}
    </div>
  );
};

export default LocationsPage;
