<script setup>
    import { ref,onMounted,onUnmounted } from 'vue';

    const isVisiible=ref(false);
    const handleScroll=function(){
        isVisiible.value=window.scrollY >100;
    };
    const scrollToTop=()=>{
        window.scrollTo({
            top:0,
            behavior:'smooth',
        });
    };

    onMounted(()=>{
        $(window).on('scroll',handleScroll);
    });
    onUnmounted(()=>{
        $(window).off('scroll',handleScroll);
    })
</script>
<template>
    <button v-if="isVisiible" type="button" class="btn bg-secondary rounded-circle goTop" @click="scrollToTop">
        <i class="fa-solid fa-caret-up"></i>
    </button>
</template>
<style scoped>
    .goTop {
        position: fixed;
        bottom: 20px;
        right: 20px;
        color: white;
        padding: 8px;
        font-size: 24px;
        z-index: 999;
        transition: background-color 0.3s;
        width: 50px;
        height: 50px;
    }
</style>