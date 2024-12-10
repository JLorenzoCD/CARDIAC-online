<script setup lang="ts">
import Cell from './Cell.vue';

import { formatContentLen } from '../utils/format';

defineProps<{
	pc: number;
	data: number[];
}>();
</script>

<template>
	<article>
		Celdas de Memoria
		<ul class="flex flex-col flex-wrap h-[408px]">
			<Cell v-for="(m, index) in data" :content="formatContentLen(m)" :index="index" :is-curr="pc == index" />
		</ul>
	</article>
</template>

<style scoped></style>
