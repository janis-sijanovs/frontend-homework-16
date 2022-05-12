import axios from 'axios';
import {
  ChangeEvent, useEffect, useState,
} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Loader from '../../components/Loader/loader';
import { episodeType } from '../../Models/EpisodeModel';

const EpisodesPage = () => {
  const [episodes, setEpisodes] = useState<episodeType[]>();
  const { search } = useParams();
  const [inputValue, setInputValue] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>();
  const navigate = useNavigate();

  const link = `https://rickandmortyapi.com/api/episode?name=${search || ''}`;

  const getEpisodes = async () => {
    setLoading(true);
    try {
      const response = await axios.get(link);
      setEpisodes(response.data.results);
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
    getEpisodes().then();
  }, [search]);

  return (
    <div>
      <h1 className="heading">
        Episodes:
      </h1>
      <div className="filter">
        <input
          type="text"
          className="input"
          value={inputValue}
          onChange={(e:ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value)}
        />

        <button
          className="button"
          onClick={() => {
            navigate(`/episodes/${inputValue}`);
          }}
        >
          Search By Name
        </button>
      </div>
      <div className="content">
        {episodes && episodes.map(({ id, name }) => (
          <div key={id} className="preview">
            <span>
              {id}
              .
            </span>
            <span>
              {name}
            </span>
            <button onClick={() => navigate(`/episode/${id}`)} className="button button--arrow">--&gt;</button>
          </div>
        ))}
      </div>
      {loading ? <Loader /> : null}
      { error && <span>{error}</span>}
    </div>
  );
};

export default EpisodesPage;
