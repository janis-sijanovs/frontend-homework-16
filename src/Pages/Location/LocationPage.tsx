import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Loader from '../../components/Loader/loader';
import { LoactionType } from '../../Models/LoactionModel';

const LocationPage = () => {
  const [location, setLocation] = useState<LoactionType>();
  const { id } = useParams();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>();
  const navigate = useNavigate();

  const getEpisode = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`https://rickandmortyapi.com/api/location/${id}`);
      setLocation(response.data);
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
    if (id) {
      getEpisode().then();
    } else {
      navigate('/locations');
    }
  }, [id]);

  return (
    <div className="list__container">
      {id && (
      <button
        onClick={() => navigate(`/location/${+id < 2 ? '1' : (+id - 1).toString()}`)}
        className="button button--arrow"
      >
        &lt;--
      </button>
      )}
      {id && (
      <button
        onClick={() => navigate(`/location/${(+id + 1).toString()}`)}
        className="button button--arrow"
      >
        --&gt;
      </button>
      )}
      <div className="list__attributes">
        <h1 className="heading">
          {location?.id}
          : &nbsp;
          {location?.name}
        </h1>
        <p className="list__option">
          Type:
          {' '}
          {location?.type}
        </p>
        <p className="list__option">
          Dimension:
          {' '}
          {location?.dimension}
        </p>
      </div>
      {loading ? <Loader /> : null}
      { error && <span>{error}</span>}
    </div>
  );
};

export default LocationPage;
