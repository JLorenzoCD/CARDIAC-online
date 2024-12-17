<script setup lang="ts">
import Cell from './Cell.vue';

const { title, data } = defineProps<{
	title: string;
	data: { strip: number[]; curr: number };
}>();

const emit = defineEmits(['update:data']);
</script>

<template>
	<article>
		{{ title }}
		<ul class="flex flex-col">
			<template v-for="(_, index) in data.strip" :key="index">
				<Cell v-model:content="data.strip[index]" :index="index + 1" :is-curr="data.curr == index" />
			</template>
		</ul>
	</article>
</template>

<style scoped></style>
