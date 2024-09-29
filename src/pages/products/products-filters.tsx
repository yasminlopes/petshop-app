import React, { useState } from 'react';

interface FiltersProps {
  filters: any;
  setFilters: React.Dispatch<React.SetStateAction<any>>
}

const ProductsFilters: React.FC<FiltersProps> = ({ filters, setFilters }) => {

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleOrderChange = (order: 'asc' | 'desc') => {
    setFilters({ ...filters, orderBy: order })

    setIsDropdownOpen(false);
  }

  return (
    <div className="mb-4 flex flex-col gap-4">

      <h2 className="text-2xl font-semibold">Filtros</h2>

      <div className="flex items-center gap-4">
        <input
          type="text"
          placeholder="Pesquisar Produto"
          value={filters.nome}
          onChange={(event) => setFilters({ ...filters, nome: event.target.value })}
          className="input input-bordered flex-grow"
        />

        <div className="relative">
          <button
            className="btn bg-gray-900 text-gray-300 dropdown-toggle flex items-center"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <span className="mr-2">
              {filters.orderBy === 'asc' ? '🔼 Menor Preço' : '🔽 Maior Preço'}
            </span>
            
          </button>

          {isDropdownOpen && (
            <div className="absolute bg-white border border-gray-300 rounded shadow-md mt-1 z-10">
              <label className="block px-4 py-2 cursor-pointer hover:bg-gray-100">
                <input
                  type="radio"
                  name="order"
                  checked={filters.orderBy === 'asc'}
                  onChange={() => handleOrderChange('asc')}
                  className="mr-2"
                />
                Menor Preço
              </label>

              <label className="block px-4 py-2 cursor-pointer hover:bg-gray-100">
                <input
                  type="radio"
                  name="order"
                  checked={filters.orderBy === 'desc'}
                  onChange={() => handleOrderChange('desc')}
                  className="mr-2"
                />
                Maior Preço
              </label>
            </div>
          )}
          
        </div>
      </div>
    </div>
  );
};

export default ProductsFilters;
