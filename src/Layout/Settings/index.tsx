'use client';

import React, { memo } from 'react';
import { Container } from 'react-bootstrap';

type PROPS = {
  children: React.ReactNode;
};

function Index(props: PROPS) {
  return <Container fluid>{props?.children}</Container>;
}

export default memo(Index);
