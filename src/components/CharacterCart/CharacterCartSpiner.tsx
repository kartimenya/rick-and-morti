import { Card, Col, Row, Spin } from 'antd';
import React from 'react';

export const CharacterCartSpiner = () => {
  return (
    <Card style={{ width: '300px' }}>
      <Row style={{ height: '364px' }} align="middle" justify="center">
        <Col>
          <Spin size="large" />
        </Col>
      </Row>
    </Card>
  );
};
