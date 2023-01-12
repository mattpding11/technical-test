<template>
  <div>

    <h1
    class="mb-4 pt-5 text-4xl font-extrabold leading-none tracking-tight text-[#50d71e] md:text-5xl lg:text-6xl text-center"
  >
    Pickle Rick App
  </h1>

  <!-- <RouterLink to={{}} > <p class="font-mono font-semibold text-center text-white"> ss</p></RouterLink> -->

  <div class="relative">
    <select ref="selectInput"
      class="absolute text-center cursor-pointer top-32 right-20 bg-blue-500 text-white font-bold py-2 px-4 rounded"
      @change="sortData"
    >
      <option class="text-black" selected disabled hidden value="none">
        Filter by
      </option>
      <option class="text-black" value="0">All</option>
      <option class="text-black" value="1">Alive</option>
      <option class="text-black" value="2">Dead</option>
      <option class="text-black" value="3">Humans</option>
      <option class="text-black" value="4">Aliens</option>
      <option class="text-black" value="5">Male</option>
      <option class="text-black" value="6">Female</option>
    </select>
  </div>

  <div class="container mx-auto">
    <br />
    <p class="font-mono font-semibold dark:text-white text-xl">
      Page #{{ page }}
    </p>
    <p class="font-mono font-semibold dark:text-white text-xl">
      Total: {{ pages }}
    </p>

    <div class="container text-center pb-7">
      <button
        v-if="prev != null"
        type="button"
        class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r"
        @click="page--"
      >
        &lt;&lt;
      </button>
      &nbsp;
      <button
        v-if="next != null"
        type="button"
        class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r"
        @click="page = page + 1"
      >
        >>
      </button>
    </div>

    <div class="grid gap-4 grid-cols-1 md:grid-cols-4 sm:grid-cols-2 p-10">
      <CharacterCard
        v-for="(character, index) in this.characters"
        :index="index"
        :key="character.id"
        :character='character'
        :comments='numberComments[character.id]'
        :statusColor='character.status == "Alive"
            ? "dark:text-green-700"
            : character.status == "Dead"
            ? "dark:text-red-700"
            : "dark:text-yellow-700"
        '
      />
    </div>

  </div>

  <div class="container text-center pb-7">
    <button
      v-if="prev != null"
      type="button"
      class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r"
      @click="page--"
    >
      &lt;&lt;
    </button>
    &nbsp;
    <button
      v-if="next != null"
      type="button"
      class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r"
      @click="page = page + 1"
    >
      >>
    </button>
  </div>

  </div>

  <!-- <main> 

      <TheWelcome />
    {{ name }}
    </main> -->
</template>

<script>
import { Fragment, ref } from "vue";
import CharacterCard from "../components/CharacterCard.vue";
import { isProxy, toRaw } from "vue";

export default {
  components: {
    CharacterCard,
    Fragment
},
  setup() {
    const host = {
      local:"3000",
      docker: "3020"
    }
    const options = {
      characters: ref([]),
      baseURL: ref("https://rickandmortyapi.com/api/character"),
      api: ref(`http://localhost:${host.docker}/api/v1/character`),
      next: ref(null),
      prev: ref(null),
      page: ref(1),
      pages: ref(0),
      numberComments:ref({})
    };

    return {
      ...options,
    };
  },
  async created() {
    await this.getCharacters();
  },
  methods: {
    async getCharacters(value = 0) {
      const res = await this.axios.get(`${this.baseURL}?page=${this.page}`);
      if (value != 0) {
        const mehods = {
          1: function (characters) {
            return characters.filter(
              (character) => character.status == "Alive"
            );
          },
          2: function (characters) {
            return characters.filter((character) => character.status == "Dead");
          },
          3: function (characters) {
            return characters.filter(
              (character) => character.species == "Human"
            );
          },
          4: function (characters) {
            return characters.filter(
              (character) => character.species == "Alien"
            );
          },
          5: function (characters) {
            return characters.filter((character) => character.gender == "Male");
          },
          6: function (characters) {
            return characters.filter(
              (character) => character.gender == "Female"
            );
          },
        };
        this.characters = mehods[value](res.data.results);

      } else {
        await res.data.results.forEach(async({id}) => {
          this.numberComments[id] = await this.getNumberComments(id) 
        })
        this.next = res.data.info.next;
        this.prev = res.data.info.prev;
        this.pages = res.data.info.pages;
        this.characters = res.data.results;
      }
    },
    async sortData(e) {
      const value = e.target.value;
      await this.getCharacters(value);
    },
    async getNumberComments(id){
      const res = await this.axios.get(`${this.api}/${id}/comments`)
      const comments = res.data.comments.length
      return comments
    },
  },
  watch: {
    async page() {
      const selectInput = this.$refs.selectInput
      selectInput.value = "none"
      await this.getCharacters();
    },
  },
};
</script>
