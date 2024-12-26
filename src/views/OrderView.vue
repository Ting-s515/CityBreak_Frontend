<script setup>
    import { ref,onMounted,computed } from 'vue';
    import { userID } from '@/global';
    import axios from 'axios';
    import LogoAndIcon from '../components/LogoAndIcon.vue'; 
    import { useRouter } from 'vue-router';
    import { formatDate } from '@/global';
    const router=useRouter();
    const orders=ref([]);
    const apiUrl='https://localhost:7130';
    const fetchOrderData=async ()=>{
        try{
            //送會員id
            const numUserID=parseInt(userID.value,10);
            console.log(typeof numUserID,"numUserID=",numUserID);
            const response=await axios.post(`${apiUrl}/getOrders`,{
                userID:numUserID
            });
            if (response.data.success) {
                orders.value = response.data.data;
                console.log(orders.value);
            } else {
                console.error('訂單加載失敗：', response.data.message);
            }
        }
        catch (error) {
            if (error.response) {
                console.error('後端錯誤：', error.response.data); 
                alert(`後端錯誤：${error.response.data.message || "未知錯誤"}`);
            } else {
                console.error('請求失敗：', error.message);
                alert(`請求失敗：${error.message}`);
            }
        };
    }
    onMounted(fetchOrderData);
    // 查看訂單詳情
    const orderDetail = (merchantTradeNo) => {
        router.push({
            path:'/OrderDetail',
            query:{merchantTradeNo},
        });
    };
    //參數
    const sortOrderValue=ref('desc');
    // 訂單排序
    const sortOrders=computed(()=>{
        //[...orders.value]產生新陣列
        return[...orders.value].sort((oldOrder,newOrder)=>{
            if(sortOrderValue.value==='desc'){
                return new Date(newOrder.orderTime)-new Date(oldOrder.orderTime);// 從新到舊
            }else{
                return new Date(oldOrder.orderTime)-new Date(newOrder.orderTime);
            }
        });
    });
    const sortOrdersFun=()=>{
        // console.log(sortOrderValue.value);
    }

    
</script>
<template>
    <div class="container w-75">
        <LogoAndIcon></LogoAndIcon>
        <h1 class="text-center mt-3 mb-0">我的訂單</h1>
        <!-- 排序功能 -->
        <div class="d-flex justify-content-end align-items-center mb-2 mt-0">
            <label for="sortOrder" class="me-2">排序方式:</label>
            <select id="sortOrder" v-model="sortOrderValue" class="form-select form-select-sm w-auto" @change="sortOrdersFun">
                <option value="desc">從新到舊</option>
                <option value="asc">從舊到新</option>
            </select>
        </div>
        <div class="row d-flex order-list mb-3 g-0" v-for="order in sortOrders" :key="order.orderID">
            <div class="col-9">
                <div class="row row-cols-2 ms-2">
                    <div class="col-md-6 d-flex align-items-center">
                        <p class="m-0">訂單編號: {{ order.merchantTradeNo }}</p>
                    </div>
                    <div class="col-md-6 d-flex align-items-center">
                        <p class="m-0">訂單時間: {{ formatDate(order.orderTime) }}</p>
                    </div>
                    <div class="col-md-6 d-flex align-items-center">
                        <p class="m-0">總價: {{ order.totalPrice }}</p>
                    </div>
                    <div class="col-md-6 d-flex align-items-center">
                        <p class="m-0">付款狀態: {{ order.orderStatus }}</p>
                    </div>
                </div>
            </div>
            <div class="col-3 d-flex align-items-center justify-content-end">
                <button class="me-3" @click="orderDetail(order.merchantTradeNo)">查看訂單詳情</button>
            </div>
        </div>
    </div>
</template>
<style scoped>
.order-list {
    border: 1px solid #ccc;
    padding: 8px 0px; 
    border-radius: 5px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}
button {
    background-color: #4CAF50;
    color: white;
    padding: 8px 16px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.3s ease;
}
button:hover {
    background-color: #45a049;
}

</style>