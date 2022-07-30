import { Card, Image, PageHeader, Space } from 'antd';
import Title from 'antd/lib/typography/Title';
import axios from 'axios';
import React, { FC, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch } from '../hoocs/reduxHoocs';
import { ICharacter, IEpisode } from '../models/models';
import { setBookmarkItem } from '../store/slises/BookmarkSlise';

const CharacterPage: FC = () => {
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
    species: '',
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
    dispatch(setBookmarkItem(character.id));
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

        <svg onClick={addBookmark} className="bookmark-icon" viewBox="0 0 24 24" fill="none">
          <g>
            <path
              fill="black"
              d="M0.75004 22C0.638379 22.0275 0.5217 22.0275 0.410039 22C0.285703 21.9381 0.181311 21.8424 0.108805 21.7239C0.0362983 21.6054 -0.001394 21.4689 3.94124e-05 21.33V5.59C0.0105496 4.63594 0.396261 3.72438 1.07372 3.05253C1.75119 2.38068 2.66593 2.00257 3.62004 2H12.74C13.6993 2.00264 14.6185 2.38488 15.2969 3.06319C15.9752 3.7415 16.3574 4.66073 16.36 5.62V21.28C16.3583 21.4186 16.3186 21.5541 16.2454 21.6719C16.1721 21.7896 16.0681 21.885 15.9445 21.9479C15.8209 22.0107 15.6825 22.0385 15.5442 22.0283C15.4059 22.0181 15.2731 21.9703 15.16 21.89L8.16004 16.73L1.18004 21.89C1.04995 21.9665 0.900879 22.0046 0.75004 22ZM3.62004 3.47C3.05778 3.47 2.51855 3.69336 2.12097 4.09093C1.7234 4.48851 1.50004 5.02774 1.50004 5.59V19.8L7.74004 15.19C7.86831 15.0935 8.0245 15.0412 8.18504 15.0412C8.34558 15.0412 8.50177 15.0935 8.63004 15.19L14.86 19.8V5.59C14.8574 5.02855 14.6332 4.49085 14.2362 4.09384C13.8392 3.69683 13.3015 3.47263 12.74 3.47H3.62004Z"
            />
          </g>
        </svg>
      </Card>
    </div>
  );
};

export default CharacterPage;
