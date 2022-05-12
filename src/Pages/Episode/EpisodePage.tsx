import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Loader from '../../components/Loader/loader';
import { episodeType } from '../../Models/EpisodeModel';

const EpisodePage = () => {
  const [episode, setEpisode] = useState<episodeType>();
  const { id } = useParams();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>();
  const navigate = useNavigate();

  const getEpisode = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`https://rickandmortyapi.com/api/episode/${id}`);
      setEpisode(response.data);
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
      navigate('/episodes');
    }
  }, [id]);

  return (
    <div className="list__container">
      {id && (
      <button
        onClick={() => navigate(`/episode/${+id < 2 ? '1' : (+id - 1).toString()}`)}
        className="button button--arrow"
      >
        &lt;--
      </button>
      )}
      {id && (
      <button
        onClick={() => navigate(`/episode/${(+id + 1).toString()}`)}
        className="button button--arrow"
      >
        --&gt;
      </button>
      )}
      <div className="list__attributes">
        <h1 className="heading">
          {episode?.episode}
          : &nbsp;
          {episode?.name}
        </h1>
        <p className="list__option">
          Release Date:
          {' '}
          {episode?.airDate}
        </p>
      </div>
      {loading ? <Loader /> : null}
      { error && <span>{error}</span>}
    </div>
  );
};

export default EpisodePage;
