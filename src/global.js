import { ref } from 'vue';
import mitt from 'mitt';
export const apiUrl = 'https://localhost:7130';
export const userName = ref(localStorage.getItem('userName') || ''); 
export const userEmail=ref(localStorage.getItem('userEmail') || '');
export const userID=ref(localStorage.getItem('userID') || '');
export const createdDate=ref(localStorage.getItem('createdDate') || '');
//資料不持久，重整會消失
// export const userName = ref(''); 
// export const userEmail = ref('');
// export const userID = ref('');
export const formatDate=function(orderTime){
    const options={
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12:false,
    };
    return new Date(orderTime).toLocaleString('zh-TW',options);
};
//Global Event Bus事件處理
export const event=mitt();