import React, { useEffect, useState } from 'react';
import PieChart from '../../components/pie-chart';
import { fetcher } from '../../utils/axios';
import Card from '../../components/card';
import BarChart from '../../components/bar-chart';
import LineChart from '../../components/line-chart';

interface ProductData {
  categoriaNome: string;
  produtoNome: string;
  totalVendido: number;
}

interface ClientData {
  cpf: string;
  nome: string;
  sobrenome: string;
  numeroPedidos: number;
}

interface SubcategoryData {
  nome: string;
  nomeCategoria: string;
  faturamentoTotal: number;
}

interface SubcategoryData {
  nome: string;
  nomeCategoria: string;
  faturamentoTotal: number;
}

const Dashboard: React.FC = () => {
  const [productData, setProductData] = useState<{ labels: string[], values: number[] }>({ labels: [], values: [] });
  const [categoryData, setCategoryData] = useState<{ labels: string[], values: number[] }>({ labels: [], values: [] });
  const [clientData, setClientData] = useState<{ labels: string[], values: number[] }>({ labels: [], values: [] });
  const [subcategoryData, setSubcategoryData] = useState<{ labels: string[], values: number[] }>({ labels: [], values: [] });

  const fetchMostSoldProducts = async () => {
    try {
      const products = await fetcher('/api/mais-vendidos');
      setProductData({
        labels: products.map((item: ProductData) => item.produtoNome),
        values: products.map((item: ProductData) => item.totalVendido),
      });
    } catch (error) {
      console.error('Erro ao buscar produtos', error);
    }
  };

  const fetchMostSoldCategories = async () => {
    try {
      const categories = await fetcher('/api/mais-vendidos-categoria');

      const categoryAggregation: { [key: string]: number } = {};
      categories.forEach((item: ProductData) => {
        categoryAggregation[item.categoriaNome] = (categoryAggregation[item.categoriaNome] || 0) + item.totalVendido;
      });

      setCategoryData({
        labels: Object.keys(categoryAggregation),
        values: Object.values(categoryAggregation),
      });
    } catch (error) {
      console.error('Erro ao buscar categorias', error);
    }
  };

  const fetchActiveClients = async () => {
    try {
      const clients = await fetcher('/api/mais-pedidos');
      
      setClientData({
        labels: clients.map((item: ClientData) => `${item.nome} ${item.sobrenome}`),
        values: clients.map((item: ClientData) => item.numeroPedidos),
      });
    } catch (error) {
      console.error('Erro ao buscar clientes ativos', error);
    }
  };

  const fetchMostSoldSubcategories = async () => {
    try {
      const subcategories = await fetcher('/api/subcategorias-faturamento');

      const subcategoryAggregation: { [key: string]: number } = {};
      subcategories.forEach((item: SubcategoryData) => {
        subcategoryAggregation[item.nomeCategoria] = (subcategoryAggregation[item.nomeCategoria] || 0) + item.faturamentoTotal;
      });

      setSubcategoryData({
        labels: Object.keys(subcategoryAggregation),
        values: Object.values(subcategoryAggregation),
      });
    } catch (error) {
      console.error('Erro ao buscar subcategorias', error);
    }
  };
  
  useEffect(() => {
    fetchMostSoldProducts();        
    fetchMostSoldCategories();
    fetchActiveClients(); 
    fetchMostSoldSubcategories();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-center">Relatórios</h2>
      <div style={{ display: 'flex', gap: '16px', justifyContent: 'space-between' }}>
        <Card title="Produtos Mais Vendidos">
          <BarChart label="Produto" data={productData} />
        </Card>

        <Card title="Categorias Mais Vendidas">
          <BarChart label="Categoria" data={categoryData} />
        </Card>
      </div>


      <div style={{ display: 'flex', gap: '16px', justifyContent: 'space-between' }}>
        <Card title="Clientes Ativos">
          <LineChart label="Número de Pedidos" data={clientData} /> 
        </Card>

        <Card title="Subcategorias Mais Vendidas">
          <LineChart label="Subcategoria" data={subcategoryData} />
        </Card> 

      </div>
    </div>
  );
};

export default Dashboard;
