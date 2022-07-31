import { PageHeader, Space } from 'antd';
import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CharacterCart from '../components/CharacterCart';
import { useAppDispatch, useAppSelector } from '../hoocs/reduxHoocs';

const Bookmarks = () => {
  const dispatch = useAppDispatch();
  const history = useNavigate();
  const { bookmarkCharacter } = useAppSelector((store) => store.bookmark);

  useEffect(() => {
    if (bookmarkCharacter.length) {
    }
  }, []);

  return (
    <div>
      <PageHeader onBack={() => history(`/`)} title="Bookmarks" />
      <Space style={{ justifyContent: 'space-between' }} size={[20, 20]} wrap>
        {bookmarkCharacter.map((item) => (
          <Link to={`/character/${item.id}`} key={item.id}>
            <CharacterCart {...item} />
          </Link>
        ))}
      </Space>
    </div>
  );
};

export default Bookmarks;
