<!-- src/components/Projects.vue -->
<template>
	<h3>Draggable table</h3>
	<div>
		<input v-model="newProject" placeholder="Введите название проекта" />
		<button @click="addProject">Добавить проект</button>
	</div>
	<draggable v-model="projects" item-key="id" @end="onDragEnd">
		<template #item="{ element }">
			<div class="list-group-item" @dblclick="goToProjectTasks(element.id)">
				<span>{{ element.name }}</span>
				<button @click="deleteProject(element.id)">Удалить</button>
			</div>
		</template>
	</draggable>
</template>

<script>
import api from '../api';
import draggable from "vuedraggable";

export default {
	name: "projects",
	display: "Table",
	order: 8,
	components: {
		draggable,
	},
	data() {
		return {
			projects: [],
			newProject: "",
		};
	},
	methods: {
		async fetchProjects() {
			try {
				const response = await api.get("http://localhost:5000/api/projects");
				this.projects = response.data;
				this.projects.sort((a, b) => a.order - b.order);
				console.log(response.data);
			} catch (error) {
				console.error("Ошибка при получении проектов:", error);
			}
		},
		async addProject() {
			if (!this.newProject) return;
			try {
				const response = await api.post("projects", { name: this.newProject });
				this.projects.push(response.data);
				this.newProject = "";
			} catch (error) {
				console.error("Ошибка при добавлении проекта:", error);
			}
		},
		async deleteProject(id) {
			try {
				await api.delete(`projects/${id}`);
				this.projects = this.list.filter(project => project.id !== id);
			} catch (error) {
				console.error("Ошибка при удалении проекта:", error);
			}
		},
		async updateProjectOrder() {
			console.log("updateProjectOrder");
			try {
				// Создаем массив с обновленным порядком
				const updatedOrder = this.projects.map((item, index) => ({
					id: item.id,
					order: index + 1 // Увеличиваем на 1, чтобы порядок начинался с 1
				}));
				console.log(updatedOrder);
				// Отправляем запрос на сервер для обновления порядка
				await api.patch('projects/updateOrder', updatedOrder);
			} catch (error) {
				console.error("Ошибка при обновлении порядка проектов:", error);
			}
		},
		async onDragEnd() {
			this.updateProjectOrder();
		},
		goToProjectTasks(projectId) {
			this.$router.push(`/project/${projectId}`);
		}
	},
	created() {
		this.fetchProjects();
	},
};
</script>
<style scoped>
.buttons {
	margin-top: 35px;
}
</style>