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
export const useProductClassification=defineStore('productClassification',{
    state:()=>({
        products:[],
        isLoading:true,
        classification: 'clothes', // 預設分類參數
    }),
    actions:{
        async fetchProducts(classification = this.classification){
            try {
                // console.log("classification參數=",classification);
                const response = await axios.post(`${apiUrl}/getProducts`,{
                    classification }); 
                if(response.data.success){
                    this.products = response.data.data; 
                    this.products.forEach(product=>{
                        product.imagePath=`${product.imagePath}`;
                    });
                    // console.log("From products.js",this.products);
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
        setClassification(classification){
            this.classification=classification;
            this.fetchProducts(classification); // 重新加載產品
        },
    },
});