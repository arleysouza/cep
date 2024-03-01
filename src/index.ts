import express, {Express, Request, Response} from "express";
import dotenv from "dotenv";
import obter, { obterCep } from "./cep";
dotenv.config();

const app: Express = express();
const PORT = process.env.PORT;
app.use(express.json()); // para receber json pelo body

app.listen(PORT, () => console.log(`Rodando na ${PORT}`));
/*
app.get("/", async function(req:Request,res:Response){
    const {cep} = req.body;
    const resp = await obter(cep);
    res.json(resp);
});
*/

app.get("/", obterCep);

export default app;

