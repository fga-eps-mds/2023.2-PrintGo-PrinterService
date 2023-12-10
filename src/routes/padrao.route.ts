import { Router } from 'express';
import PadraoController from '../controllers/Padrao.controller';
import { requestHandler } from '../middlewares/requestWrapper.adapter';

const padraoRoutes = Router();
padraoRoutes.post('/create', requestHandler(PadraoController.createPadrao));
padraoRoutes.get('/', requestHandler(PadraoController.listPadroes));
padraoRoutes.get('/:id', requestHandler(PadraoController.findPadraoById));
padraoRoutes.patch('/:id', requestHandler(PadraoController.togglePadrao));
padraoRoutes.delete('/:id', requestHandler(PadraoController.deletePadraoById));

export default padraoRoutes;