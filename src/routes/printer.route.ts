import { Router } from 'express';
import ImpressoraController from '../controllers/Impressora.controller';
import { requestHandler } from '../middlewares/requestWrapper.adapter';

const impressoraRoutes = Router();
impressoraRoutes.post('/create', requestHandler(ImpressoraController.createImpressora));
impressoraRoutes.get('/', requestHandler(ImpressoraController.listImpressoras));
impressoraRoutes.put('/:id', requestHandler(ImpressoraController.editImpressora));
impressoraRoutes.patch('/:id', requestHandler(ImpressoraController.toggleImpressora));
impressoraRoutes.delete('/:id', requestHandler(ImpressoraController.deleteImpressoraById));

export default impressoraRoutes;