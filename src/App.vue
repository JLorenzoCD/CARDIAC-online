<script setup lang="ts">
import { computed, ref } from 'vue';

import MyButton from './components/Button.vue';
import Cell from './components/Cell.vue';

const pc = ref(0);
const acc = ref(0);
const instrStrip = ref(new Array(4).fill(0));
const inputStrip = ref(new Array(25).fill(''));
const outputStrip = ref(new Array(25).fill(''));
const mem = ref(new Array(100).fill(''));

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
];

const accOperation = computed(() => {
	return instrStrip.value[0] == 0 ? '+' : '-';
});

const regInstruction = computed(() => {
	return `${instrStrip.value[1]}${instrStrip.value[2]}${instrStrip.value[3]}`;
});

const decodeInstruction = computed(() => {
	let decode = '';
	const instr = instrStrip.value[1];

	if (instr == 9) return decode;

	if (instructions[instr].length < 3) {
		decode = `${instructions[instr][0]} '${instrStrip.value[2]}${instrStrip.value[3]}'`;
	} else if (instructions[instr].length == 3) {
		decode = `${instructions[instr][0]} '${instrStrip.value[2]}' ${instructions[instr][1]} '${instrStrip.value[3]}' ${instructions[instr][2]}`;
	}

	if (instructions[instr].length == 2) {
		decode += ' ' + instructions[instr][1];
	}

	return decode;
});

function execute() {
	const instr = instrStrip.value[1];

	if (instr == 9) return;

	// TODO
}

function init_cardiac() {
	acc.value = 0;
	pc.value = 0;

	instrStrip.value.fill(0);

	mem.value.fill('');
	mem.value[0] = '001';

	inputStrip.value.fill('');
	outputStrip.value.fill('');

	init_example_sum();
}

function init_example_sum() {
	inputStrip.value[0] = '802';
	inputStrip.value[1] = '040';
	inputStrip.value[2] = '023';

	mem.value[2] = '090';
	mem.value[3] = '091';
	mem.value[4] = '190';
	mem.value[5] = '291';
	mem.value[6] = '692';
	mem.value[7] = '592';
	mem.value[8] = '900';
}
</script>

<template>
	<div class="container mx-auto pt-3">
		<h1 class="text-3xl font-bold underline mb-8">CARDIAC Online</h1>

		<div class="my-5">
			<p>Registro de instrucción: "{{ regInstruction }}"</p>

			<p>La operación con el acumulador es: "{{ accOperation }}"</p>

			<p>Decodificador de instrucción: "{{ decodeInstruction }}"</p>

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

		<p class="mb-2" v-if="instrStrip[1] == 9">Se termino</p>

		<div class="flex gap-8">
			<article>
				Tarjeta de Entrada
				<ul class="flex flex-col">
					<Cell v-for="(e, index) in inputStrip" :content="e" :index="index + 1" />
				</ul>
			</article>

			<article>
				Tarjeta de Salida
				<ul class="flex flex-col">
					<Cell v-for="(s, index) in outputStrip" :content="s" :index="index + 1" />
				</ul>
			</article>

			<article>
				Celdas de Memoria
				<ul class="flex flex-col flex-wrap h-[408px]">
					<Cell v-for="(m, index) in mem" :content="m" :index="index" />
				</ul>
			</article>
		</div>
	</div>
</template>

<style scoped></style>
