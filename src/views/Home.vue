<script setup>
    import { ref,computed,onMounted,onUnmounted, watch,watchEffect} from 'vue';
    import { addToCart } from '@/cartStore';
    import LogoAndIcon from '../components/LogoAndIcon.vue'; 
    import Nav from '../components/Nav.vue';
    import Carousel from '../components/Carousel.vue';
    import ProductTip from '../components/ProductTip.vue';
    import CardProduct from '../components/CardProduct.vue';
    import axios from 'axios';
    import { jwtDecode } from 'jwt-decode';
    import { useRouter } from 'vue-router';
    import { userEmail, userID, userName,apiUrl } from '@/global';
    import { useProductCategories} from '@/stores/products';
    import GoTopBtn from '@/components/GoTopBtn.vue';
    import GoBackBtn from '@/components/GoBackBtn.vue';
    const router=useRouter();

    //檢查綠界付款
    onMounted(async () => {
        // 檢查是否需要執行
        const checkPayment = localStorage.getItem('checkPaymentStatus') || 'no data';
        // console.log("check merchantTradeNo",localStorage.getItem('merchantTradeNo'));
        // console.log("check checkPayment=",checkPayment);
        if (checkPayment === 'true') {
            try {
                const response = await axios.post('http://127.0.0.1:5100/order/status', {
                    userID: localStorage.getItem('userID'),
                    merchantTradeNo:localStorage.getItem('merchantTradeNo')
                });
                if (response.data.success) {
                    if(response.data.orderStatus==='已付款'){
                        localStorage.removeItem('cart');
                        location.reload();
                        alert("付款成功");
                    }
                    else{
                        alert("付款失敗");
                    }          
                }
            } catch (error) {
                console.error("檢查訂單狀態失敗：", error);         
            }finally{
                localStorage.removeItem('checkPaymentStatus');
                localStorage.removeItem('merchantTradeNo');       
            }           
        }
    });
    
    //處理google登入
    const parseTokenFromUrl=async()=>{
        const urlParams=new URLSearchParams(window.location.search);
        const token =urlParams.get("token");
        const status=urlParams.get('status');
        // console.log(`token: ${token}`);
        if(token){
            if(status==='success'){
                try{
                    const response=await axios.post(`${apiUrl}/getGoogleUserInfo`,
                       JSON.stringify(token),{headers:{'Content-Type':'application/json'}
                    });
                    if(response.data.success){
                        console.log(`${response.data.email} ${response.data.name}`);
                        localStorage.setItem('userName', response.data.name);
                        localStorage.setItem('userEmail',response.data.email);
                        localStorage.setItem('userID',response.data.userID);
                        userID.value=response.data.userID;
                        userName.value=response.data.name;
                        userEmail.value=response.data.email;
                        alert("登入成功!!");
                    }
                    else{
                        console.error(response.data);
                    }
                }
                catch(error){
                    console.error('Error:', error.response);
                }
            }
            else{
                try{
                    const response=await axios.post(`${apiUrl}/getTempGoogleUserInfo`,
                        JSON.stringify(token),{headers:{'Content-Type':'application/json'}
                    });
                    if(response.data.success){
                        console.log(response.data);
                        console.log(`name= ${response.data.googleName}, email= ${response.data.googleEmail}`);
                        localStorage.setItem("googleRegister",'true');
                        localStorage.setItem("googleName",response.data.googleName);
                        localStorage.setItem("googleEmail",response.data.googleEmail);
                        alert("尚未註冊成為會員，請先完成註冊");
                        router.push('/UserRegister');      
                    }
                    else{
                        console.error(response.data.message);
                    }
                }
                catch(error){
                    console.error('Error:', error);
                }
            }
            localStorage.removeItem('isGoogleLogin');
            // 清除網址中的參數
            window.history.replaceState({}, document.title, "/");
        }
    };
    //檢查是否執行(處理google登入)
    onMounted(()=>{
        const isGoogleLogin=localStorage.getItem('isGoogleLogin') || 'no data';
        if(isGoogleLogin === 'true'){
            parseTokenFromUrl();
        }
        return;
    });

    //加載商品數據
    //在 Vue組件的 setup 階段執行
    const productCategories=useProductCategories();
    onMounted(() => {
        productCategories.fetchProducts(); 
    });

    //使用vue computed達成響應式效果
    const products=computed(()=>productCategories.products);
    const isLoading = computed(() => productCategories.isLoading);

    // 使用 watchEffect 簡化監控
    // watchEffect(() => {
    //     console.log("productCategories in watchEffect:", productCategories.products);
    //     console.log("productCategories in watchEffect:", productCategories.isLoading);
    // });
   
    
</script>
<template>
    <div class="container"style="width: 900px;">
        <LogoAndIcon></LogoAndIcon>
        <Nav></Nav>
        <Carousel></Carousel>
        <ProductTip></ProductTip>
        <CardProduct :products="products" :isLoading="isLoading" @addToCart="addToCart"></CardProduct>
        <!-- 傳給cartStore.js -->
        <GoTopBtn></GoTopBtn>
        <GoBackBtn></GoBackBtn>
    </div>
</template>
<style scoped>
  
</style>