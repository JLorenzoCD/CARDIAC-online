<script setup lang="ts">
const { min, max, numberStrip, instr } = defineProps<{
	min: number;
	max: number;

	numberStrip: number;

	instr: number;
}>();

const emit = defineEmits(['update:instr']);

function increment() {
	if (instr >= max) return;

	emit('update:instr', instr + 1);
}

function decrement() {
	if (instr <= min) return;

	emit('update:instr', instr - 1);
}
</script>

<template>
	<div>
		<p class="bg-black w-16 h-7 text-white text-center py-1 text-sm font-bold">{{ numberStrip }}</p>

		<div class="flex">
			<button
				type="button"
				@click="decrement"
				class="w-8 h-8 flex justify-center items-center bg-gray-300 hover:bg-gray-400 border border-black"
			>
				<svg class="w-6 h-6" aria-hidden="true" width="24" height="24" fill="none" viewBox="0 0 24 24">
					<path
						stroke="currentColor"
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="m5 15 7-7 7 7"
					/>
				</svg>
			</button>

			<button
				type="button"
				@click="increment"
				class="w-8 h-8 flex justify-center items-center bg-gray-300 hover:bg-gray-400 border border-black"
			>
				<svg class="w-6 h-6" aria-hidden="true" width="24" height="24" fill="none" viewBox="0 0 24 24">
					<path
						stroke="currentColor"
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="m19 9-7 7-7-7"
					/>
				</svg>
			</button>
		</div>
		<p class="w-16 text-center border">{{ instr }}</p>

		<div class="w-16 min-h-[30px] relative border-b border-x" :style="{ height: (instr + 1) * 30 + 'px' }">
			<span class="flex justify-center items-center absolute bottom-0 w-16 h-[30px]">
				<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
					<path d="M12 2a10 10 0 1 0 10 10A10.011 10.011 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8.009 8.009 0 0 1-8 8z" />
					<path d="M12 12.586 8.707 9.293l-1.414 1.414L12 15.414l4.707-4.707-1.414-1.414L12 12.586z" />
				</svg>
			</span>
		</div>
	</div>
</template>

<style scoped></style>
