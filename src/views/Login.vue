<script setup>
import { ref } from 'vue';
import { useAuthStore } from '../stores/auth';
const authStore = useAuthStore();
const form = ref({ email: '', password: '' });
</script>
<template>
   <div class="row mt-5">
      <div class="col-md-4 offset-md-4">
         <div class="card border border-success">
            <div class="card-header bg-success border border-success text-white">LOGIN</div>
            <div class="card-body">
            <form @submit.prevent="$event => authStore.login(form)">
               <div class="input-group mb-3">
                  <span class="input-group-text">
                     <i class="fa-solid fa-at"></i>
                  </span>
                  <input autofocus type="email" v-model="form.email" placeholder="Email" class="form-control">
               </div>
               <div class="input-group mb-3">
                  <span class="input-group-text">
                     <i class="fa-solid fa-key"></i>
                  </span>
                  <input autofocus type="password" v-model="form.password" placeholder="Password" class="form-control">
               </div>
               <div class="d-grid col-10 mx-auto">
                  <button class="btn btn-dark">Login</button>
               </div>
               <router-link :to="{ path: 'register' }">Register</router-link>
            </form>
         </div>
         </div>
      </div>
   </div>
</template>