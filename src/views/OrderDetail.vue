<script setup>
    import { ref, onMounted } from 'vue';
    import axios from 'axios';
    import { useRoute } from 'vue-router';
    import LogoAndIcon from '../components/LogoAndIcon.vue'; 
    import { formatDate } from '@/global';
    import GoBackBtn from '@/components/GoBackBtn.vue';
    import GoTopBtn from '@/components/GoTopBtn.vue';
    const route = useRoute();
    const orderDetails = ref({});
    const apiUrl = 'https://localhost:7130';
    // 加載訂單詳情
    const fetchOrderDetail = async () => {
        const merchantTradeNo=route.query.merchantTradeNo;
        console.log(typeof merchantTradeNo,"OrderDetail參數=",merchantTradeNo);
        if (!merchantTradeNo) {
            console.error("交易編號丟失，無法加載訂單詳情");
            return;
        }
        try {
            const response = await axios.post(`${apiUrl}/getOrderDetail`, {
                merchantTradeNo:merchantTradeNo
            });
            if (response.data.success) {
                orderDetails.value = response.data.data;
                console.log(orderDetails.value);
            } else {
                console.error('訂單詳情加載失敗：', response.data.message);
            }
        } catch (error) {
            console.error('無法加載訂單詳情：', error);
        }
    };

    onMounted(fetchOrderDetail);
</script>
<template>
    <div class="container w-75">
        <LogoAndIcon></LogoAndIcon>
        <GoBackBtn></GoBackBtn>
        <GoTopBtn></GoTopBtn>
        <div class="order-info bg-light p-3 rounded shadow-sm mb-3 ">
            <h2 class="text-center">訂單資訊</h2>
            <div class="d-flex align-items-center justify-content-around">
                <p><strong>訂單編號:</strong> {{ orderDetails.merchantTradeNo }}</p>
                <p><strong>訂單時間:</strong> {{ formatDate(orderDetails.orderTime)}}</p>
                <p><strong>總價:</strong> ${{ orderDetails.totalPrice }}</p>
            </div>
        </div>
        <div class="product-item d-flex align-items-center p-4 mb-3 border rounded shadow-sm bg-white">
            <div class="row ">
                <div class="col-md-3 mb-4 d-flex align-items-center justify-content-center" v-for="product in orderDetails.products" :key="product.productID">
                <div class="">
                    <img :src="product.imagePath" class="img-thumbnail mb-2" :alt="product.productName" style="width: 400px; height: 170px;">
                    <h5 class="m-0  product-text text-center">{{ product.productName }}</h5>
                    <p class="m-0 product-text text-center">單價: ${{ product.unitPrice }}</p>
                    <p class="m-0 product-text text-center">數量: {{ product.quantity }}</p>
                </div>   
            </div>   
            </div>
        </div>
    </div>

</template>
<style scoped>
    .order-info {
        background-color: #f8f9fa;
    }
    .product-item img {
        object-fit: cover;
        border-radius: 8px;
    }

    p{font-size: 18px;}
    .product-text{font-size: 16px;}

    
</style>