import axios from 'axios';
import { Request, Response } from 'express';

async function obter(cep: string) {
    try {
        const url = `https://viacep.com.br/ws/${cep}/json/`;
        const { data } = await axios.get(url);
        return data;
    }
    catch (e: any) {
        return { message: e.message };
    }
}

export async function obterCep(req:Request, res:Response) {
    const {cep} = req.body;
    try {
        const url = `https://viacep.com.br/ws/${cep}/json/`;
        const { data } = await axios.get(url);
        return res.json(data);
    }
    catch (e: any) {
        return res.json({ message: e.message });
    }
}

export default obter;