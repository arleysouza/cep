import obter from "../src/cep";

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