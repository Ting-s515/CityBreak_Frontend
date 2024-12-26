<script setup>
    import{ref,onMounted,defineProps,onUnmounted}from 'vue';
    import axios from 'axios';
    defineProps({
        products:{
            type:Array,
            required:true,
        },
        isLoading:{
            type:Boolean,
            required:true,
        },
    });
</script>
<template>
    <div class="row">
        <!-- Skeleton Screen -->
        <template v-if="isLoading">
            <div class="col-6 col-lg-3 d-flex justify-content-center"v-for="n in 4" :key="n">
                <div class="card mb-3" style="">
                    <div class="skeleton" style="height: 200px; width: 100%;"></div>
                    <div class="card-body">
                        <h5 class="skeleton" style="height: 20px; width: 60%;"></h5>
                        <p class="skeleton" style="height: 60px; width: 100%;"></p>
                        <p class="skeleton" style="height: 20px; width: 40%;"></p>
                        <div class="skeleton" style="height: 30px; width: 80%;"></div>
                    </div>
                </div>
            </div>
        </template>
        <template v-else>
            <template v-if="products.length >0">
                <div class="col-6 col-lg-3 d-flex justify-content-center" v-for="product in products" :key="product.productID">
                    <div class="card mb-3" style="">
                        <img :src="product.imagePath" class="card-img-top" :alt="product.productName">
                        <div class="card-body">
                            <h5 class="card-title m-0 p-0" style="height: 50px;">{{ product.productName }}</h5>
                            <p class="card-text m-0 p-0" style="height: 90px;">{{ product.prodictIntroduce }}</p>
                            <p class="card-text"><strong>$NT{{ product.unitPrice }}</strong></p>
                            <a href="#" class="btn cart-btn text-dark" @click.prevent="$emit('addToCart', product)">加入購物車</a>
                            <!-- 傳遞product(key-value)給Home.vue -->
                        </div>
                    </div>
                </div>
            </template>
             <!-- No Results -->
            <template v-else>
                <div class="col-12 text-center py-5">
                    <h1 class="text-muted">查無結果</h1>
                </div>
            </template>  
        </template>
    </div>
</template>
<style scoped>
    .cart-btn{background-color:	#FF9D6F ;}
    .cart-btn:hover{background-color: #FF5809 ;transform: scale(1.05);
    box-shadow: 0 6px 10px rgba(0, 0, 0, 0.3);}
    .skeleton {
        background-color: #e0e0e0;
        border-radius: 4px;
        animation: loading-animation 2s infinite;
    }

    @keyframes loading-animation {
        0% {
            background-color: #e0e0e0;
        }
        50% {
            background-color: #f5f5f5;
        }
        100% {
            background-color: #e0e0e0;
        }
    }
</style>