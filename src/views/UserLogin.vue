<script setup>
    import { useRouter } from 'vue-router';
    import LogoAndIcon from '../components/LogoAndIcon.vue';
    import axios  from 'axios';
    import { ref,onMounted } from 'vue';
    import { userName,userEmail,userID,createdDate } from '@/global';
    const router=useRouter();
    const loginForm=ref({
        email:'',
        password:'',
    });
    const forgetPasswordForm = ref({
        email: '',
        phone: '',
        newPassword: '',
        confirmPassword: '',
    });
   
    // 定義 API
    const apiUrl='https://localhost:7130';
    const login=async()=>{
        // console.log(loginForm.value.email, loginForm.value.password);
        try{
            const response =await axios.post(`${apiUrl}/login`,{
                email:loginForm.value.email,
                password:loginForm.value.password,
            });
            if(response.data.success){
                let data=response.data;
                console.log(data.name,data.email,data.id,data.createdDate);
                // console.log(typeof data.createdDate);
                //全域共享
                userName.value=data.name;
                userEmail.value=data.email;
                userID.value=data.id;
                createdDate.value=data.createdDate;
                localStorage.setItem('userName', userName.value);
                localStorage.setItem('userEmail',userEmail.value);
                localStorage.setItem('userID',userID.value);
                localStorage.setItem('createdDate',createdDate.value);
                alert("登入成功");
                router.push('/');
            }
            else{
                console.log(response.data.message);
                alert(response.data.message);
            }
        }
        catch(error){
            if (error.response) {
                console.error('錯誤回應數據：', error.response.data);
                alert(error.response.data.message || "伺服器錯誤");
            } else {
                console.error('其他錯誤：', error.response);
                alert("無法連接伺服器");
            }
        }
    }

    const googleLogin=async()=>{
        localStorage.setItem("isGoogleLogin",'true');
        window.location.href = `${apiUrl}/googleLogin`;
    }
    
    //忘記密碼--驗證帳戶
    const showPasswordInput = ref(false);
    const errorMessage = ref('');
    const readonlyInput=ref(false);
    const verifyAccount = async () => {
        try {
            const response = await axios.post(`${apiUrl}/verifyAccount`, {
                email: forgetPasswordForm.value.email,
                phone: forgetPasswordForm.value.phone,
            });
            
            if (response.data.success) {
                showPasswordInput.value = true;
                readonlyInput.value=true;
                errorMessage.value = '';
            } else {
                errorMessage.value = response.data.message;
            }
        } catch (error) {
            console.error('Error:', error.response);
            errorMessage.value = error.response.data.message || '驗證失敗';
        }
    }

    const resetPassword = async () => {
        if (forgetPasswordForm.value.newPassword !== forgetPasswordForm.value.confirmPassword) {
            errorMessage.value = '輸入的密碼不一致';
            return;
        }
        try {
                const response = await axios.post(`${apiUrl}/resetPassword`, {
                email: forgetPasswordForm.value.email,
                password: forgetPasswordForm.value.newPassword,
            });
            console.log(forgetPasswordForm.value.email);
            if (response.data.success) {
                alert('密碼重設成功！');
                const modal = document.getElementById('forgetPasswordModal');
                //獲取 modal 實體
                const bootstrapModal = bootstrap.Modal.getInstance(modal);
                //關閉
                bootstrapModal.hide();
                resetForm();
            } else {
                errorMessage.value = response.data.message;
                console.log(response.data.message);
            }
        } catch (error) {
            errorMessage.value = error.response.data.message || '重設密碼失敗';
            console.error('Error:', error.response);
        }
    };

    const resetForm = () => {
        forgetPasswordForm.value = {
            email: '',
            phone: '',
            newPassword: '',
            confirmPassword: '',
        };
        showPasswordInput.value = false;
        errorMessage.value = '';
    };

    const handleSubmit = () => {
        if (showPasswordInput.value) {
            resetPassword();
        } else {
            verifyAccount();
        }
    };
