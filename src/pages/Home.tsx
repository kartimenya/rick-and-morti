import React, { FC, useEffect } from 'react';
import { Pagination, Space } from 'antd';
import { Link } from 'react-router-dom';
import CharacterCart from '../components/CharacterCart';
import { Filters } from '../components/Filters';
import { useAppDispatch, useAppSelector } from '../hoocs/reduxHoocs';
import { fetchCharacters } from '../store/slises/CharacterSlise';
import { setFilters } from '../store/slises/FilterSlise';
import { CharacterCartSpiner } from '../components/CharacterCart/CharacterCartSpiner';

const Home: FC = () => {
  const disputch = useAppDispatch();
  const { count, characters, loading } = useAppSelector((state) => state.characters);
  const filters = useAppSelector((state) => state.filter);

  useEffect(() => {
    disputch(fetchCharacters(filters));
  }, [filters]);

  const pageChange = (page: number) => {
    disputch(setFilters({ ...filters, page }));
  };

  return (
    <Space size={20} direction={'vertical'}>
      <Filters />

      <Space size={20} direction={'vertical'}>
        <Space style={{ justifyContent: 'space-between' }} size={[20, 20]} wrap>
          {loading === 'pending'
            ? [...new Array(4)].map((_, i) => <CharacterCartSpiner key={i} />)
            : loading === 'succeeded'
            ? characters.map((item) => (
                <Link to={`/character/${item.id}`} key={item.id}>
                  <CharacterCart {...item} />
                </Link>
              ))
            : null}
        </Space>
        {count > 0 && (
          <Pagination
            current={filters.page}
            defaultPageSize={20}
            total={count}
            showSizeChanger={false}
            onChange={pageChange}
          />
        )}
      </Space>
    </Space>
  );
};

export default Home;
