<template lang="pug">
  .container
    h1 Magic Card Search
    .description Enter a card name below and click on it see all the details of that card

    .search-container
      input(v-model="search" placeholder="Search by name")
      button(@click="fetchCards") Search

      Spinner(v-if="loading")

    ul.results
      li.result(v-for="card in cards" :key="card.id")
        router-link(:to="`/card/${card.id}`") {{ card.name }} - {{ card.set }}


</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { getCards } from '@/services/mtgApi';
import { RouterLink } from 'vue-router';
import Spinner from '@/components/Spinner.vue';

const cards = ref([]);
const search = ref('');
const loading = ref(false);

const fetchCards = async () => {
  loading.value = true;
  try {
    cards.value = await getCards(search.value);
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
};
</script>

<style lang="scss">
.container {
  padding: 1em;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: 'Inter', sans-serif;

  h1 {
    font-family: 'Cinzel', serif;
    font-size: 2rem;
    margin-bottom: 0.5em;
  }

  .description {
    margin-bottom: 1em;
    font-size: 1rem;
    color: #ccc;
  }

  .search-container {
    padding: 1em;
    width: 100%;

    input {
      font-family: 'Inter', sans-serif;
      width: 40vw;
      padding: 0.5em;
      margin-right: 0.5em;
    }

    button {
      font-family: 'Inter', sans-serif;
      padding: 0.5em 1em;
      background-color: #444;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;

      &:hover {
        background-color: #666;
      }
    }
  }

  .results {
    width: 100%;
    list-style-type: none;
    padding: 0;

    .result {
      padding: 10px;
      margin-bottom: 5px;
      background: #222;
      color: white;
      border-radius: 4px;
      transition: background 0.3s ease;

      &:hover {
        background: #333;
      }
    }
  }
}
</style>
