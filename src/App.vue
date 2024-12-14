<script setup lang="ts">
import useCARDIAC from './composables/useCARDIAC';

import MyButton from './components/Button.vue';
import DataStrip from './components/DataStrip.vue';
import Memory from './components/Memory.vue';
import Strip from './components/Strip.vue';

import { formatContentLen } from './utils/format';

const {
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
} = useCARDIAC();

function execute_slow() {
	const intervalo = setInterval(() => {
		let res;

		try {
			res = execute();
		} catch (err) {
			res = 900;
		}

		if (res === 900) {
			clearInterval(intervalo);
		}
	}, 100);
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

	inputStrip.value.strip = [
		2, 800, 10, 100, 11, 605, 12, 104, 13, 322, 14, 505, 15, 105, 16, 200, 17, 605, 18, 104, 19, 700, 20, 604, 21, 812,
		22, 900, 4, 9, 2, 810, 0,
	];
}
</script>

<template>
	<div class="container mx-auto py-3">
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
			<MyButton @click="execute_slow">Ejecutar paso a paso</MyButton>
		</div>

		<div class="flex gap-8 h-[390px] mb-8">
			<Strip :min="0" :max="1" :number-strip="1" v-model:instr="instrStrip[0]" />
			<Strip :min="0" :max="9" :number-strip="2" v-model:instr="instrStrip[1]" />
			<Strip :min="0" :max="9" :number-strip="3" v-model:instr="instrStrip[2]" />
			<Strip :min="0" :max="9" :number-strip="4" v-model:instr="instrStrip[3]" />
		</div>

		<div class="flex gap-8">
			<DataStrip title="Tarjeta de Entrada" :data="inputStrip" />
			<DataStrip title="Tarjeta de Salida" :data="outputStrip" />

			<Memory :pc="pc" :data="mem" />
		</div>
	</div>
</template>

<style scoped></style>
