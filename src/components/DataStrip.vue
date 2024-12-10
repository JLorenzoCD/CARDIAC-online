<script setup lang="ts">
import { formatContentLen } from '../utils/format';

import Cell from './Cell.vue';

defineProps<{
	title: string;
	data: { strip: number[]; curr: number };
}>();
</script>

<template>
	<article>
		{{ title }}
		<ul class="flex flex-col">
			<Cell
				v-for="(s, index) in data.strip"
				:content="formatContentLen(s)"
				:index="index + 1"
				:is-curr="data.curr == index"
			/>
		</ul>
	</article>
</template>

<style scoped></style>
