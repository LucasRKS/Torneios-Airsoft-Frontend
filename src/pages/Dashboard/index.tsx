import React, {
  useRef, useEffect, useState,
} from 'react';
import { Form } from '@unform/web';
import { useNavigate, Link } from 'react-router-dom';
import { FormHandles, SubmitHandler } from '@unform/core';
import * as Yup from 'yup';
import { DataGrid } from '@mui/x-data-grid';
import Modal from 'react-modal';
import ReactSelect from 'react-select';
import { useAuth } from '../../hooks/auth';
import api from '../../services/api';

import { Container } from './styles';

import InputMask from '../../components/InputMask';

const Dashboard: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isOpenConfirm, setIsOpenConfirm] = useState(false);
  const [selectedUser, setSelectedUser] = useState('');
  const [options, setOptions] = useState([]);
  const [tableData, setTableData] = useState([{ id: 1, name: null, time: null }]);
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  useEffect(() => {
    setLoading(true);

    async function getDashboard():Promise<any> {
      const { data }:any = await api.get('/times/dashboard');
      const newData : any = [];
      const newDataOptions : any = [];
      data.forEach((u : any) => {
        u.id = u.user_id;
        newData.push(u);
        const selectObject = { value: u.user_id, label: u.name };
        newDataOptions.push(selectObject);
      });
      setTableData(newData);
      setOptions(newDataOptions);
    }

    async function getUsers():Promise<any> {
      const { data }:any = await api.get('/users');
      const newDataOptions : any = [];
      data.forEach((u : any) => {
        const selectObject = { value: u.id, label: `${u.cpf} - ${u.name}` };
        newDataOptions.push(selectObject);
      });
      setOptions(newDataOptions);
      setLoading(false);
    }

    getDashboard();
    getUsers();
  }, []);

  const handleSubmit: SubmitHandler<any> = async (data:any) => {
    try {
      formRef.current?.setErrors({});

      const submitData = { user_id: selectedUser, time: data.time };

      await api.post('/times', submitData);

      navigate(0);
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

  const handleClearTable:any = async () => {
    await api.get('/times/clear');

    navigate(0);
  };

  const handleSelectChange = (e:any):any => {
    setSelectedUser(e.value);
  };

  const openModal = () : any => {
    setIsOpen(true);
  };
  const closeModal = () : any => {
    setIsOpen(false);
  };
  const openModalConfirm = () : any => {
    setIsOpenConfirm(true);
  };
  const closeModalConfirm = () : any => {
    setIsOpenConfirm(false);
  };

  const handleSignOut = (): any => {
    signOut();
    navigate('/');
  };

  const columns = [
    { field: 'name', headerName: 'Nome', width: 200 },
    { field: 'time', headerName: 'Tempo', width: 200 },
  ];

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };

  return (
    <div className="container-fluid">
      <Container>
        <div className="row">
          <div className="col col-12">
            <h1>Arena TK - Ranking torneios de precisão</h1>
          </div>
        </div>
        {!user && (
          <div className="row">
            <div className="col-12">
              Participando do torneio? <Link to="/cadastro" className="crie-conta">crie uma conta aqui.</Link>
            </div>
          </div>
        )}
        {user && user.admin && !loading && (
          <div className="row">
            <div className="col col-md-9 col-sm-12">
              <p>Olá, <b>{user.name}</b><button type="button" className="btn txt-danger" onClick={handleSignOut}> | Sair</button></p>
            </div>
            <div className="col-12 py-1">
              <button type="button" className="btn btn-tk" onClick={openModal}>Criar registro</button>
            </div>
            <div className="col-12 py-1">
              <button type="button" className="btn btn-danger" onClick={openModalConfirm}>Limpar registros</button>
            </div>
            <div className="col-12 py-1">
              <Link to="/excluir-unico" className="btn btn-danger">Limpar registro único</Link>
            </div>
          </div>
        )}
        <div className="row mt-3">
          <div className="col col-12">
            <div style={{ height: 500, width: '100%' }}>
              <DataGrid columns={columns} rows={tableData} />
            </div>
          </div>
        </div>
        {user && user.admin && !loading && (
          <div className="row py-2">
            <div className="col col-md-3 col-sm-12">
              <Link to="/painel-admin" className="btn btn-info">Painel - aprovar admins</Link>
            </div>
          </div>
        )}
        {!user && (
          <div className="row py-3">
            <div className="col-12">
              Administrador do torneio? <Link to="/login" className="crie-conta">entre aqui.</Link>
            </div>
          </div>
        )}
      </Container>
      {user && user.admin && (
        <>
          <Modal
            isOpen={isOpen}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Registrar"
          >
            <Form ref={formRef} onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="user">Usuário</label>
                <ReactSelect
                  name="user"
                  id="user"
                  className="form-control form-control-lg"
                  options={options}
                  onChange={handleSelectChange}
                />
              </div>
              <div className="form-outline mb-3">
                <InputMask
                  mask="99:99:99"
                  name="time"
                  label="Tempo"
                  className="form-control form-control-lg"
                />
              </div>
              <button type="submit" className="btn btn-success">Registrar</button>
            </Form>
          </Modal>

          <Modal
            isOpen={isOpenConfirm}
            onRequestClose={closeModalConfirm}
            style={customStyles}
            contentLabel="Excluir"
          >
            <b>Limpar registros</b>
            <br />
            <br />
            <button type="button" className="btn btn-danger" onClick={handleClearTable}>Tem certeza que deseja limpar os registros?</button>
          </Modal>
        </>
      )}
    </div>
  );
};

export default Dashboard;
