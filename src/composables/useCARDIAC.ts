import { computed, ref } from 'vue';

export default function useCARDIAC() {
	const pc = ref(0);
	const acc = ref(0);
	const instrStrip = ref<number[]>(new Array(4).fill(0));
	const inputStrip = ref<{ strip: number[]; curr: number }>({ strip: new Array(25).fill(0), curr: 0 });
	const outputStrip = ref<{ strip: number[]; curr: number }>({ strip: new Array(25).fill(0), curr: 0 });
	const mem = ref<number[]>(new Array(100).fill(0));

	const instructions = [
		['Copia el contenido de la Entrada en el casillero', 'y avanza la tarjeta Entrada'],
		['Poné el acumulador al contenido del casillero'],
		['Suma el contenido del casillero', 'al acumulador'],
		['Move el puntero al casillero'],
		['Cambia el acumulador', 'lugares a la izquierda, luego', 'lugares a la derecha'],
		['Copia el contenido del casillero', 'en la Salida y avanza la tarjeta'],
		['Copia el acumulador al casillero'],
		['Resta el contenido del casillero', 'con el acumulador'],
		['Mové el puntero al casillero', 'y suma la locación original al casillero 99'],
		['Se finaliza el programa'],
	];

	const accOperation = computed(() => {
		return instrStrip.value[0] == 0 ? '+' : '-';
	});

	const regInstruction = computed(() => {
		return `${instrStrip.value[1]}${instrStrip.value[2]}${instrStrip.value[3]}`;
	});

	const decodeInstruction = computed(() => {
		const instr = instrStrip.value[1];

		// Fin del programa
		if (instr == 9) return instructions[instr][0];

		let decode = '';
		if (instructions[instr].length < 3) {
			// Decodificación 'frase + nn'
			decode = `${instructions[instr][0]} '${instrStrip.value[2]}${instrStrip.value[3]}'`;
		} else if (instructions[instr].length == 3) {
			// Decodificación 'frase + n + frase + n + frase'
			decode = `${instructions[instr][0]} '${instrStrip.value[2]}' ${instructions[instr][1]} '${instrStrip.value[3]}' ${instructions[instr][2]}`;
		}

		if (instructions[instr].length == 2) {
			// Decodificación 'frase + nn + frase' (se modifica el primer if para añadir la ultima frase)
			decode += ' ' + instructions[instr][1];
		}

		return decode;
	});

	function execute() {
		// Se obtiene la instrucción a ejecutar
		const instruction = mem.value[pc.value].toString().padStart(3, '0');

		if (instruction.length != 3 || instruction == '000') throw new Error('Instrucción invalida');

		const instr = parseInt(instruction[0]);

		if (instr == 9) {
			instrStrip.value[1] = instr;
			instrStrip.value[2] = 0;
			instrStrip.value[3] = 0;
			return 900;
		}

		const inst2 = parseInt(instruction[1]);
		const inst3 = parseInt(instruction[2]);

		instrStrip.value[0] = instr == 7 ? 1 : 0;
		instrStrip.value[1] = instr;
		instrStrip.value[2] = inst2;
		instrStrip.value[3] = inst3;

		pc.value++;

		let a, b, temp;
		switch (instr) {
			case 0:
				mem.value[inst2 * 10 + inst3] = inputStrip.value.strip[inputStrip.value.curr];
				inputStrip.value.curr++;
				break;
			case 1:
				acc.value = mem.value[inst2 * 10 + inst3];
				break;
			case 2:
				a = mem.value[inst2 * 10 + inst3];
				b = acc.value;

				temp = a + b;

				acc.value = temp % 10000;
				break;
			case 3:
				if (acc.value < 0) {
					pc.value = inst2 * 10 + inst3;
				}
				break;
			case 4:
				temp = acc.value;
				temp = temp * 10 ** inst2;
				temp = temp % 10000;
				temp = Math.trunc(temp / 10 ** inst3);

				acc.value = temp;
				break;
			case 5:
				outputStrip.value.strip[outputStrip.value.curr] = mem.value[inst2 * 10 + inst3];
				outputStrip.value.curr++;
				break;
			case 6:
				temp = acc.value % 1000;
				mem.value[inst2 * 10 + inst3] = temp;
				break;
			case 7:
				a = mem.value[inst2 * 10 + inst3];
				b = acc.value;

				acc.value = b - a;
				break;
			case 8:
				mem.value[99] = 800 + pc.value;

				pc.value = inst2 * 10 + inst3;
				break;

			default:
				throw new Error('Instrucción no valida');
		}
	}

	function init_cardiac() {
		acc.value = 0;
		pc.value = 0;

		instrStrip.value = new Array(4).fill(0);

		mem.value.fill(0);
		mem.value[0] = 1;
		mem.value[99] = 800;

		inputStrip.value.strip = new Array(25).fill(0);
		inputStrip.value.curr = 0;
		outputStrip.value.strip = new Array(25).fill(0);
		outputStrip.value.curr = 0;
	}

	init_cardiac();

	return {
		pc,
		acc,
		instrStrip,
		inputStrip,
		outputStrip,
		mem,
		accOperation,
		regInstruction,
		decodeInstruction,
		execute,
		init_cardiac,
	};
}
