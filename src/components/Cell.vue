<script setup lang="ts">
import { defineProps } from 'vue';

defineProps<{
	content: string;
	index: number;
	isCurr: boolean;
}>();
</script>

<template>
	<li class="border border-black h-6 w-[92px] text-center flex justify-between">
		<span class="bg-gray-200 w-7 border-r border-black text-xs p-1">{{ index.toString().padStart(2, '0') }}</span>
		<p :class="{ 'w-16': true, 'bg-emerald-200': isCurr }">{{ content == '000' ? '' : content }}</p>
	</li>
</template>
