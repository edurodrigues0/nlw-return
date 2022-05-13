import cors from 'cors';
import express from 'express';
import { routes } from './routes';

const port = 3333;
const app = express();

// GET, POST, PUT, PATCH, DELETE
// GET = Buscar informações
// POST = Cadastre informações
// PUT = Atualizar informações de uma entidade
// PATCH = Atualizar uma informação única de uma entidade
// DELETE = Deletar informações

app.use(cors({
  origin: 'http://localhost:3000'
}));
app.use(express.json());
app.use(routes)

app.listen(port, () => {
  console.log(`Server is running in port:${port}!🚀`)
});