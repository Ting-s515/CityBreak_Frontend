<script setup>
    import LogoAndIcon from '@/components/LogoAndIcon.vue';
    import Nav from '@/components/Nav.vue';
    import { ref,computed,onMounted } from "vue";
    import { cart, decrease, increase, removeFromCart, totalPrice, clearCart } from '@/cartStore';
    import { userName,userEmail,userID } from '@/global';
    import { useRouter } from 'vue-router';
    import axios, { Axios } from 'axios';
    import GoBackBtn from '@/components/GoBackBtn.vue';
    import GoTopBtn from '@/components/GoTopBtn.vue';
    const router=useRouter();
    const apiUrl='http://127.0.0.1:5100'
    const checkout=async function(){
        localStorage.setItem('checkPaymentStatus', 'true');
        if(userName.value){
            console.log(userID.value,userEmail.value,totalPrice.value);
            const date=new Date();
            //getTimezoneOffset() 方法會回傳該當前時間相對於UTC的時區偏移量，以「分鐘」為單位。
            //若本地時區比 UTC 晚（台北是 UTC+8），會回傳一個「負數」的分鐘數。
            //若本地時區比 UTC 早（美國太平洋時區 UTC-8），會回傳一個「正數」的分鐘數。
            const timeZone=date.getTimezoneOffset() * 60000;
            // 當地時間的 ISO 格式(因為UTC+8 要減「負數」)
            const orderTime=new Date(date.getTime()-timeZone).toISOString().slice(0,19).replace('T',' ');
            //建立訂單
            const order={
                userID:userID.value,
                orderTime:orderTime,
                products: JSON.parse(localStorage.getItem('cart')),
                totalPrice: totalPrice.value
            };
            console.log(order);
            // alert("pause");
            try{
                const response =await axios.post(`${apiUrl}/checkout`, order);
                if(response.data.success){
                    localStorage.setItem('merchantTradeNo',response.data.merchantTradeNo)
                    const formContainer = document.createElement('div');
                    formContainer.innerHTML = response.data.html;
                    document.body.appendChild(formContainer);
                    const responseForm = formContainer.querySelector('form');
                    if (responseForm) {
                        responseForm.submit(); // 自動提交表單
                    } else {
                        console.error("找不到表單，無法提交！");
                    }
                } else {
                    console.error("訂單創建失敗：", response.data.message);
                }
            }
            catch (error) {
                if (error.response) {
                    console.error("後端錯誤：", error.response.data);
                    alert(`後端錯誤：${error.response.data.message || "未知錯誤"}`);
                } else if (error.request) {
                    console.error("請求無回應：", error.request);
                    alert("請求無回應，請檢查伺服器狀態。");
                } else {
                    console.error("結帳失敗：", error.message);
                    alert(`結帳失敗：${error.message}`);
                }
            }
        }
        else{
            router.push('/UserLogin');
            alert("請先登入會員");
        }   
    }
    
</script>
<template>
    <div class="container"style="width: 900px;">
        <GoBackBtn></GoBackBtn>
        <GoTopBtn></GoTopBtn>
        <LogoAndIcon></LogoAndIcon>
        <Nav></Nav>
        <h1 class="text-center mt-3">購物車明細</h1>
        <div v-if="cart.length === 0" class="text-center">
            <h3>您的購物車是空的</h3>
            <router-link to="/" class="btn btn-primary mt-3">返回首頁</router-link>
        </div>
        <div v-else class="container w-75">
            <div v-for="item in cart" :key="item.productID" class="d-flex align-items-center cart-item mb-3 pb-3">
            <img :src="item.img" alt="商品圖片" class="img-thumbnail" style="width: 100px; height: 100px;" />
            <div class="item-details ms-3">
                <h5>{{ item.name }}</h5>
                <p>價格: NT$ {{ item.price }}</p>
                <div class="d-flex align-items-center">
                <button class="btn btn-secondary btn-sm" @click="decrease(item)">-</button>
                <span class="mx-2">{{ item.quantity }}</span>
                <button class="btn btn-secondary btn-sm" @click="increase(item)">+</button>
                </div>
            </div>
            <div class="item-actions d-flex align-items-center ms-auto">
                <button class="btn btn-danger btn-md" @click="removeFromCart(item.productID)">
                <i class="fas fa-trash-alt"></i>
                </button>
            </div>
            </div>
            <h3 class="mt-3">總價: NT$ {{ totalPrice }}</h3>
            <div class="d-flex align-items-center justify-content-center">
                <button class="btn btn-primary mt-3 me-5 btnCss" @click="checkout">結帳</button>
                <button class="btn btn-danger mt-3 btnCss" @click="clearCart">清空購物車</button>
            </div>
        </div>
  </div>
        
</template>
<style scoped>
.cart-item {
  border-bottom: 2px solid #ccc;
}
.btnCss{width: 120px;height:50px ;}
</style>