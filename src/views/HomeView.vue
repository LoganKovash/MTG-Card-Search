<template>
  <div>
    <h1>Magic Cards</h1>
    <input v-model="search" placeholder="Search by name" />
    <button @click="fetchCards">Search</button>

    <ul>
      <li v-for="card in cards" :key="card.id">
        {{ card.name }} - {{ card.set }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { getCards } from '@/services/mtgApi';

const cards = ref([]);
const search = ref('');

const fetchCards = async () => {
  cards.value = await getCards(search.value);
};
</script>
