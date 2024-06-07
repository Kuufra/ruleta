class NumeroRuleta {
    constructor(numero, color, calle, docena) {
        this.numero = numero;
        this.color = color;
        this.calle = calle;
        this.docena = docena;
    }
}

class Ruleta {
    constructor() {
        this.numerosRuleta = [
            new NumeroRuleta(0, "verde", null, null),
            new NumeroRuleta(1, "rojo", 1, "1"),
            new NumeroRuleta(2, "negro", 2, "1"),
            new NumeroRuleta(3, "rojo", 3, "1"),
            new NumeroRuleta(4, "negro", 1, "1"),
            new NumeroRuleta(5, "rojo", 2, "1"),
            new NumeroRuleta(6, "negro", 3, "1"),
            new NumeroRuleta(7, "rojo", 1, "1"),
            new NumeroRuleta(8, "negro", 2, "1"),
            new NumeroRuleta(9, "rojo", 3, "1"),
            new NumeroRuleta(10, "negro", 1, "1"),
            new NumeroRuleta(11, "negro", 2, "1"),
            new NumeroRuleta(12, "rojo", 3, "1"),
            new NumeroRuleta(13, "negro", 1, "2"),
            new NumeroRuleta(14, "rojo", 2, "2"),
            new NumeroRuleta(15, "negro", 3, "2"),
            new NumeroRuleta(16, "rojo", 1, "2"),
            new NumeroRuleta(17, "negro", 2, "2"),
            new NumeroRuleta(18, "rojo", 3, "2"),
            new NumeroRuleta(19, "rojo", 1, "2"),
            new NumeroRuleta(20, "negro", 2, "2"),
            new NumeroRuleta(21, "rojo", 3, "2"),
            new NumeroRuleta(22, "negro", 1, "2"),
            new NumeroRuleta(23, "rojo", 2, "2"),
            new NumeroRuleta(24, "negro", 3, "2"),
            new NumeroRuleta(25, "rojo", 1, "3"),
            new NumeroRuleta(26, "negro", 2, "3"),
            new NumeroRuleta(27, "rojo", 3, "3"),
            new NumeroRuleta(28, "negro", 1, "3"),
            new NumeroRuleta(29, "negro", 2, "3"),
            new NumeroRuleta(30, "rojo", 3, "3"),
            new NumeroRuleta(31, "negro", 1, "3"),
            new NumeroRuleta(32, "rojo", 2, "3"),
            new NumeroRuleta(33, "negro", 3, "3"),
            new NumeroRuleta(34, "rojo", 1, "3"),
            new NumeroRuleta(35, "negro", 2, "3"),
            new NumeroRuleta(36, "rojo", 3, "3"),
        ];
        this.dineroUsuario = this.getDineroUsuario();
        this.ultimosNumerosGanadores = this.getUltimosNumerosGanadores();
        this.mostrarUltimosNumerosGanadores();

        document.getElementById('saldo').innerText = `SALDO ACTUAL: ${this.dineroUsuario}`;
        document.getElementById('realizar-apuesta').addEventListener('click', this.realizarApuesta.bind(this));
        document.getElementById('confirmar-tipo').addEventListener('click', this.confirmarTipoApuesta.bind(this));
        document.getElementById('jugar-nuevamente').addEventListener('click', this.resetGame.bind(this));
    }

    async realizarApuesta() {
        const monto = parseInt(document.getElementById('monto').value);
        const mensajeError = document.getElementById('mensaje-error');

        if (monto < 1 || monto > this.dineroUsuario || isNaN(monto)) {
            mensajeError.textContent = "Monto de apuesta no permitido";
            mensajeError.style.display = 'block';
            Toastify({
                text: "Monto de apuesta no permitido",
                duration: 3000,
                gravity: "top",
                position: "right",
                style: {
                    background: "#FF6347",
                    color: "#fff"
                },
            }).showToast();
            return;
        }

        this.montoApuesta = monto;
        mensajeError.style.display = 'none';
        document.getElementById('formulario-apuesta').style.display = 'none';
        document.getElementById('tipo-apuesta').style.display = 'block';

        Toastify({
            text: `Estas apostando ${monto} USD
                    Seleccione el tipo de apuesta a realizar`,
            duration: 3000,
            gravity: "top",
            position: "center",
            style: {
                background: "#3498db",
                color: "#fff"
            },
        }).showToast();

        await this.simularLlamadaAsincrona();
    }

