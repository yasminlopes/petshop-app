import React from 'react';

interface Props {
  filters: any;
  setFilters: React.Dispatch<React.SetStateAction<any>>
}

const ClienteFilters: React.FC<Props> = ({ filters, setFilters }) => {

  return (
    <div className="mb-4 flex flex-col gap-4">

      <div className="flex items-center gap-4">
        <input
          type="text"
          placeholder="Pesquisar"
          value={filters.nome}
          onChange={(event) => setFilters({ ...filters, nome: event.target.value })}
          className="input input-bordered flex-grow"
        />

      </div>
    </div>
  );
};

export default ClienteFilters;
