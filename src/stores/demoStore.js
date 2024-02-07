import { defineStore } from 'pinia'

export const useDemoListStore = defineStore('demoList', {
  state: () => ({
    //here is the initial state of the store
    demoList: [],
    id: 0,
  }),
  actions: {
    //here's the function that will be called
    addTodo(item) {
      this.demoList.push({ item, id: this.id++, completed: false });
    },
    deleteTodo(itemID) {
      this.demoList = this.demoList.filter(t => t.id !== itemID);
    },
    toggleCompleted(idToFind) {
      const todo = this.demoList.find((obj) => obj.id === idToFind);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    clearTodo() {
      this.demoList = [];
    }
  },
})
