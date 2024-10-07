import React from 'react';

interface Props {
  onAdd: (item: any) => void;
  onUpdate: (item: any) => void;
  onClose: () => void;
  newClient: any;
  setNewClient: React.Dispatch<React.SetStateAction<any>>;
  isEditing: boolean; 
}

const ClientFormModal: React.FC<Props> = ({ onAdd, onUpdate, onClose, newClient, setNewClient, isEditing }) => {

  const handleSubmit = () => {
    if (isEditing) {
      onUpdate(newClient); 
    } else {
      onAdd(newClient); 
    }
  }
  

  return (
    <div className="modal modal-open">
      <div className="modal-box w-full "> 
        <h3 className="text-2xl font-semibold mb-4">
          {isEditing ? 'Editar Cliente' : 'Cadastrar Cliente'}
        </h3>

        <div className="grid grid-cols-2 gap-4">

          <div className="form-control">
            <label className="label">
              <span className="label-text">Nome</span>
            </label>
            <input
              type="text"
              placeholder="Nome do Cliente"
              value={newClient.nome}
              onChange={(event) => setNewClient({ ...newClient, nome: event.target.value })}
              className="input input-bordered w-full"
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Sobrenome</span>
            </label>
            <input
              type="text"
              placeholder="Sobrenome"
              value={newClient.sobrenome}
              onChange={(event) => setNewClient({ ...newClient, sobrenome: event.target.value })}
              className="input input-bordered w-full"
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">CPF</span>
            </label>
            <input
              type="text"
              placeholder="CPF"
              value={newClient.cpf}
              onChange={(event) => setNewClient({ ...newClient, cpf: event.target.value })}
              className="input input-bordered w-full"
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="text"
              placeholder="Email"
              value={newClient.email}
              onChange={(event) => setNewClient({ ...newClient, email: event.target.value })}
              className="input input-bordered w-full"
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Sexo</span>
            </label>
            <select
              value={newClient.sexo}
              onChange={(event) =>
                setNewClient({ ...newClient, sexo: event.target.value })
              }
              className="input input-bordered w-full"
            >
              <option value="">Selecione o sexo</option>
              <option value="M">Masculino</option>
              <option value="F">Feminino</option>
            </select>
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Senha</span>
            </label>
            <input
              type="text"
              placeholder="Senha"
              value={newClient.senha}
              onChange={(event) => setNewClient({ ...newClient, senha: event.target.value })}
              className="input input-bordered w-full"
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Data de Nascimento</span>
            </label>
            <input
              type="date"
              placeholder="Data de nascimento"
              value={newClient.dataNascimento}
              onChange={(event) =>
                setNewClient({ ...newClient, dataNascimento: event.target.value })
              }
              className="input input-bordered w-full"
            />
          </div>


        </div>

        <div className="modal-action mt-4">
          <button onClick={handleSubmit} className="btn bg-gray-900 text-gray-300">
            {isEditing ? 'Atualizar' : 'Cadastrar'}
          </button>
          <button onClick={onClose} className="btn">Cancelar</button>
        </div>
      </div>
    </div>
  );
};

export default ClientFormModal;
