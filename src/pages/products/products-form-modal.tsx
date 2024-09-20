import React from 'react';

interface ProductFormModalProps {
  onAddProduct: (product: any) => void;
  onClose: () => void;
  newProduct: any;
  setNewProduct: React.Dispatch<React.SetStateAction<any>>
}

const ProductFormModal: React.FC<ProductFormModalProps> = ({ onAddProduct, onClose, newProduct, setNewProduct }) => {
  return (
    <div className="modal modal-open">
      <div className="modal-box">
        <h3 className="text-xl font-semibold">Adicionar Produto</h3>
        <input
          type="text"
          placeholder="Nome do Produto"
          value={newProduct.nome}
          onChange={(event) => setNewProduct({ ...newProduct, nome: event.target.value })}
          className="input input-bordered w-full my-2"
        />

        <input
          type="number"
          placeholder="Preço"
          value={newProduct.preco}
          onChange={(event) => setNewProduct({ ...newProduct, preco: Number(event.target.value) })}
          className="input input-bordered w-full my-2"
        />

        <input
          type="text"
          placeholder="Descrição"
          value={newProduct.descricao}
          onChange={(event) => setNewProduct({ ...newProduct, descricao: event.target.value })}
          className="input input-bordered w-full my-2"
        />

        <input
          type="number"
          placeholder="Estoque"
          value={newProduct.estoque}
          onChange={(event) => setNewProduct({ ...newProduct, estoque: Number(event.target.value) })}
          className="input input-bordered w-full my-2"
        />

        <input
          type="number"
          placeholder="ID da Subcategoria"
          value={newProduct.id_subcategoria}
          onChange={(event) => setNewProduct({ ...newProduct, id_subcategoria: Number(event.target.value) })}
          className="input input-bordered w-full my-2"
        />

        <div className="modal-action">
          <button onClick={() => onAddProduct(newProduct)} className="btn btn-primary">Adicionar</button>
          <button onClick={onClose} className="btn">Cancelar</button>
        </div>

      </div>
    </div>
  );
};

export default ProductFormModal;
