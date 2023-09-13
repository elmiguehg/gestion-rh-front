<script setup>
import axios from 'axios';
import { ref, onMounted, nextTick } from 'vue';
import { confirmation, sendRequest } from '../../functions';
import { useAuthStore } from '../../stores/auth';
import Modal from '../../components/Modal.vue';
const authStore = useAuthStore();
axios.defaults.headers.common['Authorization'] = 'Bearer ' + authStore.authToken;

onMounted(() => { getEntities()});
const entities = ref([]);
const workers = ref([]);
const jobtitles = ref([]);
const load = ref(false);
const rows = ref(0);
const form = ref({ name: '' });
const title = ref('');
const nameInput = ref('');
const operation = ref(1);
const id = ref('');
const close = ref([]);

const getEntities = async () => {
   await axios.get('http://localhost:8000/api/entities').then(
      response => (entities.value = response.data));
   load.value = true;
}
const deleteEntity = (id, name) => {
   confirmation(name, ('http://localhost:8000/api/entities/' + id), '/entities');
}
const openModal = (op, name, entity) => {
   clear();
   setTimeout(() => nextTick(() => nameInput.value.focus()), 600);
   operation.value = op;
   id.value = entity;
   if (op == 1) {
      title.value = 'Crear entidad';
   } else {
      title.value = 'Editar entidad';
      form.value.name = name;
   }
}
const openModal2 = (name, id) => {
   title.value = 'Trabajadores que pertenecen a la entidad '+name;
   axios.get('http://localhost:8000/api/workerbyentity/'+id).then(
      response => (workers.value = response.data));
   load.value = true;
}
const openModal3 = (name, id) => {
   title.value = 'Puesto de trabajo de la entidad '+name;
   axios.get('http://localhost:8000/api/jobtitlebyentity/'+id).then(
      response => (jobtitles.value = response.data));
   load.value = true;
}


const clear = () => {
   form.value.name = '';
}

const save = async () => {
   let res;
   if (operation.value == 1) {
      res = await sendRequest('POST', form.value, 'http://localhost:8000/api/entities', '');
      if (res == true) {
         clear();
         nextTick(() => nameInput.value.focus());
         getEntities();
      }
   } else {
      res = await sendRequest('PUT', form.value, 'http://localhost:8000/api/entities/' + id.value, '');
      if (res == true) {
         clear();
         nextTick(() => close.value.click());
         getEntities();
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
      <div class="col-md-8">
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
                     <th></th>
                     <th></th>
                  </tr>
               </thead>
               <tbody class="table-group-divider">
                  <tr v-for="enti, i in entities" :key="enti.id">
                     <td>{{ (i + 1) }}</td>
                     <td>{{ enti.name }}</td>
                     <td>
                        <button class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#modal"
                           @click="$event => openModal(2, enti.name, enti.id)">
                           <i class="fa-solid fa-edit"></i>
                        </button>
                     </td>
                     <td>
                        <button class="btn btn-danger" @click="$event => deleteEntity(enti.id, enti.name)">
                           <i class="fa-solid fa-trash"></i>
                        </button>
                     </td>
                     <td>
                        <button class="btn btn-info" data-bs-toggle="modal" data-bs-target="#modal2"
                           @click="$event => openModal2(enti.name, enti.id)">
                           <i class="fa-solid fa-info"></i>
                           <i> Trabajadores</i>
                        </button>
                     </td>
                     <td>
                        <button class="btn btn-info" data-bs-toggle="modal" data-bs-target="#modal3"
                           @click="$event => openModal3(enti.name, enti.id)">
                           <i class="fa-solid fa-info"></i>
                           <i> Puestos de trabajo</i>
                        </button>
                     </td>
                     <!-- <td>
                        <router-link :to="{ name: 'addworker'}" class="btn btn-warning">
                           <i class="fa-solid fa-add"></i>
                           <i>Agregar Trabajador</i>
                        </router-link>
                     </td>
                     <td>
                        <router-link :to="{ name: 'addjobtitle'}" class="btn btn-warning">
                           <i class="fa-solid fa-add"></i>
                           <i>Agregar Puesto de trabajo</i>
                        </router-link>
                     </td> -->
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
   <Modal :id="'modal2'" :title="title">
      <div class="modal-body">
         <div class="table-responsive text-center">
            <table class="table table-bordered table-hover col-10">
               <thead>
                  <tr>
                     <th>#</th>
                     <th>Nombre</th>
                     <th>Apellido</th>
                     <th>DNI</th>
                     <th>Fecha de nacimiento</th>
                     <th>Direccion</th>
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
                  </tr>
               </tbody>
            </table>
         </div>
      </div>
   </Modal>
   <Modal :id="'modal3'" :title="title">
      <div class="modal-body">
         <div class="table-responsive text-center">
            <table class="table table-bordered table-hover col-10">
               <thead>
                  <tr>
                     <th>#</th>
                     <th>Nombre</th>
                     <th>Importancia</th>
                     <th>Es jefe</th>
                  </tr>
               </thead>
               <tbody class="table-group-divider">
                  <tr v-for="job, i in jobtitles" :key="job.id">
                     <td>{{ (i + 1) }}</td>
                     <td>{{ job.name }}</td>
                     <td>{{ job.importance }}</td>
                     <td v-if="job.is_boss == '1'">{{ 'Si' }}</td>
                     <td v-else>{{ 'No' }}</td>
                  </tr>
               </tbody>
            </table>
         </div>
      </div>
   </Modal>
</template>