</script>
<template>
    <div class="container w-75">
        <LogoAndIcon></LogoAndIcon>
    </div>
    
  
 <div class="d-flex justify-content-center align-items-center mt-5">
        <div class="border" style="width: 500px; height: 450px; padding: 20px;">
            <h3 class="text-center mb-3">會員登入</h3>
            <form @submit.prevent="login">
                <div class="mb-3">
                    <label for="email" class="form-label">Email</label>
                    <input type="email" class="form-control" id="email" name="email" placeholder="輸入您的Email" 
                    v-model="loginForm.email" required>
                </div>
                <div class="mb-3">
                    <label for="password" class="form-label">Password</label>
                    <!-- type="password" 顯示為星號（*） -->
                    <input type="password" class="form-control" id="password" name="password" placeholder="輸入您的密碼"
                     v-model="loginForm.password" required>
                </div>
                <button type="submit" class="btn btn-primary w-100" style="height: 40px;">登入</button>
            </form>
            <div class="mb-2 mt-3">
                <button type="button" class="btn btn-outline-secondary d-flex align-items-center justify-content-center w-100"
                style="height:40px ;"@click="googleLogin">
                    <img src="../../public/image/Google.png" alt="google-icon" class="" style="height: 30px;">Google登入
                </button>
            </div>
            <div class="d-flex align-items-center justify-content-between mt-3">
                <router-link to="/UserRegister" class="text-decoration-none">
                    <button type="button" class="btn btn-secondary" style="width: 150px;">按此註冊會員</button>
                </router-link>
                <a href="#" class="text-decoration-none" data-bs-toggle="modal" data-bs-target="#forgetPasswordModal">
                    <button type="button" class="btn btn-secondary" style="width: 150px;">忘記密碼</button>
                </a>
            </div>
        </div>
    </div>
    <div class="modal fade" id="forgetPasswordModal" tabindex="-1" aria-labelledby="forgetPasswordModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="forgetPasswordModalLabel">忘記密碼</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="resetForm"></button>
                </div>
                <div class="modal-body">
                    <form @submit.prevent="handleSubmit">
                        <div class="mb-3">
                            <label for="forgetEmail" class="form-label">Email</label>
                            <input type="email" class="form-control" id="forgetEmail" 
                                v-model="forgetPasswordForm.email" 
                                :readonly="readonlyInput"
                                :class="{ 'bg-readonly': readonlyInput }"
                                required>
                        </div>
                        <div class="mb-3">
                            <label for="phone" class="form-label">手機號碼</label>
                            <input type="tel" class="form-control" id="phone" 
                                v-model="forgetPasswordForm.phone" 
                                :readonly="readonlyInput"
                                :class="{ 'bg-readonly': readonlyInput }"
                                required>
                        </div>
                        
                        <template v-if="showPasswordInput">
                            <div class="mb-3">
                                <label for="newPassword" class="form-label">新密碼</label>
                                <input type="password" class="form-control" id="newPassword" 
                                    v-model="forgetPasswordForm.newPassword" required>
                            </div>
                            <div class="mb-3">
                                <label for="confirmPassword" class="form-label">確認新密碼</label>
                                <input type="password" class="form-control" id="confirmPassword" 
                                    v-model="forgetPasswordForm.confirmPassword" required>
                            </div>
                        </template>

                        <div v-if="errorMessage" class="alert alert-danger">{{ errorMessage }}</div>

                        <div class="text-center">
                            <button type="submit" class="btn btn-primary">
                                {{ showPasswordInput ? '確認重設密碼' : '驗證帳號' }}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
.modal-dialog {
    max-width: 450px;
    margin: 1.75rem auto;
}

.modal-content {
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

/* 動畫效果 */
.modal.fade .modal-dialog {
    transition: transform 0.3s ease-out;
}

.modal.show .modal-dialog {
    transform: none;
}

/* 唯讀欄位 */
.bg-readonly {
    background-color: #e9ecef;
}
</style>