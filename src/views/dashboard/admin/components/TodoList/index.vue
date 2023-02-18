<template>
  <section class="todoapp">
    <!-- header -->
    <header class="header">
      <input class="new-todo" autocomplete="off" placeholder="Todo List" @keyup.enter="addTodo">
    </header>
    <!-- main section -->
    <section v-show="todos.length" class="main">
      <input id="toggle-all" :checked="allChecked" class="toggle-all" type="checkbox"
        @change="toggleAll({ done: !allChecked })">
      <label for="toggle-all" />
      <ul class="todo-list">
        <todo v-for="(todo, index) in filteredTodos" :key="index" :todo="todo" @toggleTodo="toggleTodo"
          @editTodo="editTodo" @deleteTodo="deleteTodo" />
      </ul>
    </section>
    <!-- footer -->
    <footer v-show="todos.length" class="footer">
      <span class="todo-count">
        <strong>{{ remaining }}</strong>
        {{ pluralize(remaining, 'item') }} left
      </span>
      <ul class="filters">
        <li v-for="(val, key) in filters" :key="key">
          <a :class="{ selected: visibility === key }" @click.prevent="visibility = key">{{ capitalize(key) }}</a>
        </li>
      </ul>
    </footer>
  </section>
</template>

<script setup lang="ts">
import Todo from './Todo.vue'

const STORAGE_KEY = 'todos'
interface Todo { text: string, done: boolean }
let todos = reactive([
  { text: 'star this repository', done: false },
  { text: 'fork this repository', done: false },
  { text: 'follow author', done: false },
  { text: 'vue-element-admin', done: true },
  { text: 'vue', done: true },
  { text: 'element-ui', done: true },
  { text: 'axios', done: true },
  { text: 'webpack', done: true }
]) as Array<Todo>
const filters = reactive<Record<string, (e: Array<Todo>) => Array<Todo>>>({
  all: todos => todos,
  active: todos => todos.filter(todo => !todo.done),
  completed: todos => todos.filter(todo => todo.done)
})
const visibility = ref('all')
const allChecked = computed(() => todos.every(todo => todo.done))
const filteredTodos = computed(() => filters[visibility.value](todos))
const remaining = computed(() => todos.filter(todo => !todo.done).length)

const setLocalStorage = () => {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
}

const addTodo = (e: any) => {
  const text = e.target.value
  if (text.trim()) {
    todos.push({
      text,
      done: false
    })
    setLocalStorage()
  }
  e.target.value = ''
}
const toggleTodo = (val: Todo) => {
  val.done = !val.done
  setLocalStorage()
}
const deleteTodo = (todo: Todo) => {
  todos.splice(todos.indexOf(todo), 1)
  setLocalStorage()
}
const editTodo = ({ todo, value }: { todo: Todo, value: string }) => {
  todo.text = value
  setLocalStorage()
}
const toggleAll = (val: Partial<Todo>) => {
  todos.forEach(todo => {
    todo.done = val.done!
    setLocalStorage()
  })
}
const pluralize = (n: number, w: string) => n === 1 ? w : w + 's'
const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)
</script>

<style lang="scss">
@import './index.scss';
</style>
