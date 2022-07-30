import { Card } from 'antd';
import Meta from 'antd/lib/card/Meta';
import React, { FC } from 'react';
import { ICharacter } from '../../models/models';

const CharacterCart: FC<ICharacter> = ({ name, image }) => {
  return (
    <Card style={{ width: '300px' }} hoverable cover={<img alt="" src={image} />}>
      <Meta title={name} />
    </Card>
  );
};

export default CharacterCart;
