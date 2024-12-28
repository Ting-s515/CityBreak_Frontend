<script setup>
    import LogoAndIcon from '@/components/LogoAndIcon.vue';
    import Nav from '@/components/Nav.vue';
    import CardProduct from '@/components/CardProduct.vue';
    import { ref,onMounted,onUnmounted, watch, computed, watchEffect} from 'vue';
    import { useRouter } from 'vue-router';
    import { useSearchProducts } from '@/stores/products';
    const router=useRouter();
    const searchProducts=useSearchProducts();

    onMounted(()=>{
        searchProducts.setProducts();
    });
    //響應式
    const products=computed(()=>searchProducts.products || []);
    const isLoading=computed(()=>searchProducts.isLoading || false);   
    watchEffect(()=>{
        console.log("searchProducts in watchEffect:", searchProducts.products);
        console.log("searchProducts in watchEffect:", searchProducts.isLoading);
    });
    // 監聽 Pinia 中的 products變化
    // watch(
    //     ()=>searchProducts.products, 
    //     (newProducts)=>{
    //         console.log("Products updated in SearchProduct.vue:", newProducts);
    //         products.value=newProducts;
    //         isLoading.value = false;
    //     },
    //     {immediate:true} // 第一次加載時也執行
    // ); 
</script>
<template>
    <div class="container w-75">
        <LogoAndIcon></LogoAndIcon>
        <Nav></Nav>
        <CardProduct :products="products" :isLoading="isLoading" class="mt-3"></CardProduct>
    </div>
</template>
<style scoped>

</style>