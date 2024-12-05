<!-- src/components/Table.vue -->

<template>
	<div v-if="typeOfShow === 'projects'">
		<h3>Draggable table</h3>
		<div>
			<input v-model="newProject" placeholder="Введите название проекта" />
			<button @click="addProject">Добавить проект</button>
		</div>
		<draggable v-model="projects" item-key="id" @end="onDragEnd">
			<template #item="{ element }">
				<div class="list-group-item"
					@dblclick="async () => { typeOfShow = 'project-modal'; await goToProjectModal(element.id); }">
					<span>{{ element.name }}</span>
					<button @click="deleteProject(element.id)">Удалить</button>
				</div>
			</template>
		</draggable>
	</div>
	<div v-else-if="typeOfShow == 'project-modal'">
		<h3>project-modal</h3>
		<div class="list-group-item">
			<div>
				{{ projectName }}
			</div>
			<div>
				{{ projectData }}
			</div>
			<button @click="() => { typeOfShow = 'projects'; }">BACK</button>
		</div>
	</div>

</template>

<script setup>
// import ProjectsTable from '@components/DraggableTable.vue';
import { ref, onMounted } from 'vue';
import api from '$api/api';
import draggable from "vuedraggable";
let projects = ref([]);
let newProject = ref('');
let typeOfShow = ref('projects');
let projectName = ref('');
let projectData = ref([]);

const fetchProjects = async () => {
	try {
		const response = await api.get("projects");
		projects.value = response.data;
		projects.value.sort((a, b) => a.order - b.order);
	} catch (error) {
		console.error("Ошибка при получении проектов:", error);
	}
};
const addProject = async () => {
	if (!newProject.value) return;
	try {
		const response = await api.post("projects", { name: newProject.value });
		projects.value.push(response.data);
		newProject.value = "";
	} catch (error) {
		console.error("Ошибка при добавлении проекта:", error);
	}
};
const deleteProject = async (id) => {
	try {
		await api.delete(`projects/${id}`);
		projects.value = projects.value.filter(project => project.id !== id);
	} catch (error) {
		console.error("Ошибка при удалении проекта:", error);
	}
};
const updateProjectOrder = async () => {
	try {
		// Создаем массив с обновленным порядком
		const updatedOrder = projects.value.map((item, index) => ({
			id: item.id,
			order: index + 1 // Увеличиваем на 1, чтобы порядок начинался с 1
		}));
		console.log(updatedOrder);
		// Отправляем запрос на сервер для обновления порядка
		await api.patch('projects/updateOrder', updatedOrder);
	} catch (error) {
		console.error("Ошибка при обновлении порядка проектов:", error);
	}
};
const getProject = async (projectId) => {
	try {
		const response = await api.get(`projects/${projectId}`);
		projectName.value = response.data.name;
		projectData.value=response.data
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


<style scoped>
.buttons {
	margin-top: 35px;
}
</style>