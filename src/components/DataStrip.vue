<script setup lang="ts">
import Cell from './Cell.vue';

const { title } = defineProps<{
	title: string;
}>();

const data = defineModel<{ strip: number[]; curr: number }>('data');
</script>

<template>
	<article>
		{{ title }}
		<ul class="flex flex-col">
			<template v-for="(_, index) in data?.strip" :key="index">
				<Cell v-model:content="data!.strip[index]" :index="index + 1" :is-curr="data!.curr == index" />
			</template>
		</ul>
	</article>
</template>

<style scoped></style>
