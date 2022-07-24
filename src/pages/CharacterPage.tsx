import { Card, Image, PageHeader, Space } from 'antd';
import Title from 'antd/lib/typography/Title';
import axios from 'axios';
import React, { FC, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ICharacter, IEpisode } from '../models/models';

const CharacterPage: FC = () => {
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
    type: '',
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

  return (
    <div>
      <PageHeader onBack={() => history(`/`)} title="Character" />
      <Card style={{ width: '670px' }}>
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
      </Card>
    </div>
  );
};

export default CharacterPage;
