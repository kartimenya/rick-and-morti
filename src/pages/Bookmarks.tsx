import React from 'react';
import { PageHeader, Space } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import CharacterCart from '../components/CharacterCart';
import { useAppSelector } from '../hoocs/reduxHoocs';
import Title from 'antd/lib/typography/Title';

const Bookmarks = () => {
  const history = useNavigate();
  const { bookmarkCharacters } = useAppSelector((store) => store.bookmark);

  return (
    <div>
      <PageHeader onBack={() => history(`/`)} title="Bookmarks" />
      <Space style={{ justifyContent: 'space-between' }} size={[20, 20]} wrap>
        {bookmarkCharacters.length ? (
          bookmarkCharacters.map((item) => (
            <Link to={`/character/${item.id}`} key={item.id}>
              <CharacterCart {...item} />
            </Link>
          ))
        ) : (
          <Title>Bookmarks is empty</Title>
        )}
      </Space>
    </div>
  );
};

export default Bookmarks;
