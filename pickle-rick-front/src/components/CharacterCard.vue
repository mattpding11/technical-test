
<template>

   <div class="max-w-sm border border-gray-200 rounded-lg shadow-md bg-[#0F172A] dark:border-gray-700 p-5">
            <router-link :to="`/character/${character.id}`">
                <img class="rounded-t-lg w-full" :src="character.image" :alt="character.name" />
            </router-link>
            <div class="p-5"> 
                <router-link :to="`/character/${character.id}`">
                    <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{{ character.name }}</h5> 
                </router-link> 
                <p :class="`mb-3 font-bold ${statusColor}`">{{ character.status}} </p>
                <p class="mb-3 font-semibold text-gray-700 dark:text-gray-400">{{ character.species }}</p>
                <p class="mb-3 font-semibold text-gray-700 dark:text-gray-400">{{ character.gender }}</p>
                <p class="mb-3 font-semibold text-gray-700 dark:text-gray-400">{{ character.location.name }}</p>
                <p class="mb-5 font-semibold text-gray-700 dark:text-blue-400">Number of comments: {{comments}}</p> 
                <router-link :to="`/character/${character.id}`" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-5">
                    View more
                    <svg aria-hidden="true" class="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                </router-link>
            </div>
        </div>
    
</template>

<script>
export default{
    props: ["character", "statusColor", "comments"],
}
</script>


