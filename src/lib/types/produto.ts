export interface Categoria {
    id: number;    
    nome: string;          
    produtos: Produto[];      
    subcategorias: SubCategoria[]; 
}

export interface SubCategoria {
    id: number;
    nome: string;
    categoria: Categoria;
    categoriaId: number;
    produtos: Produto[];
}

export interface Produto {
    id: number;
    nome: string;
    preco: number;
    imagem: string;
    descricao: string;
    categoria: Categoria;
    categoriaId: number;
    subcategoria?: SubCategoria;
    subcategoriaId?: number;
}