import React from 'react';
import {
  FaExclamationTriangle,
  FaEllipsisV,
  FaEdit,
  FaTrash,
} from 'react-icons/fa';
import { Client } from '../../models/client';

interface Props {
  clients: Client[];
  onEdit: (client: Client) => void;
  onDeleteConfirm: (client: Client) => void;
}

const CategoriesList: React.FC<Props> = ({
  clients,
  onEdit,
  onDeleteConfirm,
}) => {
 
  return (
    <div className="overflow-y-auto max-h-[300px]">
      {!clients.length ? (
        <div className="flex flex-col items-center justify-center h-full p-4">
          <FaExclamationTriangle className="text-4xl text-gray-500 mb-4" />
          <p className="text-lg text-gray-500">Nenhum cliente encontrado</p>
        </div>
      ) : (
        <table className="table-auto w-full border border-gray-300">
          <thead className="bg-gray-900 text-gray-300 sticky top-0 z-50"> 
            <tr>
              <th className="py-2 px-4">Nome</th>
              <th className="py-2 px-4">Sobrenome</th>
              <th className="py-2 px-4">CPF</th>
              <th className="py-2 px-4">Email</th>
              <th className="py-2 px-4">Ação</th>
            </tr>
          </thead>

          <tbody>
            {clients.map((item: Client) => (
              <tr className="hover:bg-gray-100 transition-colors" >
                <td className="py-2 px-4 border-b text-center">{item.nome}</td>
                <td className="py-2 px-4 border-b text-center">{item.sobrenome}</td>
                <td className="py-2 px-4 border-b text-center">{item.cpf}</td>
                <td className="py-2 px-4 border-b text-center">{item.email}</td>
                {/* Aqui é a acao? */}
                <td className="py-2 px-4 border-b flex justify-center">
                  <div className="dropdown dropdown-left">
                    <label tabIndex={0} className="btn btn-sm m-1">
                      <FaEllipsisV />
                    </label>
                    <ul
                      tabIndex={0}
                      className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 " 
                    >
                      <li>
                        <button
                          className="flex items-center"
                          onClick={() => onEdit(item)}
                        >
                          <FaEdit className="mr-2" /> Editar
                        </button>
                      </li>
                      <li>
                        <button
                          className="flex items-center"
                          onClick={() => onDeleteConfirm(item)}
                        >
                          <FaTrash className="mr-2" /> Excluir
                        </button>
                      </li>
                    </ul>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CategoriesList;
