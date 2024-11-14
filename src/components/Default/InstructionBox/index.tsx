import React from 'react';
import { Container, Row, Col, Alert } from 'react-bootstrap';

interface PROPS {
  text: string | JSX.Element;
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark';
}

const InstructionBox = (props: PROPS) => {
  return (
    <Container className="my-4">
      <Row>
        <Col>
          <Alert variant={props.variant || 'info'}>{props.text}</Alert>
        </Col>
      </Row>
    </Container>
  );
};

export default InstructionBox;
