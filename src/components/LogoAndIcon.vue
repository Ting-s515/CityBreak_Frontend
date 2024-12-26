<script setup>
    import { ref, computed, onMounted } from 'vue';
    import { useRouter } from 'vue-router';
    import { userEmail, userID, userName,createdDate } from '@/global';
    import { cartItemCount,cart } from '@/cartStore';
    const router=useRouter();
    //登出
    let logout=function(){
        userName.value="";
        userEmail.value="";
        userID.value="";
        createdDate.value="";
        localStorage.clear();
        router.push('/');
        //cartStore參考
        cart.value=[];
        alert("您已登出");
    }
</script>
<template>
   <div class="d-flex align-items-center justify-content-center p-2 logo position-relative ">
        <div class="d-flex align-items-center flex-column text-center ">
            <router-link to="/" class="text-decoration-none">
                <p class="mb-0 fw-bold text-danger fs-4">CITYBREAK OUTDOOR</p>
                <p class="mb-0  text-danger fs-5">戶外休閒用品店</p>
            </router-link>
        </div>

        <!-- 會員與購物車 -->
        <div class="position-absolute end-0 bottom-0 d-flex align-items-center" v-if="userName">
            <router-link to="/OrderView" id="userLogin" class="text-decoration-none text-dark me-1 p-1">
                <i class="fa-solid fa-user member-icon"></i>
                <span class="ms-1" style="font-weight: bold;">{{userName}}</span>
            </router-link>
            <router-link to="/Cart" id="cart-button" class="text-decoration-none text-dark p-1 me-1">
                <i class="fa-solid fa-shopping-cart"></i>
                <span id="cart-count" class="badge cart-count text-dark px-1" style="font-size: 14px;">{{ cartItemCount }}</span>
            </router-link>
            <button id="userLogout" class="text-dark me-3 mb-1" v-if="userName" @click.prevent="logout">點擊登出</button>
        </div>
        <div class="position-absolute end-0 bottom-0 d-flex align-items-center " v-else>
            <router-link to="/UserLogin" id="userLogin" class="text-decoration-none text-dark me-2 px-2 py-1">
                <i class="fa-solid fa-user member-icon"></i>
            </router-link>
            <router-link to="/Cart" id="cart-button" class="text-decoration-none text-dark me-2 p-1">
                <i class="fa-solid fa-shopping-cart"></i>
                <span id="cart-count" class="badge cart-count text-dark px-1"style="font-size: 14px;">{{ cartItemCount }}</span>
            </router-link>
        </div>
    </div>
</template>
<style scoped>
    .logo{background-color:#E0E0E0;}
    #userLogout:hover,#userLogin:hover{background-color: #BEBEBE;cursor: pointer;}
    #cart-button:hover{background-color:#BEBEBE;}
</style>