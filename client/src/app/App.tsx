import React from 'react';
import logo from './logo.svg';
import './App.css';
import { ConfigProvider } from 'antd';

function App() {
  return (
    <ConfigProvider theme={{ token: { colorPrimary: '#EC6717', borderRadius: 2 } }}>
      <div className="App">test</div>
    </ConfigProvider>
  );
}

export default App;
