<template>
	<h3>Draggable table</h3>
	<div>
		<input v-model="newProject" placeholder="Введите название проекта" />
		<button @click="addProject">Добавить проект</button>
	</div>
	<draggable v-model="list" item-key="id" @end="onDragEnd">
		<template #item="{ element }">
			<div class="list-group-item">
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
	name: "table-example",
	display: "Table",
	order: 8,
	components: {
		draggable,
	},
	data() {
		return {
			list: [],
			newProject: "",
		};
	},
	methods: {
		async fetchProjects() {
			try {
				const response = await api.get("projects");
				this.list = response.data;
				this.list.sort((a, b) => a.order - b.order);
				console.log(response.data);
			} catch (error) {
				console.error("Ошибка при получении проектов:", error);
			}
		},
		async addProject() {
			if (!this.newProject) return;
			try {
				const response = await api.post("projects", { name: this.newProject });
				this.list.push(response.data);
				this.newProject = "";
			} catch (error) {
				console.error("Ошибка при добавлении проекта:", error);
			}
		},
		async deleteProject(id) {
			try {
				await api.delete(`projects/${id}`);
				this.list = this.list.filter(project => project.id !== id);
			} catch (error) {
				console.error("Ошибка при удалении проекта:", error);
			}
		},
		async updateProjectOrder() {
			console.log("updateProjectOrder");
			try {
				// Создаем массив с обновленным порядком
				const updatedOrder = this.list.map((item, index) => ({
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