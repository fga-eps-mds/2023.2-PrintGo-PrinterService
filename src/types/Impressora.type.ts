export type ImpressoraCreateInput = {
    nome: string;
    rua: string;
    logradouro: string;
    complemento: string;
    bairro: string;
    cidade: string;
    cep: string;
    numero: number;
}

export type ImpressoraCreateOutput = {
    id: string;
    nome: string;
    rua: string;
    logradouro: string;
    complemento: string;
    bairro: string;
    cidade: string;
    cep: string;
    numero: number;
}