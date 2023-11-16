import { Router } from 'express';
import PadraoController from '../controllers/Padrao.controller';
import { requestHandler } from '../middlewares/requestWrapper.adapter';

const padraoRoutes = Router();
padraoRoutes.post('/create', requestHandler(PadraoController.createPadrao));
padraoRoutes.get('/', requestHandler(PadraoController.listPadroes));

export default padraoRoutes;