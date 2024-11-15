<template>
	<h1>Список проектов</h1>
	<div>
		<input v-model="newProject" placeholder="Введите название проекта" />
		<button @click="addProject">Добавить проект</button>
	</div>
	<draggable v-model="projects" @end="onDragEnd">
		<template #item="{ element }">
			<div class="project-item">
				<span>{{ element.name }}</span>
				<button @click="deleteProject(element.id)">Удалить</button>
			</div>
		</template>
	</draggable>
</template>

<script>
import api from "../api";
import draggable from "vuedraggable";

export default {
	name: "App",
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
				const response = await api.get("projects");
				this.projects = response.data;
				console.log(this.projects);
			} catch (error) {
				console.error("Ошибка при получении проектов:", error);
			}
		},
		async addProject() {
			if (!this.newProject) return;
			try {
				const response = await api.post("projects", {
					name: this.newProject,
				});
				this.projects.push(response.data);
				this.newProject = "";
			} catch (error) {
				console.error("Ошибка при добавлении проекта:", error);
			}
		},
		async deleteProject(id) {
			try {
				await api.delete(`projects/${id}`);
				this.projects = this.projects.filter((project) => project.id !== id);
			} catch (error) {
				console.error("Ошибка при удалении проекта:", error);
			}
		},
		async updateProjectOrder() {
			// Здесь можно реализовать код для обновления порядка проектов на сервере
			// Например, отправить новый порядок проектов на сервер
		},
		onDragEnd() {
			this.updateProjectOrder(); // Обновить порядок на сервере после перетаскивания
		},
	},
	created() {
		this.fetchProjects();
	},
};
</script>

<style>
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	font-size: 18px;
	padding: 20px;
}

.project-item {
	display: flex;
	justify-content: space-between;
	padding: 10px;
	border: 1px solid #ccc;
	margin-bottom: 10px;
	background-color: #f9f9f9;
}
</style>