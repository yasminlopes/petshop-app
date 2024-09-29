import React, { useCallback, useEffect, useMemo, useState } from 'react';
import SubcategoriesList from './subcategories-list';
import SubcategoriesFilters from './subcategories-filters';
import { fetcher, post } from '../../utils/axios';
import SubcategoryFormModal from './subcategories-form-modal';
import { toast } from 'react-toastify';

const Subcategories: React.FC = () => {
    const [filters, setFilters] = useState<{ [key: string]: string }>({});
  const [listagem, setListagem] = useState<any[]>([]);
  const [showFormModal, setShowFormModal] = useState(false);
  const [selectedSubcategory, setSelectedSubcategory] = useState<any>(null);
  const [newSubcategory, setNewSubcategory] = useState({ nome: '' });

  const handleListSubcategories = useCallback(async () => {
    try {
      const data = await fetcher('/api/subcategorias-listar');
      setListagem(data);
    } catch (error) {
      console.error('Erro ao buscar subcategorias', error);
    }
  }, []);

  const filteredSubcategories = useMemo(() => {
    return listagem.filter(subcategory => {
      return Object.entries(filters).every(([key, value]) => 
        subcategory[key].toString().toLowerCase().includes(value.toLowerCase())
      );
    });
  }, [listagem, filters]);

  const handleEdit = (item: any) => {
    setSelectedSubcategory(item);
    fetchSubcategoryById(item.idCategoria);
  };

  const fetchSubcategoryById = async (id: number) => {
    try {
      const data = await fetcher(`/api/subcategoria/${id}`);
      setNewSubcategory({ nome: data?.nome });
      setShowFormModal(true);
    } catch (error) {
      console.error('Erro ao buscar subcategoria:', error);
    }
  };

    const handleAddSubcategory = async (subcategory: any) => {
        try {
            const response = await post('/api/criar-subcategoria', subcategory);
            setNewSubcategory(response.data);
            setShowFormModal(false);
            toast.success('Subcategoria cadastrada com sucesso!');
            handleListSubcategories();
        } catch (error) {
            toast.error('Erro ao cadastrar a subcategoria');
        }
    };

    const handleUpdateSubcategory = async (subcategory: any) => {
        try {
            const response = await post(`/api/update-subcategoria`, {
              nome: subcategory.nome,
              idCategoria: selectedSubcategory.idCategoria
            });
            setNewSubcategory(response.data);
            setShowFormModal(false);
            toast.success('Subcategoria atualizada com sucesso!');
      handleListSubcategories();
    } catch (error) {
      toast.error('Erro ao atualizar a subcategoria');
    }
  };

  useEffect(() => {
    handleListSubcategories();
  }, [handleListSubcategories]);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-4xl font-bold">Subcategorias</h1>
        <button onClick={() => {
          setSelectedSubcategory(null);
          setNewSubcategory({ nome: '' });
          setShowFormModal(true);
        }} className="btn bg-gray-900 text-gray-300">
          Cadastrar
        </button>
      </div>

      <SubcategoriesFilters filters={filters} setFilters={setFilters} />

      <SubcategoriesList
        subcategories={filteredSubcategories}
        onEdit={handleEdit}
        onDeleteConfirm={() => alert('Confirma a exclusão?')}
      />

      {showFormModal && (
        <SubcategoryFormModal
          onAdd={handleAddSubcategory}
          onUpdate={handleUpdateSubcategory}
          onClose={() => setShowFormModal(false)}
          newSubcategory={newSubcategory}
          setNewSubcategory={setNewSubcategory}
          isEditing={!!selectedSubcategory}
        />
      )}
    </div>
  );
};

export default Subcategories;
