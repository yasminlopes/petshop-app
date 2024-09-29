import React from 'react';
import { FaExclamationTriangle, FaEllipsisV, FaEdit, FaTrash } from 'react-icons/fa';
import { Product } from '../../models/product';

interface ProductListProps {
  products: Product[];
  filters: any;
  onEdit: (product: Product) => void;
  onDeleteConfirm: (product: Product) => void;
}

const ProductList: React.FC<ProductListProps> = ({ products, filters, onEdit, onDeleteConfirm }) => {
  
  const filteredProducts = products.filter(product => {
    if (!product || !product.nome)  return false
    
    const matchesNome = product.nome.toLowerCase().includes(filters.nome.toLowerCase());
    const matchesPreco = (!filters.precoMin || product.preco >= Number(filters.precoMin)) &&
                         (!filters.precoMax || product.preco <= Number(filters.precoMax));
    const matchesEstoque = (!filters.estoqueMin || product.estoque >= Number(filters.estoqueMin));
  
    return matchesNome && matchesPreco && matchesEstoque;
  });
  

  const sortedProducts = filteredProducts.sort((a, b) => {
    return filters.orderBy === 'asc' ? a.preco - b.preco : b.preco - a.preco;
  })

  return (
    <div className="overflow-y-auto max-h-[300px]">
      {sortedProducts.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-full p-4">
          <FaExclamationTriangle className="text-4xl text-gray-500 mb-4" />
          <p className="text-lg text-gray-500">Nenhum produto encontrado</p>
        </div>
      ) : (
      <table className="table-auto w-full border border-gray-300">
        <thead className="bg-gray-900 text-gray-300 sticky top-0 z-50"> 
          <tr>
            <th className="py-2 px-4">Produto</th>
            <th className="py-2 px-4">Descrição</th>
            <th className="py-2 px-4">Preço</th>
            <th className="py-2 px-4">Estoque</th>
            <th className="py-2 px-4">Subcategoria</th>
            <th className="py-2 px-4">Ações</th>
          </tr>
        </thead>

        <tbody>
          {sortedProducts.map(product => (
            <tr key={product?.num} className="hover:bg-gray-100 transition-colors">
              <td className="py-2 px-4 border-b">{product?.nome}</td>
              <td className="py-2 px-4 border-b">{product?.descricao}</td>
              <td className="py-2 px-4 border-b">R${product?.preco.toFixed(2)}</td>
              <td className="py-2 px-4 border-b">{product?.estoque}</td>
              <td className="py-2 px-4 border-b">{product?.idSubcategoria}</td>
              <td className="py-2 px-4 border-b">
                <div className="dropdown dropdown-left">
                  <label tabIndex={0} className="btn btn-sm m-1">
                    <FaEllipsisV />
                  </label>
                  <ul
                      tabIndex={0}
                      className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 " 
                    >
                    <li>
                      <button className="flex items-center" onClick={() => onEdit(product)}>
                        <FaEdit className="mr-2" /> Editar
                      </button>
                    </li>
                    <li>
                      <button 
                        className="flex items-center"
                        onClick={() => onDeleteConfirm(product)}
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

export default ProductList;
