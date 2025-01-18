<!-- src/components/Table.vue -->

<template>
	<div v-if="currentModal === 'projects'">
		<ProjectTable />
	</div>
	<div v-else-if="currentModal == 'project-modal'">
		<ProjectModal />
	</div>
</template>

<script setup>
// import ProjectsTable from '@components/DraggableTable.vue';
import ProjectTable from '$inc/ProjectTable.vue';
import ProjectModal from '$inc/ProjectModal.vue';
import { computed, watch } from 'vue';
import { useStore } from 'vuex';
const store = useStore();

let currentModal = computed(() => store.state.currentModal);


</script>

<style scoped></style>