import { Router } from 'express';
import ContadorController from '../controllers/Contador.controller';
import { requestHandler } from '../middlewares/requestWrapper.adapter';

const contadorRoutes = Router();
contadorRoutes.post('/create', requestHandler(ContadorController.createContador));

export default contadorRoutes;