    async confirmarTipoApuesta() {
        const tipoApuesta = document.getElementById('tipo').value;
        this.tipoApuesta = tipoApuesta;

        let additionalInputHtml = '';
        switch (tipoApuesta) {
            case "1":
                additionalInputHtml = `
                    <label for="numeroApostado">Seleccione el número al que desea apostar (0-36):</label>
                    <input type="number" id="numeroApostado" min="0" max="36">
                    <button id="confirmar-adicional">Confirmar Número</button>`;
                break;
            case "2":
                additionalInputHtml = `
                    <label for="colorElegido">Seleccione el color de la apuesta:</label>
                    <select id="colorElegido">
                        <option value="rojo">Rojo</option>
                        <option value="negro">Negro</option>
                    </select>
                    <button id="confirmar-adicional">Confirmar Color</button>`;
                break;
            case "3":
                additionalInputHtml = `
                    <label for="filaElegida">Seleccione la fila de la apuesta (1, 2, o 3):</label>
                    <input type="number" id="filaElegida" min="1" max="3">
                    <button id="confirmar-adicional">Confirmar Fila</button>`;
                break;
            case "4":
                additionalInputHtml = `
                    <label for="docenaElegida">Seleccione la docena de la apuesta (1, 2, o 3):</label>
                    <input type="number" id="docenaElegida" min="1" max="3">
                    <button id="confirmar-adicional">Confirmar Docena</button>`;
                break;
            case "5":
                additionalInputHtml = `
                    <label for="parImpar">Seleccione par o impar:</label>
                    <select id="parImpar">
                        <option value="1">Par</option>
                        <option value="2">Impar</option>
                    </select>
                    <button id="confirmar-adicional">Confirmar Par/Impar</button>`;
                break;
        }

        document.getElementById('entrada-adicional').innerHTML = additionalInputHtml;
        document.getElementById('entrada-adicional').style.display = 'block';
        document.getElementById('confirmar-adicional').addEventListener('click', this.confirmarApuesta.bind(this));
    }

    async confirmarApuesta() {
        const numeroGanador = Math.floor(Math.random() * 37);
        const infoNumeroGanador = this.obtenerInformacionNumero(numeroGanador);
        this.agregarUltimoNumeroGanador(numeroGanador);
        this.procesarApuesta();

        await this.simularLlamadaAsincrona();

        switch (this.tipoApuesta) {
            case "1":
                const numeroApostado = parseInt(document.getElementById('numeroApostado').value);
                if (numeroApostado < 0 || numeroApostado > 36 || isNaN(numeroApostado)) {
                    alert("Número de apuesta no permitido");
                    return;
                }
                this.calcularPagoNumero(numeroGanador, numeroApostado, this.montoApuesta);
                break;
            case "2":
                const colorElegido = document.getElementById('colorElegido').value;
                this.calcularPagoColor(numeroGanador, colorElegido, this.montoApuesta);
                break;
            case "3":
                const filaElegida = parseInt(document.getElementById('filaElegida').value);
                if (filaElegida < 1 || filaElegida > 3 || isNaN(filaElegida)) {
                    alert("Fila de apuesta no permitida");
                    return;
                }
                this.calcularPagoCalle(numeroGanador, filaElegida, this.montoApuesta);
                break;
            case "4":
                const docenaElegida = parseInt(document.getElementById('docenaElegida').value);
                if (docenaElegida < 1 || docenaElegida > 3 || isNaN(docenaElegida)) {
                    alert("Docena de apuesta no permitida");
                    return;
                }
                this.calcularPagoDocena(numeroGanador, docenaElegida, this.montoApuesta);
                break;
            case "5":
                const parImpar = document.getElementById('parImpar').value;
                this.calcularPagoParImpar(numeroGanador, parImpar, this.montoApuesta);
                break;
        }


        this.mostrarNumeroGanador(infoNumeroGanador, numeroGanador);
        this.mostrarUltimosNumerosGanadores();
        this.mostrarDineroUsuario();

        Toastify({
            text: `El número ganador es ${numeroGanador}`,
            duration: 2000,
            gravity: "top",
            position: "center",
            style: {
                background: "#4CAF50",
                color: "#fff"
            },
        }).showToast();

        if (this.dineroUsuario <= 0) {
            document.getElementById('mensaje').innerText = "Lo siento, no tienes suficiente dinero para seguir apostando. ¡Hasta luego!";
            document.getElementById('jugar-nuevamente').style.display = 'block';
        } else {
            document.getElementById('formulario-apuesta').style.display = 'block';
            document.getElementById('tipo-apuesta').style.display = 'none';
            document.getElementById('entrada-adicional').style.display = 'none';

        }

    }

