<script setup>
import { ref,onMounted } from 'vue';
import { sendRequest } from '../../functions';
import { useAuthStore } from '../../stores/auth';
import { useRoute } from 'vue-router';
import axios from 'axios';
import SelectInput from '../../components/SelectInput.vue';
const route = useRoute();
const authStore = useAuthStore();
axios.defaults.headers.common['Authorization'] = 'Bearer '+authStore.authToken;
const form = ref({ name:'', importance:'', is_boss:'', category_id:''});
const categories = ref([]);
const id = ref(route.params.id);
onMounted( () => {getJobtitle(), getCategories()});

const getJobtitle = () =>{
    axios.get('http://localhost:8000/api/jobtitles/'+id.value).then(
        response => (
            form.value.name = response.data.data.name,
            form.value.importance = response.data.data.importance,
            form.value.is_boss = response.data.data.is_boss,
            form.value.category_id = response.data.data.category_id         
        )
    );
}

const getCategories = async () =>{
await axios.get('http://localhost:8000/api/categories').then(
response =>(categories.value = response.data));
}

const save = () =>{
   event.preventDefault();
    sendRequest('PUT', form.value, ('http://localhost:8000/api/jobtitles/'+id.value),'/jobtitles');
}
</script>
<template>
    <div class="row mt-5">
        <div class="col-md-4 offset-md-4">
         <div class="card border border-success">
            <div class="card-header bg-success border border-success"></div>
            <div class="card-body">
            <form @submit.prevent="save">
               <div class="input-group mb-3">
                  <span class="input-group-text">
                     <i class="fa-solid fa-building"></i>
                  </span>
                  <input autofocus type="text" v-model="form.name" placeholder="Nombre" class="form-control">
               </div>
               
               <div class="input-group mb-3">
                  <span class="input-group-text">
                     <i class="fa-solid fa-building"></i>
                  </span>
                  <input autofocus type="text" v-model="form.importance" placeholder="Importancia" class="form-control">
               </div>
               <div class="input-group mb-3">
                  <span class="input-group-text">
                     <i class="fa-solid fa-building"></i>
                  </span>
                  <SelectInput v-model="form.category_id" :options="categories"
                    class="form-select" required>
                  </SelectInput>
               </div>
               <div class="offset-md-5 mb-3">
                  <input type="checkbox" id="checkbox" v-model="form.is_boss">
                     <label for="checkbox"> Es jefe!</label>
               </div>
               <div class="d-grid col-10 mx-auto">
                  <button class="btn btn-dark">
                     <i class="fa-solid fa-save"></i> Guardar</button>
               </div>
            </form>
         </div>
         </div>
      </div>
    </div>
</template>