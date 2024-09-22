import React from 'react';
import SubcategorySelect from '../../components/subcategory-select';

interface Props {
  onAddProduct: (product: any) => void;
  onClose: () => void;
  newProduct: any;
  setNewProduct: React.Dispatch<React.SetStateAction<any>>;
}

const ProductFormModal: React.FC<Props> = ({ onAddProduct, onClose, newProduct, setNewProduct }) => {

  const handleSubcategorySelect = (idSubcategoria: number) => {
    setNewProduct({ ...newProduct, idSubcategoria });
  };

  return (
    <div className="modal modal-open">
      <div className="modal-box w-full max-w-4xl"> {/* Modal maior */}
        <h3 className="text-2xl font-semibold mb-4">Adicionar Produto</h3>

        <div className="grid grid-cols-2 gap-4">

          <div className="form-control">
            <label className="label">
              <span className="label-text">Nome do Produto</span>
            </label>
            <input
              type="text"
              placeholder="Nome do Produto"
              value={newProduct.nome}
              onChange={(event) => setNewProduct({ ...newProduct, nome: event.target.value })}
              className="input input-bordered w-full"
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Preço</span>
            </label>
            <input
              type="number"
              placeholder="Preço"
              value={newProduct.preco}
              onChange={(event) => setNewProduct({ ...newProduct, preco: Number(event.target.value) })}
              className="input input-bordered w-full"
            />
          </div>

          <div className="form-control col-span-2"> 
            <label className="label">
              <span className="label-text">Descrição</span>
            </label>
            <input
              type="text"
              placeholder="Descrição"
              value={newProduct.descricao}
              onChange={(event) => setNewProduct({ ...newProduct, descricao: event.target.value })}
              className="input input-bordered w-full"
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Estoque</span>
            </label>
            <input
              type="number"
              placeholder="Estoque"
              value={newProduct.estoque}
              onChange={(event) => setNewProduct({ ...newProduct, estoque: Number(event.target.value) })}
              className="input input-bordered w-full"
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Subcategoria</span>
            </label>
            <SubcategorySelect onSelectSubcategory={handleSubcategorySelect} />
          </div>

        </div>

        <div className="modal-action mt-4">
          <button onClick={() => onAddProduct(newProduct)} className="btn btn-primary">
            Adicionar
          </button>
          <button onClick={onClose} className="btn">
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductFormModal;
