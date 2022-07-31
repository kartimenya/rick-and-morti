import { Card, Image, PageHeader, Space } from 'antd';
import Title from 'antd/lib/typography/Title';
import axios from 'axios';
import React, { FC, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hoocs/reduxHoocs';
import { ICharacter, IEpisode } from '../models/models';
import { setBookmarkItem } from '../store/slises/BookmarkSlise';

const CharacterPage: FC = () => {
  const { bookmarkCharacter } = useAppSelector((state) => state.bookmark);
  const dispatch = useAppDispatch();
  const history = useNavigate();
  const params = useParams<'id'>();
  const [character, setCharacter] = useState<ICharacter>({
    created: '',
    episode: [],
    gender: 'unknown',
    id: 1,
    image: '',
    name: '',
    status: 'unknown',
    url: '',
    location: { name: '' },
  });
  const [episode, setEpisode] = useState<IEpisode>({
    name: '',
    episode: '',
  });

  const searchCharacter = async () => {
    try {
      const { data } = await axios.get<ICharacter>(
        `https://rickandmortyapi.com/api/character/${params.id}`,
      );
      setCharacter(data);

      const response = await axios.get<IEpisode>(data.episode[0]);
      setEpisode(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    searchCharacter();
  }, []);

  const addBookmark = () => {
    dispatch(setBookmarkItem(character));
  };

  return (
    <div>
      <PageHeader onBack={() => history(`/`)} title="Character" />
      <Card style={{ width: '670px', position: 'relative' }}>
        <Space size={30}>
          <Image src={character.image} />
          <div>
            <Title style={{ marginBottom: '0' }} level={3}>
              {character.name}
            </Title>
            <p style={{ fontSize: '16px', fontWeight: '500' }}>
              {character.status} - {character.gender}
            </p>
            <div>
              <span style={{ fontSize: '16px', fontWeight: '500', color: 'rgb(158, 158, 158)' }}>
                Last known location:
              </span>
              <p style={{ fontSize: '16px', fontWeight: '500' }}>{character.location.name}</p>
            </div>
            <div>
              <span style={{ fontSize: '16px', fontWeight: '500', color: 'rgb(158, 158, 158)' }}>
                First seen in:
              </span>
              <p style={{ fontSize: '16px', fontWeight: '500' }}>
                {episode.name} ({episode.episode})
              </p>
            </div>
          </div>
        </Space>
        <svg onClick={addBookmark} className="bookmark-icon" x="0px" y="0px" viewBox="0 0 512 512">
          <polygon
            fill={bookmarkCharacter.find((obj) => obj.id === character.id) ? '#000' : '#FFF'}
            points="422.619,49.475 89.381,49.475 89.381,499.346 256,416.037 422.619,499.346 "
          />
          <path
            fill="#1D1D1B"
            d="M81.561,0v512L256,424.781L430.439,512V0H81.561z M414.798,15.641v26.014H97.202V15.641H414.798z
	 M256,407.294L97.202,486.693V57.295h317.597v429.398L256,407.294z"
          />
        </svg>
      </Card>
    </div>
  );
};

export default CharacterPage;
