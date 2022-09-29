import React, { FC, useEffect, useRef } from 'react';
import { Col, Pagination, Row, Space } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import CharacterCart from '../components/CharacterCart';
import { Filters } from '../components/Filters';
import { useAppDispatch, useAppSelector } from '../hoocs/reduxHoocs';
import { fetchCharacters } from '../store/slises/CharacterSlise';
import { setFilters } from '../store/slises/FilterSlise';
import { CharacterCartSpiner } from '../components/CharacterCart/CharacterCartSpiner';
import qs from 'qs';

const Home: FC = () => {
  const disputch = useAppDispatch();
  const { count, characters, loading } = useAppSelector((state) => state.characters);
  const filters = useAppSelector((state) => state.filter);
  const navigate = useNavigate();
  const isSearch = useRef(false);
  const isMounted = useRef(false);

  console.log('home');

  useEffect(() => {
    if (window.location.search) {
      const params: any = qs.parse(window.location.search.substring(1));
      disputch(setFilters({ ...params, page: Number(params.page) }));
      isSearch.current = true;
    }
  }, []);

  useEffect(() => {
    if (!isSearch.current) {
      disputch(fetchCharacters(filters));
    }

    isSearch.current = false;
  }, [filters]);

  useEffect(() => {
    const queryString = qs.stringify({
      page: filters.page,
      status: filters.status,
      gender: filters.gender,
    });
    navigate(`?${queryString}`);

    isMounted.current = true;
  }, [filters]);

  const pageChange = (page: number) => {
    disputch(setFilters({ ...filters, page }));
  };

  return (
    <Space size={20} direction={'vertical'}>
      <div>
        <Row align="middle" justify="space-between">
          <Col>
            <Filters />
          </Col>
          <Col>
            <Link to={'bookmarks'}>
              <svg width={25} hanging={25} x="0px" y="0px" viewBox="0 0 512 512">
                <polygon
                  fill="#FFF"
                  points="422.619,49.475 89.381,49.475 89.381,499.346 256,416.037 422.619,499.346 "
                />
                <path
                  fill="#1D1D1B"
                  d="M81.561,0v512L256,424.781L430.439,512V0H81.561z M414.798,15.641v26.014H97.202V15.641H414.798z
	 M256,407.294L97.202,486.693V57.295h317.597v429.398L256,407.294z"
                />
              </svg>
            </Link>
          </Col>
        </Row>
      </div>

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
