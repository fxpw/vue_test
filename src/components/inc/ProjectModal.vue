<!-- src/components/inc/ProjectModal.vue -->
<template>
	<h3>project-modal</h3>
	<div class="list-group-item">
		<div>
			{{ choosenProjectData}}
		</div>
		<button @click="() => { setСurrentModal('projects'); }">BACK</button>
	</div>
</template>

<script setup>
import { useStore } from 'vuex';
import { computed} from 'vue';
const store = useStore();
let choosenProjectData = computed(() => store.state.choosenProjectData);


function setСurrentModal(newType) {
	store.dispatch('setCurrentModal', newType);
}


</script>