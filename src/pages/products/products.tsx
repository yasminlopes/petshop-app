import React, { useCallback, useEffect, useState } from 'react';
import ProductList from './products-list';
import ProductFormModal from './products-form-modal';
import ProductsFilters from './products-filters';
import TotalizersPanel from '../../components/totalizers-panel';
import { AiOutlineShoppingCart, AiOutlineStar } from 'react-icons/ai';
import { fetcher } from '../../utils/axios';

const Products: React.FC = () => {
  const [products, setProducts] = useState<any[]>([])

  const [showModal, setShowModal] = useState(false);

  const [newProduct, setNewProduct] = useState({ nome: '', preco: 0, descricao: '', estoque: 0, id_subcategoria: 0 });

  const [filters, setFilters] = useState({ nome: '', precoMin: '', precoMax: '', estoqueMin: '', orderBy: 'asc' });

  const handleListProducts = useCallback(async () => {
    try {
      const data = await fetcher('/api/produtos')
      setProducts(data)
    } catch (error) {
      console.error('Erro ao buscar produtps', error);
    }
  }, []);

  useEffect(() => {
    handleListProducts()
  }, [handleListProducts]);

  const handleAddProduct = (product: any) => {
    setProducts([...products, { num: products.length + 1, ...product }]);
    setShowModal(false);
  };

  const handleDeleteProduct = (num: number) => {
    setProducts(products.filter(product => product.num !== num));
  };

  const mostSoldProduct = products.reduce((prev, current) => (prev.estoque > current.estoque) ? current : prev, products[0] || {});
  
  const totalProducts = products.length;

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-4xl font-bold">Produtos</h1>
        <button onClick={() => setShowModal(true)} className="btn btn-primary">Adicionar Produto</button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <TotalizersPanel
          icon={<AiOutlineStar />}
          title="Mais vendido"
          value={mostSoldProduct?.nome || 'N/A'}
        />

        <TotalizersPanel
          icon={<AiOutlineShoppingCart />}
          title="Total"
          value={totalProducts}
        />
      </div>

      <ProductsFilters filters={filters} setFilters={setFilters} />

      <ProductList products={products} filters={filters} onDelete={handleDeleteProduct} />

      {showModal && (
        <ProductFormModal
          onAddProduct={handleAddProduct}
          onClose={() => setShowModal(false)}
          newProduct={newProduct}
          setNewProduct={setNewProduct}
        />
      )}
    </div>
  );
};

export default Products;
