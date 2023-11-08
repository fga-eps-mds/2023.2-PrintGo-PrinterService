const pool = require('../db');

const createPrinter = async (req, res, next) => {
  try {
    const {
      padrao,
      ip,
      numeroSerie,
      codigoLocadora,
      contadorInstalacao,
      dataInstalacao,
      contadorRetirada,
      dataRetirada,
      ultimoContador,
      dataUltimoContador,
      unidadePai,
      unidadeFilho,
    } = req.body;

    const newPrinter = await pool.query(
      'INSERT INTO printers (padrao, ip, numero_serie, codigo_locadora, contador_instalacao, data_instalacao, contador_retirada, data_retirada, ultimo_contador, data_ultimo_contador, unidade_pai, unidade_filho) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *',
      [padrao, ip, numeroSerie, codigoLocadora, contadorInstalacao, new Date(dataInstalacao), contadorRetirada, new Date(dataRetirada), ultimoContador, new Date(dataUltimoContador), unidadePai, unidadeFilho]
    );

    res.json(newPrinter.rows[0]);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createPrinter
};
