<!-- src/components/inc/ProjectTable.vue -->
<template>
	<h3>Draggable table</h3>
	<div>
		<input v-model="newProjectName" placeholder="Введите название проекта" />
		<button @click="addProject">Добавить проект</button>
	</div>
	<draggable v-model="allProjectsData" item-key="id" @end="onDragEnd">
		<template #item="{ element }">
			<div class="list-group-item"
				@dblclick="async () => { setСurrentModal('project-modal'); await goToProjectModal(element.id); }">
				<span>{{ element.name }}</span>
				<button @click="deleteProject(element.id)">Удалить</button>
			</div>
		</template>
	</draggable>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import api from '$api/api';
import draggable from "vuedraggable";

import { useStore } from 'vuex';
const store = useStore();

let newProjectName = ref('');
let allProjectsData = ref([]);
let choosenProjectData = ref('');


function setСurrentModal(newType) {
	store.dispatch('setCurrentModal', newType);
}

const fetchProjects = async () => {
	try {
		const response = await api.get("projects");
		let data = response.data;
		data.sort((a, b) => a.order - b.order);
		allProjectsData.value=data;
	} catch (error) {
		console.error("Ошибка при получении проектов:", error);
	}
};
const addProject = async () => {
	if (!newProjectName.value) return;
	try {
		let response = await api.post("projects", { name: newProjectName.value });
		allProjectsData.value.push(response.data);
		newProjectName.value="";
	} catch (error) {
		console.error("Ошибка при добавлении проекта:", error);
	}
};
const deleteProject = async (id) => {
	try {
		await api.delete(`projects/${id}`);
		allProjectsData.value.filter(project => project.id !== id);
	} catch (error) {
		console.error("Ошибка при удалении проекта:", error);
	}
};
const updateProjectOrder = async () => {
	try {
		// Создаем массив с обновленным порядком
		const updatedOrder = allProjectsData.value.map((item, index) => ({
			id:item.id,
			order: index + 1 // Увеличиваем на 1, чтобы порядок начинался с 1
		}));
		await api.patch('projects/updateOrder', updatedOrder);
	} catch (error) {
		console.error("Ошибка при обновлении порядка проектов:", error);
	}
};
const getProject = async (projectId) => {
	try {
		const response = await api.get(`projects/${projectId}`);
		choosenProjectData = response.data;
		store.dispatch('setChoosenProjectData', response.data);
	} catch (error) {
		console.error("getProject:", error);
	}
};

const onDragEnd = () => {
	updateProjectOrder();
};

const goToProjectModal = async (projectId) => {
	await getProject(projectId);
};

onMounted(async () => {
	await fetchProjects();
});

</script>