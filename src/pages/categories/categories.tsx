import React, { useCallback, useEffect, useMemo, useState } from 'react';
import CategoriesList from './categories-list';
import CategoriesFilters from './categories-filters';
import { destroy, fetcher, post, put } from '../../utils/axios';
import CategoryFormModal from './categories-form-modal';
import { toast } from 'react-toastify';

const Categories: React.FC = () => {
    const [filters, setFilters] = useState<{ [key: string]: string }>({});
  const [listagem, setListagem] = useState<any[]>([]);
  const [showFormModal, setShowFormModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<any>(null);
  const [newCategory, setNewCategory] = useState({ nome: '' });

  const handleListCategories = useCallback(async () => {
    try {
      const data = await fetcher('/api/categorias');
      setListagem(data);
    } catch (error) {
      console.error('Erro ao buscar categorias', error);
    }
  }, []);

  const filteredCategories = useMemo(() => {
    return listagem.filter(category => {
      return Object.entries(filters).every(([key, value]) => 
        category[key].toString().toLowerCase().includes(value.toLowerCase())
      );
    });
  }, [listagem, filters]);

  const handleEdit = (item: any) => {
    setSelectedCategory(item);
    fetchCategoryById(item.idCategoria);
  };

  const handleDeleteConfirm = (category: any) => {
    setSelectedCategory(category);
    setShowDeleteModal(true);
  };

  const fetchCategoryById = async (id: number) => {
    try {
      const data = await fetcher(`/api/categoria/${id}`);
      setNewCategory({ nome: data?.nome });
      setShowFormModal(true);
    } catch (error) {
      console.error('Erro ao buscar categoria:', error);
    }
  };

    const handleAddCategory = async (category: any) => {
        try {
            const response = await post('/api/criar-categoria', category);
            setNewCategory(response.data);
            setShowFormModal(false);
            toast.success('Categoria cadastrada com sucesso!');
            handleListCategories();
        } catch (error) {
            toast.error('Erro ao cadastrar a categoria');
        }
    };

    const handleUpdateCategory = async (category: any) => {
        try {
            const response = await post(`/api/update-categoria`, {
              nome: category.nome,
              idCategoria: selectedCategory.idCategoria
            });
            setNewCategory(response.data);
            setShowFormModal(false);
            toast.success('Categoria atualizada com sucesso!');
      handleListCategories();
    } catch (error) {
      toast.error('Erro ao atualizar a categoria');
    }
  };

  const handleDeleteCategory = async () => {
    try {
      await destroy(`/api/delete-categoria/${selectedCategory.idCategoria}`);
      setListagem(listagem.filter(subcategory => subcategory.idCategoria !== selectedCategory.idCategoria));
      setShowDeleteModal(false);
      toast.success('Categoria excluído com sucesso!');
    } catch (error) {
      toast.error('Erro ao excluir categoria');
    }
  };

  useEffect(() => {
    handleListCategories();
  }, [handleListCategories]);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-4xl font-bold">Categorias</h1>
        <button onClick={() => {
          setSelectedCategory(null);
          setNewCategory({ nome: '' });
          setShowFormModal(true);
        }} className="btn bg-gray-900 text-gray-300">
          Cadastrar
        </button>
      </div>

      <CategoriesFilters filters={filters} setFilters={setFilters} />

      <CategoriesList
        categories={filteredCategories}
        onEdit={handleEdit}
        onDeleteConfirm = {handleDeleteConfirm}
      />

      {showFormModal && (
        <CategoryFormModal
          onAdd={handleAddCategory}
          onUpdate={handleUpdateCategory}
          onClose={() => setShowFormModal(false)}
          newCategory={newCategory}
          setNewCategory={setNewCategory}
          isEditing={!!selectedCategory}
        />
      )}

      {showDeleteModal && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Confirmar Exclusão</h3>
            <p className="py-4">Tem certeza que deseja excluir a categoria"{selectedCategory?.nome}"?</p>
            <div className="modal-action">
              <button onClick={handleDeleteCategory} className="btn btn-error">Excluir</button>
              <button onClick={() => setShowDeleteModal(false)} className="btn">Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Categories;
