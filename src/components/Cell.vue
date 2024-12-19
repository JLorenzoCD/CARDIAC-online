<script setup lang="ts">
import { formatContentLen } from '../utils/format';

const { index, isCurr } = defineProps<{
	index: number;
	isCurr: boolean;
}>();

const content = defineModel<number>('content');

function update($event: Event) {
	const value = parseInt(($event.target as HTMLInputElement).value);

	let newValue = isNaN(value) ? 0 : value;
	newValue = newValue % 1000;

	content.value = newValue;
}
</script>

<template>
	<li class="border border-black h-6 w-[92px] text-center flex justify-between">
		<span class="bg-gray-200 w-7 border-r border-black text-xs p-1">{{ index.toString().padStart(2, '0') }}</span>
		<input
			type="number"
			min="-999"
			max="999"
			:class="{ 'w-16': true, 'bg-emerald-200': isCurr }"
			:value="formatContentLen(content!)"
			@input="update"
		/>
	</li>
</template>
