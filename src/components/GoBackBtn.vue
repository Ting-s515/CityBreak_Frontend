<script setup>
    const goBack=()=>{
        window.history.back();
    }
</script>
<template>
    <button type="button" class="btn bg-secondary rounded-circle goBack" @click="goBack">
        <i class="fa-solid fa-arrow-left"></i>
    </button>
</template>
<style scoped>
    .goBack {
        position: fixed;
        bottom: 20px;
        right: 75px; 
        color: white;
        padding: 8px;
        font-size: 24px;
        z-index: 999;
        transition: background-color 0.3s;
        width: 50px;
        height: 50px;
    }
</style>