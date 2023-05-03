<template>
  <div>
    <div>
      <input placeholder="Enter Search Term" @input="searchTerm = $event.target.value" />
    </div>
    <div class="filters">
      <div><button @click="applyFilters({ type: 'heads' })">Filter for Heads</button></div>
      <div><button @click="applyFilters({ type: 'arms' })">Filter for Arms</button></div>
      <div><button @click="applyFilters({ type: 'torsos' })">Filter for Torsos</button></div>
      <div><button @click="applyFilters({ type: 'bases' })">Filter for Bases</button></div>
      <div><button @click="clearFilters()">Clear Filters</button></div>
      <div>Filters: {{ filters }}</div>
    </div>
  </div>
  <div>
    <ul>
      <li v-for="(result, index) in pagedResults" :key="index">
        <div><img :src="result.imageUrl" :alt="result.title" /></div>
        <div>
          <div class="title">{{ result.title }}</div>
          <div>{{ result.description }}</div>
          <div>Type: {{ result.type.substring(0, result.type.length - 1) }}</div>
        </div>
      </li>
    </ul>
  </div>
  <div>
    <button @click="prevPage()" class="button-link">Previous Page</button>
    Showing {{ currentStartIndex }} to {{ currentEndIndex }} of {{ resultCount }} results
    <button @click="nextPage()" class="button-link">Next Page</button>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

import useSearch from './useSearch';
import useFilters from './useFilters';
import usePagination from './usePagination';

const searchTerm = ref('');
const { searchResults } = useSearch(searchTerm);

const {
  filters,
  applyFilters,
  clearFilters,
  filteredResults,
} = useFilters(searchResults);

const {
  nextPage,
  prevPage,
  currentStartIndex,
  currentEndIndex,
  pagedResults,
} = usePagination(filteredResults);

const resultCount = computed(() => filteredResults.value.length);
</script>

<style scoped>
input {
  font-size: 22px;
  padding: 8px;
  width: 90%
}

img {
  width: 100px;
  margin-right: 20px;
}

ul {
  list-style-type: none;
  display: flex;
  flex-wrap: wrap;
  font-size: 20px;
}

li {
  display: flex;
  flex-basis: 100%;
  margin-bottom: 20px;
}

.title {
  font-weight: bold;
}

.button-link {
  background: none !important;
  border: none;
  padding: 0 !important;
  text-decoration: underline;
  cursor: pointer;
  color: #1e87ba;
}

.filters {
  margin-top: 10px;
  display: flex;
  font-size: 18px;
}

.filters button {
  font-size: 18px;
}

.filters>* {
  margin-right: 10px;
}
</style>
