import axios from 'axios';

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

export default obter;