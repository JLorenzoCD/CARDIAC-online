<script setup lang="ts">
import Cell from './Cell.vue';

const { pc, data } = defineProps<{
	pc: number;
	data: number[];
}>();

const emit = defineEmits(['update:data']);
</script>

<template>
	<article>
		Celdas de Memoria
		<ul class="flex flex-col flex-wrap h-[408px]">
			<template v-for="(_, index) in data" :key="index">
				<Cell v-model:content="data[index]" :index="index" :is-curr="pc == index" />
			</template>
		</ul>
	</article>
</template>

<style scoped></style>
