import axios from 'axios';
import { ChangeEvent, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Loader from '../../components/Loader/loader';
import { CharacterType } from '../../Models/CharacterModel';

const CharactersPage = () => {
  const [characters, setCharacters] = useState<CharacterType[]>();

  const { search } = useParams();
  const array = search?.split(',');

  const [inputValue, setInputValue] = useState<string>('1');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>();
  const navigate = useNavigate();

  const getCharacters = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`https://rickandmortyapi.com/api/character?page=
      ${array !== undefined ? array[0] : ''}&status=${array !== undefined ? array[1] : ''}`);
      setCharacters(response.data.results);
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
    getCharacters().then();
  }, [search]);

  return (
    <div>
      <h1 className="heading">
        Charatchers:
      </h1>
      <div className="filter">
        <button
          className="button"
          onClick={() => {
            navigate('/characters/1,');
          }}
        >
          All
        </button>

        <button
          className="button green"
          onClick={() => {
            navigate('/characters/1,alive');
          }}
        >
          Alive
        </button>

        <button
          className="button red"
          onClick={() => {
            navigate('/characters/1,dead');
          }}
        >
          Dead
        </button>

        <button
          className="button grey"
          onClick={() => {
            navigate('/characters/1,unknown');
          }}
        >
          Unknown
        </button>

        <input
          type="number"
          value={inputValue}
          className="input"
          onChange={(e:ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value)}
        />
        <button
          className="button"
          onClick={() => {
            navigate(`/characters/${inputValue},${array !== undefined ? array[1] : ''}`);
          }}
        >
          Go To Page
        </button>
      </div>
      <div className="card-list">
        {characters && characters.map(({
          id, name, image, status,
        }) => (
          <div
            key={id}
            className={`card ${status === 'Alive' ? 'green' : ''} 
          ${status === 'Dead' ? 'red' : ''} ${status === 'unknown' ? 'grey' : ''}`}
          >
            <img src={image} alt="" className="preview__img" />
            <p>
              {id}
              .&nbsp;
              {name}
            </p>

            <button onClick={() => navigate(`/character/${id}`)} className="button">Read More</button>
          </div>
        ))}
      </div>
      {loading ? <Loader /> : null}
      { error && <span>{error}</span>}
    </div>
  );
};

export default CharactersPage;
