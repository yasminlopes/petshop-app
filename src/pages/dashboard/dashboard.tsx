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

interface SalesData {
  data: string;
  quantidadeTotal: number;
}

const Dashboard: React.FC = () => {
  const [productData, setProductData] = useState<{ labels: string[], values: number[] }>({ labels: [], values: [] });
  const [categoryData, setCategoryData] = useState<{ labels: string[], values: number[] }>({ labels: [], values: [] });
  const [clientData, setClientData] = useState<{ labels: string[], values: number[] }>({ labels: [], values: [] });
  const [subcategoryData, setSubcategoryData] = useState<{ labels: string[], values: number[] }>({ labels: [], values: [] });
  
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  
  const [salesData, setSalesData] = useState<{ labels: string[], values: number[] }>({ labels: [], values: [] });

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

  const fetchSalesData = async () => {
    if (!startDate || !endDate) return;

    try {
      const sales = await fetcher(`/api/vendas-dia?inicio=${startDate}&fim=${endDate}`);
      setSalesData({
        labels: sales.map((item: SalesData) => item.data),
        values: sales.map((item: SalesData) => item.quantidadeTotal),
      });
    } catch (error) {
      console.error('Erro ao buscar vendas', error);
    }
  }

  useEffect(() => {
    fetchMostSoldProducts();        
    fetchMostSoldCategories();
    fetchActiveClients(); 
    fetchMostSoldSubcategories();
    fetchSalesData();
  }, [startDate, endDate]);

  return (
    <div className="p-4 bg-white">
      <h2 className="text-center">Relatórios</h2>
      <div className="flex flex-wrap gap-4 justify-center">
        <div className="w-full md:w-1/2 lg:w-1/3">
          <Card title="Produtos Mais Vendidos">
            <PieChart label="Produto" data={productData} />
          </Card>
        </div>

        <div className="w-full md:w-1/2 lg:w-1/3">
          <Card title="Categorias Mais Vendidas">
            <LineChart label="Categoria" data={categoryData} />
          </Card>
        </div>

        <div className="w-full md:w-1/2 lg:w-1/3">
          <Card title="Clientes Ativos">
            <BarChart label="Número de Pedidos" data={clientData} />
          </Card>
        </div>

        <div className="w-full md:w-1/2 lg:w-1/3">
          <Card title="Subcategorias com Maior Faturamento">
            <BarChart label="Subcategoria" data={subcategoryData} />
          </Card>
        </div>

        <div className="w-full">
          <Card title="Vendas por Data">
            <div className="flex gap-4 mb-4">
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)} 
                placeholder="Data Início"
                className="flex-grow"
              />
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)} 
                placeholder="Data Fim"
                className="flex-grow"
              />
            </div>
            <LineChart label="Vendas" data={salesData} />
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
