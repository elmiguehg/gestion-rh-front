<script setup>
import axios from 'axios';
import { ref, onMounted } from 'vue';
import { confirmation } from '../../functions';
import { useAuthStore } from '../../stores/auth';
const authStore = useAuthStore();
axios.defaults.headers.common['Authorization'] = 'Bearer ' + authStore.authToken;
onMounted(() => { getJobtitles() });
const jobtitles = ref([]);
const load = ref(false);
const getJobtitles = async () => {
   await axios.get('http://localhost:8000/api/jobtitles').then(
      response => (jobtitles.value = response.data));
   load.value = true;
}
const deleteJobtitle = (id, name) => {
   confirmation(name, ('http://localhost:8000/api/jobtitles/' + id), '/jobtitles');
}
</script>
<template>
   <div class="row">
      <div class="col-md-4 offset-md-4">
         <div class="row mt-3 d-grid col-5 mx-auto">
            <router-link :to="{ name: 'jobtitles.create' }" class="btn btn-dark">
               <i class="fa-solid fa-circle-plus"></i>Add
            </router-link>
         </div>
      </div>
   </div>
   <div class="row mt-3 justify-content-center">
      <div class="col-md-10">
         <div class="card border border-white text-center" v-if="!load">
            <div class="card-body">
               <img src="/loading.gif" class="img-fluid">
            </div>
         </div>
         <div class="table-responsive text-center"  v-else>
            <table class="table table-bordered table-hover col-10">
               <thead>
                  <tr>
                     <th>#</th>
                     <th>Nombre</th>
                     <th>Importancia</th>
                     <th>Jefe</th>
                     <th>Categoria</th>
                     <th></th>
                     <th></th>
                  </tr>
               </thead>
               <tbody class="table-group-divider">
                  <tr v-for="job, i in jobtitles" :key="job.id">
                     <td>{{ (i + 1) }}</td>
                     <td>{{ job.name }}</td>
                     <td>{{ job.importance }}</td>
                     <td v-if="job.is_boss == '1'">{{ 'Si' }}</td>
                     <td v-else>{{ 'No' }}</td>
                     <td>{{ job.category }}</td>
                     <td>
                        <router-link :to="{ path: '/jobtitles/edit/' + job.id }" class="btn btn-warning">
                           <i class="fa-solid fa-edit"></i>
                        </router-link>
                     </td>
                     <td>
                        <button class="btn btn-danger" 
                        @click="$event => deleteJobtitle(job.id, job.name)">
                           <i class="fa-solid fa-trash"></i>
                        </button>
                     </td>
                  </tr>
               </tbody>
            </table>
         </div>
      </div>
   </div>
</template>