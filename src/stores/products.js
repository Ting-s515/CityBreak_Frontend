import { defineStore } from "pinia";
import axios from "axios";
import { apiUrl } from "@/global";
//搜尋商品
export const useSearchProducts=defineStore('products',{
    state:()=>({
        products:[], // 存儲產品數據
        isLoading:true,
    }),
    actions:{
        setProducts(newProducts){
            this.products=newProducts; // 更新產品數據
            this.isLoading=false;
        },
    },
});

//載入商品分類
export const useProductCategories=defineStore('productCategories',{
    state:()=>({
        products:[],
        isLoading:true,
        categories: 'clothes', // 預設分類參數
    }),
    actions:{
        async fetchProducts(categories = this.categories){
            try {
                console.log("categories參數=",categories);
                const response = await axios.post(`${apiUrl}/getProducts`,{
                    categories }); 
                if(response.data.success){
                    this.products = response.data.data; 
                    console.log(`檢查商品陣列${this.products}`);
                    this.products.forEach(product=>{
                        product.imagePath=`${product.imagePath}`;
                    });
                    console.log("From products.js",this.products);
                }
                else{
                    console.error('商品加載失敗：', response.data.message);
                }
            } catch (error) {
                console.error('無法加載商品數據：', error.response);
            }finally{
                this.isLoading=false; //加載完成
            }
        },
        //Nav.vue
        setCategories(categories){
            this.categories=categories;
            this.fetchProducts(categories); // 重新加載產品
        },
    },
});