    async procesarApuesta() {

        Toastify({
            text: `NO VA MAS!!!
                    Se cerraron las apuestas` ,
            duration: 1000,
            gravity: "top",
            position: "center",
            style: {
                background: "#FF6347" , 
                color: "#fff"
            },
            stopOnFocus: true,
        }).showToast();


        await this.simularLlamadaAsincrona();
    }

    simularLlamadaAsincrona() {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve();
            }, 2000);
        });
    }

    resetGame() {
        this.dineroUsuario = 100;
        this.ultimosNumerosGanadores = [];
        this.saveData();
        document.getElementById('mensaje').innerText = "";
        document.getElementById('jugar-nuevamente').style.display = 'none';
        document.getElementById('formulario-apuesta').style.display = 'block';
        document.getElementById('tipo-apuesta').style.display = 'none';
        document.getElementById('entrada-adicional').style.display = 'none';
        this.mostrarDineroUsuario();
        this.mostrarUltimosNumerosGanadores();
    }

    obtenerInformacionNumero(numero) {
        return this.numerosRuleta.find(n => n.numero === numero);
    }

    agregarUltimoNumeroGanador(numero) {
        this.ultimosNumerosGanadores.push(numero);
        if (this.ultimosNumerosGanadores.length > 10) {
            this.ultimosNumerosGanadores.shift();
        }
        this.saveData();
    }

    mostrarNumeroGanador(info, numero) {
        const mensaje = `El número ganador es ${numero} (${info.color}, fila ${info.calle}, docena ${info.docena})`;
        document.getElementById('mensaje').innerText = mensaje;
    }

    mostrarUltimosNumerosGanadores() {
        const ultimosNumerosTexto = `Últimos números ganadores: ${this.ultimosNumerosGanadores.join(', ')}`;
        document.getElementById('ultimos-numeros').innerText = ultimosNumerosTexto;
    }


    mostrarDineroUsuario() {
        document.getElementById('saldo').innerText = `SALDO ACTUAL: ${this.dineroUsuario}`;
    }

    calcularPagoNumero(numeroGanador, numeroApostado, monto) {
        if (numeroGanador === numeroApostado) {
            this.dineroUsuario += monto * 35;
        } else {
            this.dineroUsuario -= monto;
        }
        this.saveData();
    }

    calcularPagoColor(numeroGanador, colorApostado, monto) {
        const infoNumeroGanador = this.obtenerInformacionNumero(numeroGanador);
        if (infoNumeroGanador.color === colorApostado) {
            this.dineroUsuario += monto;
        } else {
            this.dineroUsuario -= monto;
        }
        this.saveData();
    }

    calcularPagoCalle(numeroGanador, calleApostada, monto) {
        const infoNumeroGanador = this.obtenerInformacionNumero(numeroGanador);
        if (infoNumeroGanador.calle === calleApostada) {
            this.dineroUsuario += monto * 11;
        } else {
            this.dineroUsuario -= monto;
        }
        this.saveData();
    }

    calcularPagoDocena(numeroGanador, docenaApostada, monto) {
        const infoNumeroGanador = this.obtenerInformacionNumero(numeroGanador);
        if (infoNumeroGanador.docena === docenaApostada) {
            this.dineroUsuario += monto * 2;
        } else {
            this.dineroUsuario -= monto;
        }
        this.saveData();
    }

    calcularPagoParImpar(numeroGanador, parImparApostado, monto) {
        const esPar = numeroGanador % 2 === 0;
        if ((esPar && parImparApostado === "1") || (!esPar && parImparApostado === "2")) {
            this.dineroUsuario += monto;
        } else {
            this.dineroUsuario -= monto;
        }
        this.saveData();
    }

    saveData() {
        const data = {
            dineroUsuario: this.dineroUsuario,
            ultimosNumerosGanadores: this.ultimosNumerosGanadores
        };
        localStorage.setItem('ruletaData', JSON.stringify(data));
    }

    getDineroUsuario() {
        const data = JSON.parse(localStorage.getItem('ruletaData'));
        return data ? data.dineroUsuario : 100;
    }

    getUltimosNumerosGanadores() {
        const data = JSON.parse(localStorage.getItem('ruletaData'));
        return data ? data.ultimosNumerosGanadores : [];
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new Ruleta();
});

