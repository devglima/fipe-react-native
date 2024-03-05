export interface Veiculo {
    tipo: string;
}

export interface Marca {
    nome: string;
    codigo: string;
}

export interface Modelo {
    nome: string;
    codigo: string;
}

export interface Ano {
    nome: string;
    codigo: string;
}

export interface DetalhesVeiculo {
    TipoVeiculo: string;
    Valor: string;
    Marca: string;
    Modelo: string;
    AnoModelo: number;
    Combustivel: string;
    CodigoFipe: string;
    MesReferencia: string;
    SiglaCombustivel: string;
}