//抓加入購物車按鈕、商品資訊
document.addEventListener('DOMContentLoaded', () => {
    //計算購物車總商品數量
    function updateCartCount() {
        let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        // 計算不同商品的數量
        const differentItems = cartItems.length;
        //更新圖標數量
        const updateCartCount = document.querySelectorAll('.cart-count');
        updateCartCount.forEach(cartcount => {
            cartcount.textContent = differentItems;
        });
    }
    const addCartBtn = document.querySelectorAll('.add-to-cart');
    //離最近的card元素 
    addCartBtn.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            //使用箭頭函式時，使用 e.target 來確定觸發事件的具體元素。
            //e.target=指向觸發事件的元素
            //找到有包含指定類別，最近html元素
            const card = e.target.closest('.card');
            const itemImg = card.querySelector('.card_img').src;
            const itemName = card.querySelector('.card-title').textContent;
            //只保留數字
            const itemPrice = parseFloat(card.querySelector('.card-text strong').textContent.replace('NT$', '').trim());
            const Time = new Date();
            //Time.toString() 是根據用戶設備的本地時間設定，不是根據用戶的物理位置（如通過 IP 地址）。
            //時間物件.toLocaleString ->可自訂格式
            const orderTime = Time.toLocaleString('zh-TW', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                hour12: false, //24小時制
                timeZone: 'Asia/Taipei', //設定時區
            });
            let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
            //檢查型別
            console.log("cartItems is array= " + Array.isArray(cartItems));
            cartItems.forEach(item => {
                console.log("cartItems= " + item.name + ' ' + item.price + ' ' + item.quantity);
            });
            //cartItems 是包含物件的陣列，裡面的元素即是物件
            //搜尋陣列裡是否有該商品，有的話+1，沒有就加入陣列
            const existItem = cartItems.find(item => item.name === itemName);
            //有的話 +1
            //應該改成結帳前再把訂單時間加進去
            if (existItem) {
                existItem.quantity += 1;
                existItem.orderTime = orderTime;
            } else {
                cartItems.push({
                    name: itemName,
                    price: itemPrice,
                    quantity: 1,
                    img: itemImg,
                    orderTime: orderTime,
                });
            }
            //cartItems（每個物件都有 name、price、quantity 、img 、orderTime 屬性）。
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
            updateCartCount();
        });
    });
    //點擊事件結束
    //頁面加載時更新購物車icon數量
    updateCartCount();

    //印出全部購物車商品
    cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    cartItems.forEach(item => {
        console.log('cartItems陣列= ' + item.name + ' ' + item.price + ' '
            + item.quantity + ' ' + item.img + ' ' + item.orderTime);
    });
    //點擊登出後清除資料
    const userLogout = document.querySelectorAll('#userLogout');
    userLogout.forEach(e => {
        e.addEventListener('click', () => {
            localStorage.clear();
        });
    });
});
