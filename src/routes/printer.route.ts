import { Router } from 'express';
import ImpressoraController from '../controllers/Impressora.controller';
import { requestHandler } from '../middlewares/requestWrapper.adapter';

const impressoraRoutes = Router();
impressoraRoutes.post('/create', requestHandler(ImpressoraController.createImpressora));
impressoraRoutes.get('/', requestHandler(ImpressoraController.listImpressoras));
export default impressoraRoutes;