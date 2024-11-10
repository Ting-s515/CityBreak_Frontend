//抓加入購物車按鈕
//選最近card 抓名稱、價格、圖片
//有一個陣列去存 ->cartItems
//去遍歷陣列看有沒有同名商品，有+1，無就推進去
//更新購物車icon數量
document.addEventListener('DOMContentLoaded', () => {
    //更新icon數量
    function updateCartCount() {
        //json.parse轉成js物件
        const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        const updateCartCount = document.querySelectorAll('.cart-count');
        const differentItems = cartItems.length;
        updateCartCount.forEach(cartcount => {
            cartcount.textContent = differentItems;
        });
    }
    //抓加入購物車事件
    const cartBtn = document.querySelectorAll('.add-to-cart');
    cartBtn.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault;
            const card = e.target.closet('.card');
            const itemName = card.querySelector('.card-title').textContent;
            const itemPrice = parseFloat(card.querySelector('.card-text strong').textContent.replace('NT$', '').trim());
            const itemImg = card.querySelector('.card_img').src;

            //檢查陣列裡商品 + -數量
            const existItem = cartItems.find(item => { item.name === itemName });
            if (existItem) {
                quantity += 1;
            }
            else {
                cartItems.push({
                    name: itemName,
                    price: itemPrice,
                    quantity: 1,
                    img: itemImg,
                });
            }
            console.log("cartItems is array= " + Array.isArray(cartItems));
            //cartItems陣列轉成json，存在localStorage
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
            //轉成js物件
            let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
            cartItems.forEach(item => {
                console.log('cartItems= ', + item.name + '' + item.price + '' +
                    item.quantity);
            })
            updateCartCount();
        });
    });
    //點擊事件結束
    updateCartCount();
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    cartItems.forEach(item => {
        'cartItems= ' + item.name + '' + item.price + ''
            + item.quantity + '' + item.img
    });

    //登出清除資料
    const userLogout = document.querySelectorAll('#userLogout');
    userLogout.forEach(e => {
        e.addEventListener('click', () => {
            localStorage.clear();
        });
    });
});



