import React from 'react';
import CategorySelect from '../../components/category-select';


interface Props {
  onAdd: (item: any) => void;
  onUpdate: (item: any) => void;
  onClose: () => void;
  newSubcategory: any;
  setNewSubcategory: React.Dispatch<React.SetStateAction<any>>;
  isEditing: boolean; 
}

const SubcategoryFormModal: React.FC<Props> = ({ onAdd, onUpdate, onClose, newSubcategory, setNewSubcategory, isEditing }) => {

  const handleCategorySelect = (id: number) => {
    setNewSubcategory({ ...newSubcategory, idCategoria: id })
  };

  const handleSubmit = () => {
    if (isEditing) {
      onUpdate(newSubcategory); 
    } else {
      onAdd(newSubcategory); 
    }
  }
  

  return (
    <div className="modal modal-open">
      <div className="modal-box w-full "> 
        <h3 className="text-2xl font-semibold mb-4">
          {isEditing ? 'Editar Subcategoria' : 'Cadastrar Subcategoria'}
        </h3>

        <div className="grid ">

          <div className="form-control">
            <label className="label">
              <span className="label-text">Nome</span>
            </label>
            <input
              type="text"
              placeholder="Nome da Subcategoria"
              value={newSubcategory.nome}
              onChange={(event) => setNewSubcategory({ ...newSubcategory, nome: event.target.value })}
              className="input input-bordered w-full"
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Categoria</span>
            </label>
            <CategorySelect 
              onSelect={handleCategorySelect}
              selectedCategory={newSubcategory.idCategoria}
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

export default SubcategoryFormModal;
