import React from 'react';
import { Product } from '../../models/product';

interface ProductListProps {
  products: Product[];
  filters: any;
  onDelete: (num: number) => void;
}

const ProductList: React.FC<ProductListProps> = ({ products, filters, onDelete }) => {

  const filteredProducts = products.filter(product => {
    const matchesNome = product.nome.toLowerCase().includes(filters.nome.toLowerCase());
    const matchesPreco = (!filters.precoMin || product.preco >= Number(filters.precoMin)) &&
                         (!filters.precoMax || product.preco <= Number(filters.precoMax));
    const matchesEstoque = (!filters.estoqueMin || product.estoque >= Number(filters.estoqueMin));
    
    return matchesNome && matchesPreco && matchesEstoque;
  })

  const sortedProducts = filteredProducts.sort((a, b) => {
    return filters.orderBy === 'asc' ? a.preco - b.preco : b.preco - a.preco;
  })

  return (
    <div className="overflow-y-auto max-h-[300px]"> 
    
      <table className="table-auto w-full border border-gray-300">
        <thead className="bg-accent-content text-white sticky top-0"> 
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
            <tr key={product.num} className="hover:bg-gray-100 transition-colors">
              <td className="py-2 px-4 border-b">{product.nome}</td>
              <td className="py-2 px-4 border-b">{product.descricao}</td>
              <td className="py-2 px-4 border-b">R${product.preco.toFixed(2)}</td>
              <td className="py-2 px-4 border-b">{product.estoque}</td>
              <td className="py-2 px-4 border-b">{product.idSubcategoria}</td>
              <td className="py-2 px-4 border-b">
                <button className="btn btn-edit mx-2">Editar</button>
                <button 
                  onClick={() => onDelete(product.num)} 
                  className="btn btn-delete"
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;
