<script setup>
import { ref,nextTick } from 'vue';
import { sendRequest } from '../../functions';
import { useAuthStore } from '../../stores/auth';
import axios from 'axios';
const authStore = useAuthStore();
axios.defaults.headers.common['Authorization'] = 'Bearer '+authStore.authToken;
const form = ref({ name:'',last_name:'', dni:'', birthdate:'',address:'', foto:''});
const nameInput =ref('');
const foto = ref('');

const previsualizarFoto = (event) =>{
        var reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]);
        reader.onload = function(){
          var miFoto = document.getElementById('fotoimg');
          miFoto.src = reader.result;
          foto = miFoto.src;
        }
       }

const save = (event) =>{
    event.preventDefault();
    var miFoto = document.getElementById('fotoimg');
    form.value.foto = miFoto.src;
    sendRequest('POST', form.value, 'http://localhost:8000/api/workers','/workers');
    form.value.name = '';
    form.value.last_name = '';
    form.value.dni = '';
    form.value.birthdate = '';
    form.value.address = '';
    form.value.foto = '';
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

               <div class= "mb-3 text-center">
                  <img v-if="foto" height="100" :src="foto" id="fotoimg" class="img-thumbnail" alt="">
                  <img v-else td style="width:100px !important;" src="/UserFoto.jpg" id="fotoimg" class="img-thumbnail" alt="">
               </div>

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
                  <input autofocus type="text" v-model="form.last_name" placeholder="Apellido" class="form-control">
               </div>

               <div class="input-group mb-3">
                  <span class="input-group-text">
                     <i class="fa-solid fa-building"></i>
                  </span>
                  <input autofocus type="text" v-model="form.dni" placeholder="DNI" class="form-control">
               </div>

               <div class="input-group mb-3">
                  <span class="input-group-text">
                     <i class="fa-solid fa-building"></i>
                  </span>
                  <input autofocus type="date" v-model="form.birthdate" placeholder="Fecha de nacimiento" class="form-control">
               </div>

               <div class="input-group mb-3">
                  <span class="input-group-text">
                     <i class="fa-solid fa-building"></i>
                  </span>
                  <input autofocus type="text" v-model="form.address" placeholder="Direccion" class="form-control">
               </div>

               <div class="input-group mb-3">
                  <span class="input-group-text">
                    <i class="fa-solid fa-gift"></i>
                  </span>
                  <input  v-on:change = "previsualizarFoto" type="file" s accept="image/png, image/jpeg, image/gift" class="form-control">
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