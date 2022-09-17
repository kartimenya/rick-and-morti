import { Avatar, Input, List } from 'antd';
import axios from 'axios';
import React, { ChangeEvent, FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDebounce } from '../hoocs/useDebounce';
import { ICharacter, ServerResponse } from '../models/models';

const Search: FC = () => {
  const [value, setValue] = useState('');
  const [find, setFind] = useState<ICharacter[]>([]);
  const [dropdown, setDropdown] = useState<boolean>(false);
  const debounced = useDebounce(value);
  const history = useNavigate();

  const itemClick = (id: number) => {
    setDropdown(false);
    setValue('');
    history(`character/${id}`);
  };

  useEffect(() => {
    const searchCharacter = async () => {
      const { data } = await axios.get<ServerResponse<ICharacter>>(
        `https://rickandmortyapi.com/api/character/?name=${debounced}`,
      );
      setFind(data.results);
      setDropdown(true);
    };

    if (debounced.length > 1) {
      searchCharacter();
    } else {
      setDropdown(false);
    }
  }, [debounced]);

  return (
    <div style={{ position: 'relative', marginBottom: '20px' }}>
      <Input
        value={value}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setValue(e.currentTarget.value)}
        placeholder="Search..."
      />
      {dropdown && (
        <List
          style={{
            maxHeight: '500px',
            overflowX: 'scroll',
            position: 'absolute',
            zIndex: 10,
            width: '100%',
            background: '#fff',
            paddingLeft: '20px',
          }}
          dataSource={find}
          renderItem={(item) => (
            <List.Item key={item.id} onClick={() => itemClick(item.id)}>
              <List.Item.Meta
                style={{ alignItems: 'center', cursor: 'pointer' }}
                avatar={<Avatar src={item.image} />}
                title={item.name}
                description={item.gender}
              />
            </List.Item>
          )}
        />
      )}
    </div>
  );
};

export default Search;
