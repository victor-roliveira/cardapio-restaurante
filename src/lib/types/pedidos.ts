import { Produto } from "./produto";

export interface Mesa {
  id: number;
  numero: number;
  pedidos: Pedido[];
}

export interface Pedido {
  id: number;
  mesaId: number;
  status: String;
  produtos: PedidoProduto[];
}

export interface PedidoProduto {
  id: number;
  pedidoId: number;
  produtoId: number;
  quantidade: number;
  produto: Produto;
}
