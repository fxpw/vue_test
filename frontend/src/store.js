// src/store.js
import { createStore } from 'vuex';

const store = createStore({
	state: {
		currentModal: 'projects', // Глобальная переменная
	},
	mutations: {
		// Мутация для изменения типа текущего модала
		setCurrentModal(state, newModal) {
			state.currentModal = newModal;
		},
		// Мутация для выбора проекта
		setChoosenProjectData(state, projectData) {
			state.choosenProjectData = projectData; // заменяем текущее значение
		},
	},
	actions: {
		// Действие для обновления текущего модала
		setCurrentModal({ commit }, newModal) {
			commit('setCurrentModal', newModal);
		},
		// Действие для выбора проекта
		setChoosenProjectData({ commit }, projectData) {
			commit('setChoosenProjectData', projectData);
		},
	},
});

export default store;
