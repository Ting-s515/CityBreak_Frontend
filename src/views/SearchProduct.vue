<script setup>
    import LogoAndIcon from '@/components/LogoAndIcon.vue';
    import Nav from '@/components/Nav.vue';
    import CardProduct from '@/components/CardProduct.vue';
    import { ref,onMounted,onUnmounted, watch, computed, watchEffect} from 'vue';
    import { useRouter } from 'vue-router';
    import { useSearchProducts } from '@/stores/products';
    import GoBackBtn from '@/components/GoBackBtn.vue';
    import GoTopBtn from '@/components/GoTopBtn.vue';
    const router=useRouter();
    const searchProducts=useSearchProducts();

    //不要onMounted是因為沒有設定預設參數，會導致都是"查無結果"
    //響應式
    const products=computed(()=>searchProducts.products || []);
    const isLoading=computed(()=>searchProducts.isLoading || false);   
    watchEffect(()=>{
        console.log("searchProducts in watchEffect:", searchProducts.products);
        console.log("searchProducts in watchEffect:", searchProducts.isLoading);
    });
   
</script>
<template>
    <div class="container w-75">
        <GoBackBtn></GoBackBtn>
        <GoTopBtn></GoTopBtn>
        <LogoAndIcon></LogoAndIcon>
        <Nav></Nav>
        <CardProduct :products="products" :isLoading="isLoading" class="mt-3"></CardProduct>
    </div>
</template>
<style scoped>

</style>