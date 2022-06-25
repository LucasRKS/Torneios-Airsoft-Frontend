/* eslint-disable no-lone-blocks */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable array-callback-return */
import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import ReactSelect from 'react-select';
import { useAuth } from '../../hooks/auth';
import api from '../../services/api';

import { Container } from './styles';

const ExcluirUnico: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [loadingTime, setLoadingTime] = useState(false);
  const [selectedUser, setSelectedUser] = useState('');
  const [options, setOptions] = useState([]);
  const [times, setTimes] = useState([]);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    setLoading(true);

    if (!user.admin) {
      navigate('/');
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

    getUsers();
  }, []);

  const handleSelectChange = (e:any):any => {
    setSelectedUser(e.value);
  };

  const handleSearch = async () => {
    setLoadingTime(true);

    const { data }:any = await api.get(`/times/user-times?user_id=${selectedUser}`);

    setTimes(data);
    setLoadingTime(false);
  };

  const handleTimeExclude = async (id: number) => {
    setLoadingTime(true);

    await api.get(`/times/delete-time?id=${id}`);

    const { data }:any = await api.get(`/times/user-times?user_id=${selectedUser}`);

    setTimes(data);
    setLoadingTime(false);
  };

  return (
    <div className="container-fluid">
      <Container>
        <div className="row">
          <div className="col col-12">
            <h1>Arena TK - Ranking torneios de precisão (EXCLUIR REGISTRO)</h1>
          </div>
        </div>
        <div className="row">
          <div className="col col-12">
            <Link to="/">Voltar ao ranking</Link>
          </div>
        </div>
        {!loading && (
          <>
            <div className="mb-3 py-3">
              <label htmlFor="user">Usuário</label>
              <ReactSelect
                name="user"
                id="user"
                className="form-control form-control-lg"
                options={options}
                onChange={handleSelectChange}
              />
            </div>
            <button type="button" className="btn btn-success" onClick={handleSearch}>Buscar registros</button>
          </>
        )}
        {!loadingTime && (
        <div className="row">
          {times.map((time : any) => (<div className="col-12 py-1">{time.time} <button type="button" className="btn btn-danger btn-time" onClick={() => handleTimeExclude(time.id)}>Excluir</button></div>))}
        </div>
        )}
      </Container>
    </div>
  );
};

export default ExcluirUnico;
