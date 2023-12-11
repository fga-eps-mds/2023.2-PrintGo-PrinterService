import { Router } from 'express';
import ContadorController from '../controllers/Contador.controller';
import { requestHandler } from '../middlewares/requestWrapper.adapter';

const contadorRoutes = Router();
contadorRoutes.post('/create', requestHandler(ContadorController.createContador));
contadorRoutes.patch('/', requestHandler(ContadorController.editContador));
contadorRoutes.get('/', requestHandler(ContadorController.listImpressoras));

export default contadorRoutes;