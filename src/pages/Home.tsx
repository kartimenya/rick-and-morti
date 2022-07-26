import { Pagination, Select, Space } from 'antd';
import React, { FC, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CharacterCart from '../components/CharacterCart';
import { useAppDispatch, useAppSelector } from '../hoocs/reduxHoocs';
import { fetchCharacters } from '../store/slises/CharacterSlise';
import { setFilters } from '../store/slises/FilterSlise';

const Home: FC = () => {
  const disputch = useAppDispatch();
  const { count, characters } = useAppSelector((state) => state.characters);
  const filters = useAppSelector((state) => state.filter);

  console.log('filter', filters);

  useEffect(() => {
    disputch(fetchCharacters(filters));

    console.log('filter', filters);
  }, [filters]);

  const pageChange = (page: number) => {
    disputch(setFilters({ ...filters, page }));
  };

  const genderChange = (gender: string) => {
    disputch(setFilters({ ...filters, gender, page: 1 }));
  };

  const statusChange = (status: string) => {
    disputch(setFilters({ ...filters, status, page: 1 }));
  };

  return (
    <Space size={20} wrap>
      <Space size={20} wrap>
        <Select
          style={{ width: 120 }}
          placeholder="status"
          defaultValue={filters.status ? filters.status : null}
          onChange={statusChange}>
          <Select.Option value="">All</Select.Option>
          <Select.Option value="alive">Alive</Select.Option>
          <Select.Option value="dead">Dead</Select.Option>
          <Select.Option value="unknown">Unknown</Select.Option>
        </Select>
        <Select
          style={{ width: 120 }}
          placeholder="gender"
          defaultValue={filters.gender ? filters.gender : null}
          onChange={genderChange}>
          <Select.Option value="">all</Select.Option>
          <Select.Option value="female">female</Select.Option>
          <Select.Option value="male">male</Select.Option>
          <Select.Option value="genderless">genderless</Select.Option>
          <Select.Option value="unknown">unknown</Select.Option>
        </Select>
      </Space>

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
    </Space>
  );
};

export default Home;
