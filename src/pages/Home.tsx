import { Pagination, Space } from 'antd';
import React, { FC, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CharacterCart from '../components/CharacterCart';
import { useAppDispatch, useAppSelector } from '../hoocs/reduxHoocs';
import { fetchCharacters } from '../store/slises/CharacterSlise';

const Home: FC = () => {
  const disputch = useAppDispatch();
  const { count, characters } = useAppSelector((state) => state.characters);

  const pageChange = (page: number) => {
    disputch(fetchCharacters(page));
  };

  useEffect(() => {
    disputch(fetchCharacters());
  }, []);

  return (
    <div>
      <Space size={20} wrap>
        <Space style={{ justifyContent: 'space-between' }} size={[20, 20]} wrap>
          {characters.map((item) => (
            <Link to={`/character/${item.id}`} key={item.id}>
              <CharacterCart {...item} />
            </Link>
          ))}
        </Space>
        {count > 0 && (
          <Pagination
            defaultPageSize={20}
            total={count}
            showSizeChanger={false}
            onChange={pageChange}
          />
        )}
      </Space>
    </div>
  );
};

export default Home;
