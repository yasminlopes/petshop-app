import React, { useCallback, useEffect, useState } from 'react';
import ProductList from './products-list';
import ProductFormModal from './products-form-modal';
import ProductsFilters from './products-filters';
import TotalizersPanel from '../../components/totalizers-panel';
import { AiOutlineShoppingCart, AiOutlineStar } from 'react-icons/ai';
import { destroy, fetcher, post, put } from '../../utils/axios';
import { toast } from 'react-toastify';

const Products: React.FC = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [filters, setFilters] = useState({ nome: '', precoMin: '', precoMax: '', estoqueMin: '', orderBy: 'asc' });

  const [showFormModal, setShowFormModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  const [newProduct, setNewProduct] = useState({
    num: 0,
    nome: '',
    preco: 0,
    estoque: 0,
    descricao: '',
    idSubcategoria: 0
  });

  const handleListProducts = useCallback(async () => {
    try {
      const data = await fetcher('/api/produtos');
      setProducts(data);
    } catch (error) {
      console.error('Erro ao buscar produtos', error);
    }
  }, []);

  useEffect(() => {
    handleListProducts();
  }, [handleListProducts]);

  const fetchProductDetails = async (id: number) => {
    try {
      const data = await fetcher(`/api/produto/${id}`);
      setNewProduct({
        num: data?.num,
        nome: data?.nome,
        preco: data?.preco,
        estoque: data?.estoque,
        descricao: data?.descricao,
        idSubcategoria: data?.idSubcategoria
      });

      setSelectedProduct(data); 
      setShowFormModal(true);
    } catch (error) {
      console.error('Erro ao buscar produto:', error);
    }
  };
  

  const handleAddProduct = async (product: any) => {
    try {
      const response = await post('/api/criar-produto', product);
      setProducts([...products, response.data]);
      setShowFormModal(false);
      toast.success('Produto cadastrado com sucesso!');
      handleListProducts();
    } catch (error) {
      toast.error('Erro ao cadastrar o produto');
    }
  };

  const handleUpdateProduct = async (product: any) => {
    try {
      await put(`/api/produto/${product.num}`, product);
      setProducts(products.map((p) => (p.num === product.num ? product : p)));
      setShowFormModal(false);
      toast.success('Produto atualizado com sucesso!');
    } catch (error) {
      toast.error('Erro ao atualizar produto');
    }
  };

  const handleDeleteProduct = async () => {
    try {
      await destroy(`/api/delete-produto/${selectedProduct.num}`);
      setProducts(products.filter(product => product.num !== selectedProduct.num));
      setShowDeleteModal(false);
      toast.success('Produto excluído com sucesso!');
    } catch (error) {
      toast.error('Erro ao excluir produto');
    }
  };

  const handleOpenAddModal = () => {
    setSelectedProduct(null);
    setNewProduct({
      num: 0,
      nome: '',
      preco: 0,
      descricao: '',
      estoque: 0,
      idSubcategoria: 0
    })
    setShowFormModal(true); 
  };

  const handleEditProduct = (product: any) => {
    fetchProductDetails(product.num);
  };

  const handleDeleteConfirm = (product: any) => {
    setSelectedProduct(product);
    setShowDeleteModal(true);
  };

  const mostSoldProduct = products.length > 0  
  ? products.reduce((prev, current) => (current?.estoque && prev?.estoque && prev.estoque > current.estoque) ? prev : current, products[0])
  : { nome: 'N/A', estoque: 0 };

  const totalProducts = products.length;

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-4xl font-bold">Produtos</h1>
        <button onClick={handleOpenAddModal} className="btn btn-primary">
          Adicionar Produto
        </button>
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

      <ProductList 
        products={products} 
        filters={filters} 
        onEdit={handleEditProduct} 
        onDeleteConfirm={handleDeleteConfirm}
      />

      {showFormModal && (
        <ProductFormModal
          onAddProduct={handleAddProduct}
          onUpdateProduct={handleUpdateProduct}
          onClose={() => setShowFormModal(false)}
          newProduct={newProduct}
          setNewProduct={setNewProduct}
          isEditing={!!selectedProduct}
        />
      )}

      {showDeleteModal && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Confirmar Exclusão</h3>
            <p className="py-4">Tem certeza que deseja excluir o produto "{selectedProduct?.nome}"?</p>
            <div className="modal-action">
              <button onClick={handleDeleteProduct} className="btn btn-error">Excluir</button>
              <button onClick={() => setShowDeleteModal(false)} className="btn">Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;
