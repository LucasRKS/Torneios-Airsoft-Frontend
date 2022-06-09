/* eslint-disable import/extensions */
import React, {
  useRef, useCallback, useEffect,
} from 'react';
import { Form } from '@unform/web';
import { useNavigate } from 'react-router-dom';
import { FormHandles, SubmitHandler } from '@unform/core';
import * as Yup from 'yup';
import { useAuth } from '../../hooks/auth';
import api from '../../services/api';

import Input from '../../components/Input';
import InputMask from '../../components/InputMask';

import { Container } from './styles';

interface SignUpFormData {
  email: string;
  password: string;
  password2: string;
  cpf: string;
  name: string;
}

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const navigate = useNavigate();
  const { user, signIn } = useAuth();

  useEffect(() => {
    if (user) {
      navigate('/ranking');
    }
  });

  const handleSubmit: SubmitHandler<any> = async (data: SignUpFormData) => {
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        email: Yup.string().required('O e-mail é obrigatório'),
        password: Yup.string().required('A senha é obrigatória'),
        password2: Yup.string().required('A senha é obrigatória'),
        cpf: Yup.string().required('O cpf é obrigatório'),
        name: Yup.string().required('O nome é obrigatório'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      if (data.password !== data.password2) {
        formRef.current?.setFieldError('password2', 'As senhas não conferem');
        return;
      }

      await api.post('/users', {
        email: data.email,
        password: data.password,
        name: data.name,
        cpf: data.cpf,
      });

      await signIn({
        email: data.email,
        password: data.password,
      });

      navigate('/ranking');
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        err.inner.forEach((error) => {
          if (error.path) {
            formRef.current?.setFieldError(error.path, error.message);
          }
        });
      }
    }
  };

  return (
    <section>
      <div className="container-fluid h-custom mt-3">
        <Container>
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-md-9 col-lg-6 col-xl-5">
              <img
                src="https://arenatk.com.br/wp-content/uploads/2022/03/cropped-output-onlinepngtools-1.png"
                className="img-fluid"
                alt=""
              />
            </div>
            <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
              <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
                <div className="form-outline mb-4">
                  <Form ref={formRef} onSubmit={handleSubmit}>
                    <div className="form-outline mb-3">
                      <InputMask
                        name="cpf"
                        className="form-control form-control-lg"
                        placeholder="Informe seu cpf"
                        mask="999.999.999-99"
                        label="CPF"
                      />
                    </div>
                    <div className="form-outline mb-3">
                      <Input
                        type="text"
                        name="name"
                        className="form-control form-control-lg"
                        placeholder="Informe seu nome"
                        label="Nome"
                      />
                    </div>
                    <div className="form-outline mb-3">
                      <Input
                        type="email"
                        name="email"
                        className="form-control form-control-lg"
                        placeholder="Informe seu E-mail"
                        label="E-mail"
                      />
                    </div>
                    <div className="form-outline mb-3">
                      <Input
                        type="password"
                        name="password"
                        className="form-control form-control-lg"
                        placeholder="Informe sua senha"
                        label="Senha"
                      />
                    </div>
                    <div className="form-outline mb-3">
                      <Input
                        type="password"
                        name="password2"
                        className="form-control form-control-lg"
                        placeholder="Confirme sua senha"
                        label="Confirme sua senha"
                      />
                    </div>
                    <div className="text-center text-lg-start mt-4 pt-2">
                      <button type="submit" className="btn btn-primary btn-lg">Cadastrar</button>
                    </div>
                  </Form>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
};

export default SignIn;
