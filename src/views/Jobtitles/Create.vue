<script setup>
import { ref, onMounted, nextTick } from 'vue';
import { sendRequest } from '../../functions';
import { useAuthStore } from '../../stores/auth';
import axios from 'axios';
import SelectInput from '../../components/SelectInput.vue';
const authStore = useAuthStore();
axios.defaults.headers.common['Authorization'] = 'Bearer '+authStore.authToken;
const form = ref({ name:'',importance:'1', is_boss:'0', category_id:''});
const nameInput = ref('');
const jefe = ref();
const categories = ref([]);
onMounted( ()=> { getCategories() });

const getCategories = async () =>{
await axios.get('http://localhost:8000/api/categories').then(
response =>(categories.value = response.data));
}

const save = (event) =>{
    event.preventDefault();
    sendRequest('POST', form.value, 'http://localhost:8000/api/jobtitles','/jobtitles');
    form.value.name = '';
    form.value.importance = '';
    form.value.is_boss = '';
    form.value.category_id = '';
    nextTick( () => nameInput.value.focus());
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
                    class="form-select" placeholder="Categoria" required>
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