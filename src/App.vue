<script setup lang="ts">
import { computed, ref } from 'vue';

const stripValues = ref([0, 4, 2, 8]);
// const pc = ref(0);
// const e1 = ref(new Array(25).fill(''));
// const s1 = ref(new Array(25).fill(''));
// const mem = ref(new Array(100).fill(''));

const instructions = [
	['Copia el contenido de E1 en el casillero', 'y avanza la tarjeta E1'],
	['Poné el acumulador al contenido del casillero'],
	['Suma el contenido del casillero', 'al acumulador'],
	['Move el puntero al casillero'],
	['Cambia el acumulador', 'lugares a la izquierda, luego', 'lugares a la derecha'],
	['Copia el contenido del casillero', 'en S1 y avanza la tarjeta'],
	['Copia el acumulador al casillero'],
	['Resta el contenido del casillero', 'con el acumulador'],
	['Mové el puntero al casillero', 'y suma la locación original al casillero 99'],
];

const accOperation = computed(() => {
	return stripValues.value[0] == 0 ? '+' : '-';
});

const regInstruction = computed(() => {
	return `${stripValues.value[1]}${stripValues.value[2]}${stripValues.value[3]}`;
});

const decodeInstruction = computed(() => {
	let decode = '';
	const inst = stripValues.value[1];

	if (inst == 9) return decode;

	if (instructions[inst].length < 3) {
		decode = `${instructions[inst][0]} '${stripValues.value[2]}${stripValues.value[3]}'`;
	} else if (instructions[inst].length == 3) {
		decode = `${instructions[inst][0]} '${stripValues.value[2]}' ${instructions[inst][1]} '${stripValues.value[3]}' ${instructions[inst][2]}`;
	}

	if (instructions[inst].length == 2) {
		decode += ' ' + instructions[inst][1];
	}

	return decode;
});
</script>

<template>
	<div class="container mx-auto pt-3">
		<h1 class="text-3xl font-bold underline mb-8">CARDIAC Online</h1>

		<label class="block mb-4">
			Tira N° 1 -
			<input type="number" name="tira_1" id="tira_1" min="0" max="1" v-model="stripValues[0]" />
		</label>
		<label class="block mb-4">
			Tira N° 2 -
			<input type="number" name="tira_2" id="tira_2" min="0" max="9" v-model="stripValues[1]" />
		</label>
		<label class="block mb-4">
			Tira N° 3 -
			<input type="number" name="tira_3" id="tira_3" min="0" max="9" v-model="stripValues[2]" />
		</label>
		<label class="block mb-4">
			Tira N° 4 -
			<input type="number" name="tira_4" id="tira_4" min="0" max="9" v-model="stripValues[3]" />
		</label>

		<div class="my-5">
			<p class="mb-2" v-if="stripValues[1] == 9">Se termino</p>

			<p>Registro de instrucción: "{{ regInstruction }}"</p>

			<p>La operación con el acumulador es: "{{ accOperation }}"</p>

			<p>Decodificador de instrucción: "{{ decodeInstruction }}"</p>
		</div>
	</div>
</template>

<style scoped></style>
