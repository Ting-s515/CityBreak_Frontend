<script setup>
    import {apiUrl} from '@/global';
    import { ref } from 'vue';
    import axios from 'axios';
    import { useRouter } from 'vue-router';
    import { useSearchProducts,useProductCategories } from '@/stores/products';
    const router=useRouter();
    const searchProducts=useSearchProducts(); //搜尋
    const productCategories=useProductCategories(); //分類

    //產品分類
    const sendCategories=function(categories){
        productCategories.setCategories(categories);
    }

    const searchForm=ref({
        param:''
    });
    //搜尋
    const handleSearchProducts=async ()=>{
        let products=[];
        try{
            const response = await axios.post(`${apiUrl}/searchProducts`, {
                productName: searchForm.value.param,
        });
            products = response.data.success ? response.data.data : [];   
        }
        catch(error){
            console.error("Error", error.response);
            products=[];
        }
        finally{
            console.log("Products from API:", products);
            searchProducts.setProducts(products); // 保存數據到 Pinia
            router.push('/SearchProduct');
        }
    }
</script>
<template>
    <nav class="d-flex align-items-center justify-content-between mb-0 nav-bar" style="height: 40px;">
        <ul class="d-flex align-items-center justify-content-flex-start list-unstyled mb-0">
            <li><a href="#" class="text-decoration-none text-white me-5 ms-3" @click.prevent="sendCategories('clothes')">衣褲鞋襪</a></li>
            <li><a href="#" class="text-decoration-none text-white me-5" @click.prevent="sendCategories('backpack')">各類背包</a></li>
            <li><a href="#" class="text-decoration-none text-white me-5" @click.prevent="sendCategories('outdoor_litems')">戶外生活</a></li>
            <li><a href="#" class="text-decoration-none text-white me-5" @click.prevent="sendCategories('equipment')">器材裝備</a></li>
        </ul>
        <form class="d-flex ms-auto search_Form me-2"style="height:35px; max-width:200px;" @submit.prevent="handleSearchProducts" >
            <input class="form-control me-2 search-col search_Input" type="search" placeholder="Search"
                style="width: 150px;" aria-label="Search" name="search" v-model="searchForm.param">
            <button class="btn btn-outline-light search-btn m-0 p-0" type="submit" style="width:30px;">
                <i class="fa-solid fa-magnifying-glass"></i> <!-- search icon -->
            </button>
        </form>
    </nav>

</template>
<style scoped>
    .nav-bar{background-color: black;}
</style>