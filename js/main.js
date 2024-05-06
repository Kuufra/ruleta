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
        this.dineroUsuario = 100;
        this.ultimosNumerosGanadores = [];
        
    }


    realizarApuesta() {



        while (this.dineroUsuario > 0) {
            let numeroGanador = Math.floor(Math.random() * 37); // Calculamos el numero que va a salir en la ruleta
            let infoNumeroGanador = this.obtenerInformacionNumero(numeroGanador);
            this.agregarUltimoNumeroGanador(numeroGanador);
   
            
            let monto = parseInt(prompt(`
            Ingrese el monto de la apuesta 
            SALDO ACTUAL: ${this.dineroUsuario}`));
            if (monto < 1 || monto > this.dineroUsuario || isNaN(monto)) {
                alert("Monto de apuesta no permitido");
                continue;
            }

            let tipoApuesta = prompt(`Seleccione el tipo de apuesta:
            1. PLENO
            2. COLOR
            3. FILA
            4. DOCENA
            5. PAR o IMPAR`);

            switch (tipoApuesta) {
                case "1":
                    let numeroApostado = parseInt(prompt("Seleccione el número al que desea apostar (0-36):"));
                    if (numeroApostado < 0 || numeroApostado > 36 || isNaN(numeroApostado)) {
                        alert("Número de apuesta no permitido");
                        continue;
                    }
                    this.calcularPagoNumero(numeroGanador, numeroApostado, monto);
                    break;
                case "2":
                    let colorElegido = prompt("Seleccione el color de la apuesta:\n1. Rojo\n2. Negro");
                    if (colorElegido !== "1" && colorElegido !== "2") {
                        alert("Color de apuesta no permitido");
                        continue;
                    }
                    let color = (colorElegido === "1" ? "rojo" : "negro");
                    this.calcularPagoColor(numeroGanador, color, monto);
                    break;
                case "3":
                    let filaElegida = parseInt(prompt("Seleccione la fila de la apuesta (1, 2, o 3):"));
                    if (filaElegida < 1 || filaElegida > 3 || isNaN(filaElegida)) {
                        alert("Fila de apuesta no permitida");
                        continue;
                    }
                    this.calcularPagoCalle(numeroGanador, filaElegida, monto);
                    break;
                case "4":
                    let docenaElegida = parseInt(prompt("Seleccione la docena de la apuesta (1, 2, o 3):"));
                    if (docenaElegida < 1 || docenaElegida > 3 || isNaN(docenaElegida)) {
                        alert("Docena de apuesta no permitida");
                        continue;
                    }
                    this.calcularPagoDocena(numeroGanador, docenaElegida, monto);
                    break;
                case "5":
                    let parImpar = prompt("Seleccione par o impar:\n1. Par\n2. Impar");
                    if (parImpar !== "1" && parImpar !== "2") {
                        alert("Selección no válida");
                        continue;
                    }
                    this.calcularPagoParImpar(numeroGanador, parImpar, monto);
                    break;
                default:
                    alert("Tipo de apuesta no válido");
            }
            
            this.mostrarNumeroGanador(infoNumeroGanador, numeroGanador);
            this.mostrarUltimosNumerosGanadores();
            this.mostrarDineroUsuario();
            
            if (this.dineroUsuario <= 0) {
                alert("Lo siento, no tienes suficiente dinero para seguir apostando. ¡Hasta luego!");
                break;
            }

            let continuar = confirm("¿Desea realizar otra apuesta?");
            if (!continuar) {
                break;
            }
        }

    }

    
    mostrarDineroUsuario() {
        alert(`Dinero actual del usuario: ${this.dineroUsuario}`);
    }
    mostrarNumeroGanador(infoNumero, numeroGanador) {
        alert(`
        Número ganador: ${numeroGanador}, 
        Color: ${infoNumero.color}, 
        Calle: ${infoNumero.calle}, 
        Docena: ${infoNumero.docena}`);
    }

    mostrarUltimosNumerosGanadores() {
  
        let ultimosNumeros = this.ultimosNumerosGanadores.join(', ');
        alert(`Últimos números ganadores: ${ultimosNumeros}`);
    }

    agregarUltimoNumeroGanador(numero) {

        this.ultimosNumerosGanadores.push(numero);
        if (this.ultimosNumerosGanadores.length > 5) {
            this.ultimosNumerosGanadores.shift();
        }
    }

    calcularPagoNumero(numeroGanador, numero, monto) {

        let ganar = (numero === numeroGanador); 
        if (ganar) {
            let pago = monto * 36;
            this.dineroUsuario += pago;
            alert("Número ganador: " + numeroGanador + ". ¡Has ganado! Tu pago es: " + pago);
        } else {
            this.dineroUsuario -= monto;
            alert("Número ganador: " + numeroGanador + ". Lo siento, has perdido.");
        }
    }

    calcularPagoColor(numeroGanador, color, monto) {

        let colorNumero = this.obtenerInformacionNumero(numeroGanador).color;
        let ganar = (color === colorNumero);
        if (ganar) {
            let pago = monto * 2;
            this.dineroUsuario += pago;
            alert("Número ganador: " + numeroGanador + ". ¡Has ganado! Tu pago es: " + pago);
        } else {
            this.dineroUsuario -= monto;
            alert("Número ganador: " + numeroGanador + ". Lo siento, has perdido.");
        }
    }

    calcularPagoCalle(numeroGanador, calle, monto) {

        let infoNumero = this.obtenerInformacionNumero(numeroGanador);
        let ganar = (infoNumero.calle === calle);
        if (ganar) {
            let pago = monto * 2;
            this.dineroUsuario += pago;
            alert("Número ganador: " + numeroGanador + ". ¡Has ganado! Tu pago es: " + pago);
        } else {
            this.dineroUsuario -= monto;
            alert("Número ganador: " + numeroGanador + ". Lo siento, has perdido.");
        }
    }

    calcularPagoDocena(numeroGanador, docena, monto) {

        let infoNumero = this.obtenerInformacionNumero(numeroGanador);
        let ganar = (infoNumero.docena === docena);
        if (ganar) {
            let pago = monto * 2;
            this.dineroUsuario += pago;
            alert("Número ganador: " + numeroGanador + ". ¡Has ganado! Tu pago es: " + pago);
        } else {
            this.dineroUsuario -= monto;
            alert("Número ganador: " + numeroGanador + ". Lo siento, has perdido.");
        }
    }

    calcularPagoParImpar(numeroGanador, parImpar, monto) {

        let esPar = numeroGanador % 2 === 0;

        let ganar = ((parImpar === "1" && esPar) || (parImpar === "2" && !esPar));
        if (ganar) {
            let pago = monto * 2;
            this.dineroUsuario += pago;
            alert("Número ganador: " + numeroGanador + ". ¡Has ganado! Tu pago es: " + pago);
        } else {
            this.dineroUsuario -= monto;
            alert("Número ganador: " + numeroGanador + ". Lo siento, has perdido.");
        }
    }

    obtenerInformacionNumero(numero) {
        let infoNumero = this.numerosRuleta.find(num => num.numero === numero);
        return infoNumero;
    }
}


let ruleta = new Ruleta();
ruleta.realizarApuesta();

