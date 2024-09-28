import React, { useCallback, useEffect, useMemo, useState } from 'react';
import CategoriesList from './categories-list';
import CategoriesFilters from './categories-filters';
import { fetcher, post } from '../../utils/axios';
import CategoryFormModal from './categories-form-modal';
import { toast } from 'react-toastify';

const Categories: React.FC = () => {
    const [filters, setFilters] = useState<{ [key: string]: string }>({});
  const [listagem, setListagem] = useState<any[]>([]);
  const [showFormModal, setShowFormModal] = useState(false);
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

  const fetchCategoryById = async (id: number) => {
    try {
      const { data } = await fetcher(`/api/categorias/${id}`);
      setNewCategory({ nome: data?.nome });
      setShowFormModal(true);
    } catch (error) {
      console.error('Erro ao buscar produto:', error);
    }
  };

  const handleAddCategory = async (category: any) => {
    try {
      const response = await post('/api/criar-categoria', category);
      setNewCategory(response.data);
      setShowFormModal(false);
      toast.success('Category cadastrada com sucesso!');
      handleListCategories();
    } catch (error) {
      toast.error('Erro ao cadastrar o produto');
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
          setNewCategory({ nome: '' }); // Reseta o formulário
          setShowFormModal(true);
        }} className="btn btn-primary">
          Adicionar
        </button>
      </div>

      <CategoriesFilters filters={filters} setFilters={setFilters} />

      <CategoriesList
        categories={filteredCategories}
        onEdit={handleEdit}
        onDeleteConfirm={() => alert('Confirma a exclusão?')}
      />

      {showFormModal && (
        <CategoryFormModal
          onAdd={handleAddCategory}
          onUpdate={handleEdit}
          onClose={() => setShowFormModal(false)}
          newCategory={newCategory}
          setNewCategory={setNewCategory}
          isEditing={!!selectedCategory}
        />
      )}
    </div>
  );
};

export default Categories;
