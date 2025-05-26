import { Produto } from "./produto";

export interface Mesa {
  id: number;
  numero: number;
  pedidos: Pedido[];
}

export interface Pedido {
  id?: number;
  mesaId: number;
  status: string;
  contaId?: number;
  produtos: PedidoProduto[];
}

export interface PedidoProduto {
  id: number;
  pedidoId: number;
  produtoId: number;
  quantidade: number;
  produto: Produto;
}

export interface Conta {
  id?: number;
  donoConta: string;
  statusConta: string;
  pedidos: Pedido[];
}