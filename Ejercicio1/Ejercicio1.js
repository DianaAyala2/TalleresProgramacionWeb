const express = require("express");

const app = express();

const PORT = 3001;

app.use(express.json());

function calcularImpuestos(monto) {
    const iva = monto * 0.13;
    const renta = monto * 0.10;

    return {
        monto: monto,
        iva: iva,
        renta: renta
    };
}

app.get("/api/calcular/:monto", (req, res) => {
    try {
        const monto = Number(req.params.monto);

        if (isNaN(monto)) {
            return res.status(400).json({
                error: "El monto debe ser numérico"
            });
        }

        if (monto === 0) {
            return res.status(400).json({
                error: "El monto no puede ser igual a 0"
            });
        }

        if (monto < 0) {
            return res.status(400).json({
                error: "El monto no puede ser negativo"
            });
        }

        const resultado = calcularImpuestos(monto);

        res.json(resultado);

    } catch (error) {
        res.status(500).json({
            error: "Ocurrió un error en el servidor"
        });
    }
});

app.listen(PORT, () => {
    console.log(`Ejercicio 1 ejecutándose en http://localhost:${PORT}`);
});