import axios from 'axios';
import { useState, useEffect } from 'react';
import { Subcategory } from '../models/subcategory';
import { fetcher } from '../utils/axios';

interface Props {
  onSelectSubcategory: (id: number) => void;
}

const SubcategorySelect: React.FC<Props> = ({ onSelectSubcategory }) => {

  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);

  const [loading, setLoading] = useState<boolean>(true)

  const [selectedSubcategory, setSelectedSubcategory] = useState<number>();

  const listSubcategories = async () => {
    try {
      const data = await fetcher('/api/subcategorias');
      setSubcategories(data)
    } catch (error) {
      console.error('Erro ao buscar as subcategorias', error);
    } finally {
      setLoading(false)
    }
  };

  useEffect(() => {
    listSubcategories();
  }, []);

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = Number(event.target.value);
    setSelectedSubcategory(selectedId);
    onSelectSubcategory(selectedId); 
  };

  return (
        <select
          value={selectedSubcategory}
          onChange={handleSelectChange}
          className="select select-bordered w-full"
        >
          {subcategories.length === 0 ? (
            <option value="" disabled>
              Nenhuma opção disponível
            </option>
          ) : (
            subcategories.map((subcategory) => (
              <option
                key={subcategory.idSubcategoria}
                value={subcategory.idSubcategoria}
              >
                {subcategory.nome}
              </option>
            ))
          )}
        </select>
  );
};

export default SubcategorySelect;
