<template>
	<div>
		<h3>Задачи проекта</h3>
		<div>
			<input v-model="newTask" placeholder="Введите название задачи" />
			<button @click="addTask">Добавить задачу</button>
		</div>
		<draggable v-model="tasks" item-key="id" @end="onDragEnd">
			<template #item="{ element }">
				<div class="list-group-item">
					<span>{{ element.name }}</span>
					<button @click="deleteTask(element.id)">Удалить</button>
				</div>
			</template>
		</draggable>
	</div>
</template>

<script>
import api from '../api';
import draggable from "vuedraggable";
export default {
	name: "project-tasks",
	components: {
		draggable
	},
	data() {
		return {
			tasks: [],
			newTask: ""
		};
	},
	methods: {
		async fetchTasks() {
			try {
				const response = await api.get("project-tasks");
				this.tasks = response.data;
				this.sortTasks();
			} catch (error) {
				console.error("Ошибка при получении задач:", error);
			}
		},
		async addTask() {
			if (!this.newTask) return;
			try {
				const response = await api.post("project-tasks", { name: this.newTask });
				this.tasks.push(response.data);
				this.newTask = ""; // Очистка поля ввода
			} catch (error) {
				console.error("Ошибка при добавлении задачи:", error);
			}
		},
		async deleteTask(id) {
			try {
				await api.delete(`project-tasks/${id}`);
				this.tasks = this.tasks.filter(task => task.id !== id);
			} catch (error) {
				console.error("Ошибка при удалении задачи:", error);
			}
		},
		async updateTaskOrder() {
			try {
				const updatedOrder = this.tasks.map((task, index) => ({
					id: task.id,
					order: index + 1
				}));
				await api.patch('project-tasks/updateOrder', updatedOrder);
			} catch (error) {
				console.error("Ошибка при обновлении порядка задач:", error);
			}
		},
		onDragEnd() {
			this.updateTaskOrder();
		},
		sortTasks() {
			this.tasks.sort((a, b) => a.order - b.order);
		},
	},
	created() {
		this.fetchTasks();
	}
};
</script>

<style scoped>
.list-group-item {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 10px;
	margin: 5px 0;
	border: 1px solid #ccc;
	border-radius: 5px;
}
</style>
