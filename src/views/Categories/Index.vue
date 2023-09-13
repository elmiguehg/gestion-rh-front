<script setup>
import axios from 'axios';
import { ref, onMounted, nextTick } from 'vue';
import { confirmation, sendRequest } from '../../functions';
import { useAuthStore } from '../../stores/auth';
import Modal from '../../components/Modal.vue';
const authStore = useAuthStore();
axios.defaults.headers.common['Authorization'] = 'Bearer ' + authStore.authToken;

onMounted(() => { getCategories()});
const categories = ref([]);
const load = ref(false);
const rows = ref(0);
const form = ref({ name: '' });
const title = ref('');
const nameInput = ref('');
const operation = ref(1);
const id = ref('');
const close = ref([]);

const getCategories = async () => {
   await axios.get('http://localhost:8000/api/categories').then(
      response => (categories.value = response.data));
   load.value = true;
}
const deleteCategory = (id, name) => {
   confirmation(name, ('http://localhost:8000/api/categories/' + id), '/categories');
}
const openModal = (op, name, category) => {
   clear();
   setTimeout(() => nextTick(() => nameInput.value.focus()), 600);
   operation.value = op;
   id.value = category;
   if (op == 1) {
      title.value = 'Crear categoria';
   } else {
      title.value = 'Editar categoria';
      form.value.name = name;
   }
}
const clear = () => {
   form.value.name = '';
}

const save = async () => {
   let res;
   if (operation.value == 1) {
      res = await sendRequest('POST', form.value, 'http://localhost:8000/api/categories', '');
      if (res == true) {
         clear();
         nextTick(() => nameInput.value.focus());
         getCategories();
      }
   } else {
      res = await sendRequest('PUT', form.value, 'http://localhost:8000/api/categories/' + id.value, '');
      if (res == true) {
         clear();
         nextTick(() => close.value.click());
         getCategories();
      }
   }
}
</script>
<template>
   <div class="row">
      <div class="col-md-4 offset-md-4">
         <div class="container-fluid">
            <div class="row text-white text-center">
               <div class="row mt-3 d-grid col-5 mx-auto">
                  <button class="btn btn-dark" data-bs-toggle="modal" data-bs-target="#modal"
                     @click="$event => openModal(1)">
                     <i class="fa-solid fa-circle-plus"></i>Add
                  </button>
               </div>
            </div>
         </div>
      </div>
   </div>
   <div class="row mt-3 justify-content-center">
      <div class="col-md-5">
         <div class="card border border-white text-center" v-if="!load">
            <div class="card-body">
               <img src="/loading.gif" class="img-fluid">
            </div>
         </div>
         <div class="table-responsive text-center" v-else>
            <table class="table table-bordered table-hover col-10">
               <thead>
                  <tr>
                     <th>#</th>
                     <th>Nombre</th>
                     <th></th>
                     <th></th>
                  </tr>
               </thead>
               <tbody class="table-group-divider">
                  <tr v-for="cate, i in categories" :key="cate.id">
                     <td>{{ (i + 1) }}</td>
                     <td>{{ cate.name }}</td>
                     <td>
                        <button class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#modal"
                           @click="$event => openModal(2, cate.name, cate.id)">
                           <i class="fa-solid fa-edit"></i>
                        </button>
                     </td>
                     <td>
                        <button class="btn btn-danger" @click="$event => deleteCategory(cate.id, cate.name)">
                           <i class="fa-solid fa-trash"></i>
                        </button>
                     </td>
                  </tr>
               </tbody>
            </table>
         </div>
      </div>
   </div>
   <Modal :id="'modal'" :title="title">
      <div class="modal-body">
         <form @submit.prevent="save">
            <div class="input-group mb-3">
               <span class="input-group-text">
                  <i class="fa-solid fa-user"></i>
               </span>
               <input autofocus type="text" v-model="form.name" placeholder="Nombre" class="form.control" required
                  ref="nameInput">
            </div>
            <div class="container-fluid">
               <div class="row text-white text-center">
                  <div class="row mt-3 d-grid col-5 mx-auto">
                     <button class="btn btn-success">
                        <i class="fa-solid fa-save"></i> Save</button>
                  </div>
                  <div class="row mt-3 d-grid col-5 mx-auto">
                     <button class="btn btn-dark" ref="close" data-bs-dismiss="modal">Close</button>
                  </div>
               </div>
            </div>
         </form>
      </div>
   </Modal>
</template>