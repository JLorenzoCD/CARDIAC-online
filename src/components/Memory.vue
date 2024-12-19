<script setup lang="ts">
import Cell from './Cell.vue';

const { pc } = defineProps<{
	pc: number;
}>();

const data = defineModel<number[]>('data');
</script>

<template>
	<article>
		Celdas de Memoria
		<ul class="flex flex-col flex-wrap h-[408px]">
			<template v-for="(_, index) in data" :key="index">
				<Cell v-model:content="data![index]" :index="index" :is-curr="pc == index" />
			</template>
		</ul>
	</article>
</template>

<style scoped></style>
