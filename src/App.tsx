import Layout, { Content } from 'antd/lib/layout/layout';
import React, { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import Search from './components/Search';
import CharacterPage from './pages/CharacterPage';
import Home from './pages/Home';

const App: FC = () => {
  return (
    <Layout
      style={{ margin: '0 auto', maxWidth: '1400px', padding: '20px 50px', minHeight: '100vh' }}>
      <Search />
      <Content>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/character/:id" element={<CharacterPage />} />
        </Routes>
      </Content>
    </Layout>
  );
};

export default App;
