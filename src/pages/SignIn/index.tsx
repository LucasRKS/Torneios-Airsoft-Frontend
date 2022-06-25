import React, {
  useRef, useCallback, useEffect,
} from 'react';
import { Form } from '@unform/web';
import { Link, useNavigate } from 'react-router-dom';
import { FormHandles, SubmitHandler } from '@unform/core';
import * as Yup from 'yup';
import { useAuth } from '../../hooks/auth';

import Input from '../../components/Input';

import { Container } from './styles';

interface SignInFormData {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const navigate = useNavigate();
  const { user, signIn } = useAuth();

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  });

  const handleSubmit: SubmitHandler<any> = useCallback(
    async (data: SignInFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          email: Yup.string().required('O e-mail é obrigatório'),
          password: Yup.string().required('A senha é obrigatória'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await signIn({
          email: data.email,
          password: data.password,
        });

        navigate('/');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          err.inner.forEach((error) => {
            if (error.path) {
              formRef.current?.setFieldError(error.path, error.message);
            }
          });
        }
      }
    },
    [signIn, navigate],
  );

  return (
    <section>
      <div className="container-fluid">
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
                    <div className="text-center text-lg-start mt-4 pt-2">
                      <button type="submit" className="btn btn-primary btn-lg">Entrar</button>
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
