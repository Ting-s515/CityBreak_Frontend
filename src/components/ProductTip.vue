<script setup>
    import { userName,userEmail,userID,createdDate,formatDate } from '@/global';
    // const getDate=function(){
    //     let i=userEmail.value,j=userEmail.value,k=userID.value;
    //     console.log({i,j,k});
    //     const date=new Date();
    //     console.log(date.getTime());
    //     // 計算時區偏移（分鐘轉為毫秒）
    //     const timeZone=date.getTimezoneOffset() * 60000;
    //     // 當地時間的 ISO 格式
    //     const localIsoTime=new Date(date.getTime()-timeZone).toISOString().slice(0,19).replace('T',' ');
    //     console.log(typeof localIsoTime, localIsoTime);
    //     console.log(`${userName.value} ${userEmail.value} ${userID.value}`);
    // }
</script>
<template> 
    <div class="product-div mt-3 ">
        <h1 class="text-center ">最新商品</h1>
        <hr class="w-100 product-hr mt-0">
    </div>
    <!-- <div class="d-flex">
        <p class="me-3">姓名:<span class="text-danger">{{ userName }}</span> </p>
        <p class="me-3">email:<span class="text-danger">{{ userEmail }}</span> </p>
        <p class="me-3">id:<span class="text-danger">{{ userID }}</span> </p>
        <p class="me-3">建立時間: <span class="text-danger">{{createdDate}}</span></p>
    </div> -->
    <!-- <button @click="getDate">取得時間</button> -->
</template>
<style scoped>
    .product-hr{color: red;border-style: solid;border-width: 2px;}
</style>