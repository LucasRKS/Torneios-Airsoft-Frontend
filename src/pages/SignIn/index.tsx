import React, { useRef } from 'react';
import { Form } from '@unform/web';
import { FormHandles, SubmitHandler } from '@unform/core';

import Input from '../../components/Input';

import { Container } from './styles';

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const handleSubmit: SubmitHandler<any> = (data:any) => {
    console.log('bananas');
  };

  return (
    <div className="container-fluid" id="main-container">
      <Container>
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-12">
              <h1>Olá mundo</h1>
            </div>
          </div>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-12 col-md-12">
                <Input name="name" placeholder="Insira seu nome" />
              </div>
            </div>
            <button type="submit">banana</button>
          </Form>
        </div>
      </Container>
    </div>
  );
};

export default SignIn;
