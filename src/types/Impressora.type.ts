export type ImpressoraCreateInput = {
    ip: string;
    padrao_id: string;
    numeroSerie: string;
    codigoLocadora: string;
    contadorInstalacao: number;    
    dataInstalacao: Date;
    contadorRetiradas: number;
    dataContadorRetirada: Date;
    ultimoContador: number;
    dataUltimoContador: Date;
    unidadeId?: string;
}
export type ImpressoraCreateOutput = {
    id: string;
    ip: string;
    padrao_id: string;
    numeroSerie: string;
    codigoLocadora: string;
    contadorInstalacao: number;    
    dataInstalacao: Date;
    contadorRetiradas: number;
    dataContadorRetirada: Date;
    ultimoContador: number;
    dataUltimoContador: Date;
    unidadeId?: string;
}

export type ImpressoraUpdateInput = {
    id: string;
    padrao_id: string;
    ip: string;
    numeroSerie: string;
    codigoLocadora: string;

    contadorInstalacao: number;    
    dataInstalacao: Date;

    contadorRetirada?: number;
    datacontadorRetirada?: Date;

    ultimoContador?: number;
    dataUltimoContador: Date;
    
    unidadeId?: string;
}

export type ImpressoraUpdateOutput = {
    id: string;
    padrao_id: string;
    ip: string;
    numeroSerie: string;
    codigoLocadora: string;

    contadorInstalacao: number;    
    dataInstalacao: Date;

    contadorRetirada?: number;
    datacontadorRetirada?: Date;

    ultimoContador?: number;
    dataUltimoContador: Date;
    
    unidadeId?: string;
}

export type ImpressoraToggleInput = {
    id: string;
    status: string;
}

export type ImpressoraToggleOutput = {
    id: string;
    padrao_id: string;
    ip: string;
    numeroSerie: string;
    codigoLocadora: string;

    contadorInstalacao: number;    
    dataInstalacao: Date;

    contadorRetirada?: number;
    datacontadorRetirada?: Date;

    ultimoContador?: number;
    dataUltimoContador: Date;
    
    unidadeId?: string;
    status: string;
}