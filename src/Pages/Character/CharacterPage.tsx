import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Loader from '../../components/Loader/loader';
import { CharacterType } from '../../Models/CharacterModel';

const CharacterPage = () => {
  const [character, setCharacter] = useState<CharacterType>();
  const { id } = useParams();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>();
  const navigate = useNavigate();

  const getCharacter = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`https://rickandmortyapi.com/api/character/${id}`);
      setCharacter(response.data);
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
      getCharacter().then();
    } else {
      navigate('/characters');
    }
  }, [id]);

  return (
    <div>
      <div className="list__container">
        °
        {id && (
        <button
          onClick={() => navigate(`/character/${+id < 2 ? '1' : (+id - 1).toString()}`)}
          className="button button--arrow"
        >
          &lt;--
        </button>
        )}
        {id && (
        <button
          onClick={() => navigate(`/character/${(+id + 1).toString()}`)}
          className="button button--arrow"
        >
          --&gt;
        </button>
        )}
        <div className="list__attributes">
          <h1 className="heading">
            {character?.id}
            .&nbsp;
            {character?.name}
          </h1>
          <p className="list__option">
            Status: &nbsp;
            {character?.status}
          </p>
          <p className="list__option">
            Species: &nbsp;
            {character?.species}
          </p>
          <p className="list__option">
            Type: &nbsp;
            {character?.type ? character?.type : 'Unknown'}
          </p>
          <p className="list__option">
            Gender: &nbsp;
            {character?.gender}
          </p>
          <p className="list__option">
            Origin: &nbsp;
            {character?.origin.name}
          </p>
          <p className="list__option">
            Location: &nbsp;
            {character?.location.name}
          </p>
        </div>
        <img className="list__image" src={character?.image} alt="" />
      </div>
      {loading ? <Loader /> : null}
      { error && <span>{error}</span>}
    </div>
  );
};

export default CharacterPage;
