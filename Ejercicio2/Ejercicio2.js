const express = require("express");
const app = express();
const PORT = 3157;

app.use(express.json());

const impuestos = {
    "el salvador": { iva: 0.13, renta: 0.10, display: "elsalvador" },
    "elsalvador": { iva: 0.13, renta: 0.10, display: "elsalvador" },
    "guatemala": { iva: 0.12, renta: 0.05, display: "guatemala" },
    "costa rica": { iva: 0.13, renta: 0.15, display: "costa rica" },
    "honduras": { iva: 0.15, renta: 0.10, display: "honduras" },
    "panama": { iva: 0.07, renta: 0.15, display: "panama" },
    "nicaragua": { iva: 0.15, renta: 0.15, display: "nicaragua" }
};

function calcularImpuestosPais(paisClave, salario) {
    const tasas = impuestos[paisClave];
    const iva = salario * tasas.iva;
    const renta = salario * tasas.renta;
    const salarioNeto = salario - iva - renta;

    return {
        pais: tasas.display,
        salarioBruto: salario,
        porcentajeIVA: `${tasas.iva * 100}%`,
        porcentajeRenta: `${tasas.renta * 100}%`,
        iva: iva,
        renta: renta,
        salarioNeto: salarioNeto
    };
}

app.get("/", (req, res) => {
    res.send("Servidor ejecutándose correctamente. Usa /api/impuestos/:pais/:salario");
});

app.get("/api/impuestos/:pais/:salario", (req, res) => {
    try {
        const paisInput = req.params.pais.toLowerCase();
        const salario = Number(req.params.salario);

        if (!impuestos[paisInput]) {
            return res.status(400).json({
                error: "El país no está permitido"
            });
        }

        if (isNaN(salario) || salario <= 0) {
            return res.status(400).json({
                error: "El salario debe ser un número mayor a cero"
            });
        }

        const resultado = calcularImpuestosPais(paisInput, salario);
        res.json(resultado);

    } catch (error) {
        res.status(500).json({
            error: "Ocurrió un error en el servidor"
        });
    }
});

app.listen(PORT, () => {
    console.log(`Ejercicio 2 ejecutándose en http://localhost:${PORT}`);
});