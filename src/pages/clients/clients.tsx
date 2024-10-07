import React, { useCallback, useEffect, useMemo, useState } from 'react';
import ClientsList from './clients-list';
import ClientsFilters from './clients-filters';
import { destroy, fetcher, post, put } from '../../utils/axios';
import { toast } from 'react-toastify';
import ClientsFormModal from './clients-form-modal';

const Clients: React.FC = () => {
    const [filters, setFilters] = useState<{ [key: string]: string }>({});
  const [listagem, setListagem] = useState<any[]>([]);
  const [showFormModal, setShowFormModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedClients, setSelectedClients] = useState<any>(null);
  const [newClients, setNewClients] = useState({ nome: '' });

  const handleListClients = useCallback(async () => {
    try {
      const data = await fetcher('/api/clientes');
      setListagem(data);
    } catch (error) {
      console.error('Erro ao buscar clientes', error);
    }
  }, []);

  const filteredClients = useMemo(() => {
    return listagem.filter(client => {
      return Object.entries(filters).every(([key, value]) => 
        client[key].toString().toLowerCase().includes(value.toLowerCase())
      );
    });
  }, [listagem, filters]);

  const handleEdit = (item: any) => {
    setSelectedClients(item);
    fetchClientsById(item.cpf);
  };

  const handleDeleteConfirm = (client: any) => {
    setSelectedClients(client);
    setShowDeleteModal(true);
  };

  const fetchClientsById = async (id: number) => {
    try {
      const data = await fetcher(`/api/cliente/${id}`);
      setNewClients({ nome: data?.nome });
      setShowFormModal(true);
    } catch (error) {
      console.error('Erro ao buscar cliente:', error);
    }
  };

    const handleAddClients = async (client: any) => {
        try {
            const response = await post('/api/criar-cliente', client);
            setNewClients(response.data);
            setShowFormModal(false);
            toast.success('Cliente cadastrado com sucesso!');
            handleListClients();
        } catch (error) {
            toast.error('Erro ao cadastrar o cliente');
        }
    };

    const handleUpdateClients = async (client: any) => {
        try {
            const response = await post(`/api/update-cliente`, {
              nome: client.nome,
              cpf: selectedClients.cpf
            });
            setNewClients(response.data);
            setShowFormModal(false);
            toast.success('Cliente atualizada com sucesso!');
      handleListClients();
    } catch (error) {
      toast.error('Erro ao atualizar a cliente');
    }
  };

  const handleDeleteClients = async () => {
    try {
      await destroy(`/api/delete-cliente/${selectedClients.cpf}`);
      setListagem(listagem.filter(subclient => subclient.cpf !== selectedClients.cpf));
      setShowDeleteModal(false);
      toast.success('Cliente excluído com sucesso!');
    } catch (error) {
      toast.error('Erro ao excluir cliente');
    }
  };

  useEffect(() => {
    handleListClients();
  }, [handleListClients]);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-4xl font-bold">Clientes</h1>
        <button onClick={() => {
          setSelectedClients(null);
          setNewClients({ nome: '' });
          setShowFormModal(true);
        }} className="btn bg-gray-900 text-gray-300">
          Cadastrar
        </button>
      </div>

      <ClientsFilters filters={filters} setFilters={setFilters} />

      <ClientsList
        clients={filteredClients}
        onEdit={handleEdit}
        onDeleteConfirm = {handleDeleteConfirm}
      />

      {showFormModal && (
        <ClientsFormModal
          onAdd={handleAddClients}
          onUpdate={handleUpdateClients}
          onClose={() => setShowFormModal(false)}
          newClient={newClients}
          setNewClient={setNewClients}
          isEditing={!!selectedClients}
        />
      )}

      {showDeleteModal && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Confirmar Exclusão</h3>
            <p className="py-4">Tem certeza que deseja excluir o cliente"{selectedClients?.nome}"?</p>
            <div className="modal-action">
              <button onClick={handleDeleteClients} className="btn btn-error">Excluir</button>
              <button onClick={() => setShowDeleteModal(false)} className="btn">Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Clients;
