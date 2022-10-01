import React, { FC, memo } from 'react';
import { Select, Space } from 'antd';
import { useAppDispatch, useAppSelector } from '../hoocs/reduxHoocs';
import { setFilters } from '../store/slises/FilterSlise';

export const Filters: FC = memo(() => {
  const disputch = useAppDispatch();
  const filters = useAppSelector((state) => state.filter);

  const genderChange = (gender: string) => {
    disputch(setFilters({ ...filters, gender, page: 1 }));
  };

  const statusChange = (status: string) => {
    disputch(setFilters({ ...filters, status, page: 1 }));
  };

  return (
    <Space size={20}>
      <Select
        style={{ width: 120 }}
        placeholder={filters.status ? filters.status : 'status'}
        onChange={statusChange}>
        <Select.Option value="">All</Select.Option>
        <Select.Option value="alive">Alive</Select.Option>
        <Select.Option value="dead">Dead</Select.Option>
        <Select.Option value="unknown">Unknown</Select.Option>
      </Select>
      <Select
        style={{ width: 120 }}
        placeholder={filters.gender ? filters.gender : 'gender'}
        onChange={genderChange}>
        <Select.Option value="">all</Select.Option>
        <Select.Option value="female">female</Select.Option>
        <Select.Option value="male">male</Select.Option>
        <Select.Option value="genderless">genderless</Select.Option>
        <Select.Option value="unknown">unknown</Select.Option>
      </Select>
    </Space>
  );
});
