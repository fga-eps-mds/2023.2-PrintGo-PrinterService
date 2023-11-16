export type ImpressoraCreateInput = {
    padrao_id: string;
    ip: string;
    numeroSerie: string;
    codigoLocadora: string;
    contadorInstalacao: number;
    dataInstalacao: Date;
    dataUltimoContador: Date;
    unidadeId?: string;
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
}