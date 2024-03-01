import obter, { obterCep } from "../src/cep";
import { Request, Response } from 'express';
import request from "supertest";
import app from "../src";

describe("CEP", () => {
    test("Cep válido", async () => {
        const r = await obter("12328070");
        expect(r).toMatchObject(
            {
                "cep": "12328-070",
                "logradouro": "Avenida Faria Lima"
            }
        );
    });

    test("Cep inválido", async () => {
        const r = await obter("12328071");
        expect(r).toMatchObject(
            {
                "erro": "true"
            }
        );
    });

    test("Cep incompleto", async () => {
        const r = await obter("1232807");
        expect(r).toMatchObject(
            {
                "message": expect.any(String)
            }
        );
    });
});

describe("CEP HTTP", () => {
    it("CEP válido", async () => {
        const req = { body: { cep: "12328070" } } as Request;
        const res = { json: jest.fn() } as unknown as Response;

        await obterCep(req, res);
        expect(res.json).toHaveBeenCalledWith(
            expect.objectContaining({"cep": "12328-070"})
        );
    });

    it("CEP inválido", async () => {
        const req = { body: { cep: "12328071" } } as Request;
        const res = { json: jest.fn() } as unknown as Response;

        await obterCep(req, res);
        expect(res.json).toHaveBeenCalledWith({ "erro": "true"});
    });

    it("CEP incompleto", async () => {
        const req = { body: { cep: "1232807" } } as Request;
        const res = { json: jest.fn() } as unknown as Response;

        await obterCep(req, res);
        // verifica se o valor da propriedade message começa por Request failed
        expect(res.json).toHaveBeenCalledWith({
            //"message": expect.stringMatching(/Request failed/i)
            "message": expect.any(String)
        });
        
    });
});

describe("Teste de integração", () =>{ 
    it("CEP válido", async () => {
        const response = await request(app).get("/").send({ cep: "12328070" });
        
        expect(response.body.cep).toBe("12328-070");
    });

    it("CEP inválido", async () => {
        const response = await request(app).get("/").send({ cep: "12328071" });
        
        expect(response.body.erro).toBe("true");
    });

    it("CEP 1232807", async () => {
        const response = await request(app).get("/").send({ cep: "1232807" });
        
        expect(response.body.message).toMatch(/Request failed/i);
    });
});