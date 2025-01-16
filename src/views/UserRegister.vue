<script setup>
    import LogoAndIcon from '../components/LogoAndIcon.vue';
    import axios  from 'axios';
    import { ref,onMounted } from 'vue';
    import { useRouter } from 'vue-router';
    const router=useRouter();
    const registerForm=ref({
        email:"",
        password:"",
        name:"",
        phone:"",
    });
     // 定義 API
    const apiUrl='https://localhost:7130'
    const register=async ()=>{
        console.log(registerForm.value.email, registerForm.value.password);
        try{
            const response =await axios.post(`${apiUrl}/register`,{
                email:registerForm.value.email,
                password:registerForm.value.password,
                name:registerForm.value.name,
                phone:registerForm.value.phone,
            });
            if(response.data.success){
                let data=response.data;
                console.log(data.name,data.email);
                alert("註冊完成，請重新登入");
                router.push('/');
            }
            else{
                console.log(response.data.message);
                alert('註冊失敗，請填入相對應資料');
            }
        }
        catch(error){
            if (error.response) {
                console.error('錯誤回應數據：', error.response.data);
                alert(error.response.data.message || "伺服器錯誤");
            } else {
                console.error('其他錯誤：', error.message);
                alert("無法連接伺服器");
            }
        }
    }
    //檢查是否為google登入
    const hidePwdInput=ref(false);
    const readonlyInput=ref(false);
    //取得資料
    onMounted(()=>{
        const googleRegister=localStorage.getItem('googleRegister');
        if(googleRegister==='true'){
            const googleName=localStorage.getItem("googleName");
            const googleEmail=localStorage.getItem("googleEmail");
            if(googleName && googleEmail){
                registerForm.value.name=googleName;
                registerForm.value.email=googleEmail;
                // 隱藏密碼欄位
                hidePwdInput.value=true;
                readonlyInput.value=true;
                //用完移除
                localStorage.removeItem("googleName");
                localStorage.removeItem("googleEmail");
            }
            localStorage.removeItem('googleRegister');
        }
        return;
    });
</script>
<template>
    <div class="container w-75">
        <LogoAndIcon></LogoAndIcon>
    </div>

    <div class="d-flex justify-content-center align-items-center mt-5">
        <div class="border p-5" style="width:500px; height: 600px;">
            <h3 class="text-center mb-4">會員註冊</h3>
            <form @submit.prevent="register">
                <div class="mb-4">
                    <label for="name" class="form-label">姓名</label>
                    <input type="text" class="form-control" id="name" name="name" required 
                    v-model="registerForm.name" style="height: 40px;">
                </div>
                <div class="mb-4">
                    <label for="email" class="form-label">Email</label>
                    <input type="email" class="form-control" id="email" name="email" required 
                    v-model="registerForm.email" :readonly="readonlyInput" :class="{'bg-readonly':readonlyInput}"
                    style="height: 40px;">
                </div>
                <div class="mb-4" v-if="!hidePwdInput">
                    <label for="password" class="form-label">Password</label>
                    <input type="password" class="form-control" id="password" name="password" required
                      v-model="registerForm.password"  style="height: 40px;" placeholder="至少8碼">
                </div>
                <div class="mb-4">
                    <label for="phone" class="form-label">手機號碼</label>
                    <input type="tel" class="form-control" id="phone" name="phone" required pattern="\d{10}"
                      v-model="registerForm.phone"  style="height: 40px;" placeholder="+886">
                </div>
                <button type="submit" class="btn btn-primary w-100">註冊</button>
            </form>
            <div class="mt-2 d-flex justify-content-between">
                <router-link to="/UserLogin" class="text-decoration-none">已有帳號？登入</router-link>
            </div>
        </div>
    </div>
</template>
<style scoped>
/* 唯讀欄位的樣式 */
.bg-readonly {
    background-color: #e9ecef;
}
</style>