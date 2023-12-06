export type ImpressoraCreateInput = {
    padrao_id: string;
    ip: string;
    numeroSerie: string;
    codigoLocadora: string;
    contadorInstalacao: number;
    dataInstalacao: Date;
    dataUltimoContador: Date;
    unidadeId?: string;
    datacontadorRetirada?: Date;
    ultimoContador?: string;
}
export type ImpressoraCreateOutput = {
    id: string;
    padrao_id: string;
    ip: string;
    numeroSerie: string;
    codigoLocadora: string;
    contadorInstalacao: number;
    dataInstalacao: Date;
    dataUltimoContador: Date;
    unidadeId?: string;
    datacontadorRetirada?: Date;
    ultimoContador?: string;
}

export type ImpressoraUpdateInput = {
    id: string;
    padrao_id: string;
    ip: string;
    numeroSerie: string;
    codigoLocadora: string;
    contadorInstalacao: number;
    dataInstalacao: Date;
    dataUltimoContador: Date;
    unidadeId?: string;
    status?: string;
    datacontadorRetirada?: Date;
    ultimoContador?: string;
}

export type ImpressoraUpdateOutput = {
    id: string;
    padrao_id: string;
    ip: string;
    numeroSerie: string;
    codigoLocadora: string;
    contadorInstalacao: number;
    dataInstalacao: Date;
    dataUltimoContador: Date;
    unidadeId?: string;
    status?: string;
    datacontadorRetirada?: Date;
    ultimoContador?: string;
}

export type ImpressoraToggleInput = {
    id: string;
    status: string
}

export type ImpressoraToggleOutput = {
    id: string;
    padrao_id: string;
    ip: string;
    numeroSerie: string;
    codigoLocadora: string;
    contadorInstalacao: number;
    dataInstalacao: Date;
    dataUltimoContador: Date;
    unidadeId?: string;
    datacontadorRetirada?: Date;
    ultimoContador?: string;
    status: string;
}