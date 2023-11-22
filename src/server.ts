import Express from 'express';
import cors from 'cors';
import impressoraRoutes from './routes/printer.route'
import padraoRoutes from './routes/padrao.route';

const corsOptions = {
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type,Authorization',
};
  

const app = Express();
app.use(Express.json());
const PORT = process.env.PORT || 8001;

app.use(cors(corsOptions));

app.use('/impressora', impressoraRoutes);
app.use('/padrao', padraoRoutes)
const server = app.listen(PORT, () => {
    console.log(`Server is running ${PORT}`);
});

export { server };

export default app;


