import React from 'react';
import ReactDOM from 'react-dom';
import GossipersApp from './App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<GossipersApp />, div);
  ReactDOM.unmountComponentAtNode(div);
});
