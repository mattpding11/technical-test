<template>
  <div class="grid grid-cols-1 md:grid-cols-2 sm:grid-cols-2 p-5">
    <div class="max-w-sm content-center rounded-lg shadow-md p-5">
      <router-link to="/characters">
        <button
          type="button"
          class="bg-[#50d71e] hover:bg-[#349611] text-gray-800 font-bold py-2 px-4 rounded-r mb-10"
        >
          <i class="cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
              />
            </svg>
          </i>
        </button>
      </router-link>

      <img
        class="rounded-t-lg w-full"
        :src="character.image"
        :alt="character.name"
      />
      <div class="p-5">
        <h5
          class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
        >
          {{ character.name }}
        </h5>
        <p :class="`mb-3 font-bold ${statusColor}`">{{ character.status }}</p>
        <p class="mb-3 font-semibold text-gray-700 dark:text-gray-400">
          {{ character.species }}
        </p>
        <p class="mb-3 font-semibold text-gray-700 dark:text-gray-400">
          {{ character.gender }}
        </p>
        <p class="mb-3 font-semibold text-gray-700 dark:text-gray-400">
          {{ character.location?.name }}
        </p>
        <i class="mb-5 font-semibold text-gray-700 dark:text-blue-400"
          >Number of comments: {{ numberComments }}</i
        >
      </div>

      <select
        ref="selectInput"
        class="text-center cursor-pointer top-32 right-20 bg-[#50d71e] text-black font-bold py-2 px-4 rounded"
      >
        <option class="text-black" selected disabled hidden value="none">
          Appearances
        </option>
        <option
          v-for="(_, index) in character.episode"
          :key="index"
          disabled
          class="text-black"
          value="none"
        >
          Episode #{{ index + 1 }}
        </option>
      </select>
    </div>

    <div class="w-full content-center rounded-lg p-5">

      <form @submit.prevent="postComment(id)" class="shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div class="mb-4">
          <label
            class="block dark:text-white text-sm font-bold mb-2"
            for="Name"
          >
            Name
          </label>
          <input
            v-model="author"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="Name"
            type="text"
            placeholder="Name"
            required
            maxlength="20"
          />
        </div>

        <div class="mb-4">
          <label
            class="block dark:text-white text-sm font-bold mb-2"
            for="Name"
          >
            Comment
          </label>
          <textarea
            v-model="comment"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="Comment"
            placeholder="Comment"
            maxlength="400"
            rows="3"
            required
          />
        </div>

        <button  type="submit" class="bg-[#50d71e] hover:bg-[#349611] text-gray-800 font-bold py-2 px-4 rounded-r mb-10">Post</button>

      <p v-if="error != null" class="font-normal text-red-800">!{{error}}¡</p>

      </form>


      <hr class="mb-2" />

      <span class="text-white font-mono font-semibold mt-5">Comments</span>

      <div class="shadow-md rounded px-8 pt-6 pb-8 mt-5">
        <div v-for="(comment, index) in comments" :key="index" class="mb-8">
          <p class="font-medium text-[#50d71e]">
            <span class="dark:text-gray-400">By</span> {{ comment.author }}
          </p>
          <i class="block dark:text-white text-sm font-mono mb-2 mt-2">
            {{ comment.comment }}
          </i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
export default {
  data(){
    return {
      author: "",
      comment: "",
    }
  },
  props: ["id"],
  setup() {
    const host = {
      local:"3000",
      docker: "3020"
    }
    const options = {
      character: ref({}),
      baseURL: ref("https://rickandmortyapi.com/api/character"),
      api: ref(`http://localhost:${host.docker}/api/v1/character`),
      comments: ref([]),
      numberComments: ref(0),
      statusColor: ref("dark:text-green-400"),
      error: ref(null)
    };


    return {
      ...options,
    };
  },
  async created() {
    await this.init()
  },
  methods: {
    async init(){
   try {
        const character = await this.getCharacter(this.id);
        const comments = await this.getComments(this.id);
        this.character = character;
        this.numberComments = comments.length;
        this.comments = comments;
      } catch (error) {
        this.$router.replace("/character")
      }
    },
    async getCharacter(id) {
      const res = await this.axios.get(this.baseURL + "/" + id);
      return res.data;
    },
    async getComments(id) {
      const res = await this.axios.get(`${this.api}/${id}/comments`);
      const comments = res.data.comments;
      return comments;
    },
    async postComment(id){
      const data = {
        characterName: this.character?.name,
        author: this.author,
        comment: this.comment,
      }
      try {
        const res = await this.axios.post(`${this.api}/${id}/comments`,data);
        if(res.status == 201){
          this.author = ""
          this.comment = ""
        }
        await this.init()
      } catch (error) {
        this.error = "Error creating comment"
      }
    },
  },
};
</script>
