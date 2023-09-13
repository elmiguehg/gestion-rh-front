<script setup>
import axios from 'axios';
import { ref, onMounted } from 'vue';
import { confirmation } from '../../functions';
import { useAuthStore } from '../../stores/auth';
const authStore = useAuthStore();
axios.defaults.headers.common['Authorization'] = 'Bearer ' + authStore.authToken;
onMounted(() => { getWorkers() });
const workers = ref([]);
const load = ref(false);
const getWorkers = async () => {
   await axios.get('http://localhost:8000/api/workers').then(
      response => (workers.value = response.data));
   load.value = true;
}
const deleteWorker = (id, name) => {
   confirmation(name, ('http://localhost:8000/api/workers/' + id), '/workers');
}
</script>
<template>
   <div class="row">
      <div class="col-md-4 offset-md-4">
         <div class="row mt-3 d-grid col-5 mx-auto">
            <router-link :to="{ name: 'workers.create' }" class="btn btn-dark">
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
                     <th>Apellido</th>
                     <th>DNI</th>
                     <th>Fecha de nacimiento</th>
                     <th>Direccion</th>
                     <th>Foto</th>
                     <th></th>
                     <th></th>
                  </tr>
               </thead>
               <tbody class="table-group-divider">
                  <tr v-for="work, i in workers" :key="work.id">
                     <td>{{ (i + 1) }}</td>
                     <td>{{ work.name }}</td>
                     <td>{{ work.last_name }}</td>
                     <td>{{ work.dni }}</td>
                     <td>{{ work.birthdate }}</td>
                     <td>{{ work.address }}</td>
                     <td>
                        <img v-if="work.foto" style="width:70px !important;" :src="work.foto" class="img-thumbnail" alt="">
                        <img v-else td style="width:70px !important;" src="/UserFoto.jpg" class="img-thumbnail" alt="">
                     </td>
                     <td>
                        <router-link :to="{ path: '/workers/edit/' + work.id }" class="btn btn-warning">
                           <i class="fa-solid fa-edit"></i>
                        </router-link>
                     </td>
                     <td>
                        <button class="btn btn-danger" 
                        @click="$event => deleteWorker(work.id, work.name)">
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