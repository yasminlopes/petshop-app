import React from 'react';

interface Props {
  onAdd: (item: any) => void;
  onUpdate: (item: any) => void;
  onClose: () => void;
  newCategory: any;
  setNewCategory: React.Dispatch<React.SetStateAction<any>>;
  isEditing: boolean; 
}

const CategoryFormModal: React.FC<Props> = ({ onAdd, onUpdate, onClose, newCategory, setNewCategory, isEditing }) => {

  const handleSubmit = () => {
    if (isEditing) {
      onUpdate(newCategory); 
    } else {
      onAdd(newCategory); 
    }
  }

  return (
    <div className="modal modal-open">
      <div className="modal-box w-full "> 
        <h3 className="text-2xl font-semibold mb-4">
          {isEditing ? 'Editar Categoria' : 'Adicionar Categoria'}
        </h3>

        <div className="grid ">

          <div className="form-control">
            <label className="label">
              <span className="label-text">Nome</span>
            </label>
            <input
              type="text"
              placeholder="Nome do Produto"
              value={newCategory.nome}
              onChange={(event) => setNewCategory({ ...newCategory, nome: event.target.value })}
              className="input input-bordered w-full"
            />
          </div>

        </div>

        <div className="modal-action mt-4">
          <button onClick={handleSubmit} className="btn btn-primary">
            {isEditing ? 'Atualizar' : 'Adicionar'}
          </button>
          <button onClick={onClose} className="btn">Cancelar</button>
        </div>
      </div>
    </div>
  );
};

export default CategoryFormModal;
