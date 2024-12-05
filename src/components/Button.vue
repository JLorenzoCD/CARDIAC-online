<script setup lang="ts">
import { useAttrs } from 'vue';

// defineProps<{
// 	customClass?: string;
// }>();

// Obtenemos los atributos que no se declaran como props
const attrs = useAttrs();
</script>

<template>
	<button
		v-bind="attrs"
		class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
	>
		<slot />
	</button>
</template>
