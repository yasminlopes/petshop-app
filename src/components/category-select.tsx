import { useState, useEffect } from 'react';
import { Category } from '../models/category';
import { fetcher } from '../utils/axios';

interface Props {
  onSelect: (id: number) => void;
  selectedCategory?: number;
}

const CategorySelect: React.FC<Props> = ({ onSelect, selectedCategory }) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const listCategories = async () => {
    try {
      const data = await fetcher('/api/categorias');
      setCategories(data);
    } catch (error) {
      console.error('Erro ao buscar as categorias', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    listCategories();
  }, []);

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = Number(event.target.value);
    onSelect(selectedId); 
  };

  if (loading) {
    return <p>Carregando categorias...</p>;
  }

  return (
    <select
      value={selectedCategory || ''} 
      onChange={handleSelectChange}
      className="select select-bordered w-full"
    >
      {categories.length === 0 ? (
        <option value="" disabled>
          Nenhuma opção disponível
        </option>
      ) : (
        <>
          {categories.map((category) => (
            <option
              key={category.idCategoria}
              value={category.idCategoria}
            >
              {category.nome}
            </option>
          ))}
        </>
      )}
    </select>
  );
};

export default CategorySelect;
