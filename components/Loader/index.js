import React from 'react';
import { Icon } from 'antd';

import Flex from '../Flex';

const LoadingScreen = () => (
  <Flex justifyContent="center" alignItems="center" css={{ height: '100vh', fontSize: '3.2rem' }}>
    <Icon type="loading" />
  </Flex>
);

export default LoadingScreen;
