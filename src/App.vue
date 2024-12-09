<script setup lang="ts">
import { computed, ref } from 'vue';

import MyButton from './components/Button.vue';
import Cell from './components/Cell.vue';

import { formatContentLen } from './utils/format';

const pc = ref(0);
const acc = ref(0);
const instrStrip = ref<number[]>(new Array(4).fill(0));
const inputStrip = ref<{ strip: number[]; curr: number }>({ strip: new Array(25).fill(0), curr: 0 });
const outputStrip = ref<{ strip: number[]; curr: number }>({ strip: new Array(25).fill(0), curr: 0 });
const mem = ref<number[]>(new Array(100).fill(0));

init_cardiac();

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

	instrStrip.value.fill(0);

	mem.value.fill(0);
	mem.value[0] = 1;
	mem.value[99] = 800;

	inputStrip.value.strip.fill(0);
	inputStrip.value.curr = 0;
	outputStrip.value.strip.fill(0);
	outputStrip.value.curr = 0;
}

function init_example_sum() {
	init_cardiac();

	inputStrip.value.strip[0] = 802;
	inputStrip.value.strip[1] = 40;
	inputStrip.value.strip[2] = 23;

	mem.value[2] = 90;
	mem.value[3] = 91;
	mem.value[4] = 190;
	mem.value[5] = 291;
	mem.value[6] = 692;
	mem.value[7] = 592;
	mem.value[8] = 900;
}

function init_example_count() {
	init_cardiac();

	inputStrip.value.strip[0] = 2;
	inputStrip.value.strip[1] = 800;
	inputStrip.value.strip[2] = 10;
	inputStrip.value.strip[3] = 100;
	inputStrip.value.strip[4] = 11;
	inputStrip.value.strip[5] = 605;
	inputStrip.value.strip[6] = 12;
	inputStrip.value.strip[7] = 104;
	inputStrip.value.strip[8] = 13;
	inputStrip.value.strip[9] = 322;
	inputStrip.value.strip[10] = 14;
	inputStrip.value.strip[11] = 505;
	inputStrip.value.strip[12] = 15;
	inputStrip.value.strip[13] = 105;
	inputStrip.value.strip[14] = 16;
	inputStrip.value.strip[15] = 200;
	inputStrip.value.strip[16] = 17;
	inputStrip.value.strip[17] = 605;
	inputStrip.value.strip[18] = 18;
	inputStrip.value.strip[19] = 104;
	inputStrip.value.strip[20] = 19;
	inputStrip.value.strip[21] = 700;
	inputStrip.value.strip[22] = 20;
	inputStrip.value.strip[23] = 604;
	inputStrip.value.strip[24] = 21;
	inputStrip.value.strip[25] = 812;
	inputStrip.value.strip[26] = 22;
	inputStrip.value.strip[27] = 900;
	inputStrip.value.strip[28] = 4;
	inputStrip.value.strip[29] = 9;
	inputStrip.value.strip[30] = 2;
	inputStrip.value.strip[31] = 810;
}
</script>

<template>
	<div class="container mx-auto pt-3">
		<h1 class="text-3xl font-bold underline mb-8">CARDIAC Online</h1>

		<MyButton class="mr-5" @click="init_cardiac">Resetear</MyButton>
		<MyButton class="mr-5" @click="init_example_sum">Ejemplo Suma</MyButton>
		<MyButton @click="init_example_count">Ejemplo Contador</MyButton>

		<div class="my-5">
			<p>PC: {{ pc }}</p>
			<p>Acumulador: "{{ formatContentLen(acc, 4) }}"</p>
			<p>Registro de la anterior instrucción: "{{ regInstruction }}"</p>
			<p>La operación con el acumulador es: "{{ accOperation }}"</p>
			<p>Decodificador de la anterior instrucción: "{{ decodeInstruction }}"</p>

			<MyButton class="mr-5" @click="execute">Ejecutar</MyButton>
			<MyButton @click="init_cardiac">Resetear</MyButton>
		</div>

		<div class="flex gap-8">
			<label class="block mb-4">
				Tira N° 1 -
				<input type="number" name="tira_1" id="tira_1" min="0" max="1" v-model="instrStrip[0]" />
			</label>
			<label class="block mb-4">
				Tira N° 2 -
				<input type="number" name="tira_2" id="tira_2" min="0" max="9" v-model="instrStrip[1]" />
			</label>
			<label class="block mb-4">
				Tira N° 3 -
				<input type="number" name="tira_3" id="tira_3" min="0" max="9" v-model="instrStrip[2]" />
			</label>
			<label class="block mb-4">
				Tira N° 4 -
				<input type="number" name="tira_4" id="tira_4" min="0" max="9" v-model="instrStrip[3]" />
			</label>
		</div>

		<div class="flex gap-8">
			<article>
				Tarjeta de Entrada
				<ul class="flex flex-col">
					<Cell
						v-for="(e, index) in inputStrip.strip"
						:content="formatContentLen(e)"
						:index="index + 1"
						:is-curr="inputStrip.curr == index"
					/>
				</ul>
			</article>

			<article>
				Tarjeta de Salida
				<ul class="flex flex-col">
					<Cell
						v-for="(s, index) in outputStrip.strip"
						:content="formatContentLen(s)"
						:index="index + 1"
						:is-curr="outputStrip.curr == index"
					/>
				</ul>
			</article>

			<article>
				Celdas de Memoria
				<ul class="flex flex-col flex-wrap h-[408px]">
					<Cell v-for="(m, index) in mem" :content="formatContentLen(m)" :index="index" :is-curr="pc == index" />
				</ul>
			</article>
		</div>
	</div>
</template>

<style scoped></style>
