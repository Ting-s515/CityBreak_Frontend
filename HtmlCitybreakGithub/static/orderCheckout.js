//抓結帳按鈕、抓名稱、數量、單價、總價、訂單時間、圖片
//結完帳後，導向到訂單明細網頁 
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('checkout-btn').addEventListener('click', () => {
        //總價
        const totalPrice = document.querySelector('#total-price').textContent;
        console.log("totalPrice= " + totalPrice);
        //cartItems是一個陣列
        cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        console.log('localStorage.cartItems= ' + localStorage.getItem('cartItems'));
        if (cartItems.length === 0) {
            alert("購物車內沒有商品");
            return;
        }
        const data = {
            cartItems: cartItems,
            totalPrice: totalPrice
        }
        fetch('/checkout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)

        })
            .then(response => response.text())  // 預期是 HTML 表單，所以使用 .text() 而不是 .json()
            .then(html => {
                // 將返回的 HTML 插入到頁面並自動提交
                const formContainer = document.createElement('div');
                formContainer.innerHTML = html;
                document.body.appendChild(formContainer);
                formContainer.querySelector('form').submit();  // 自動提交表單
                if (form) {
                    form.submit();
                }
                else {
                    console.error('HTML form not found');
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    });
    //確認localstorage大小
    // function getLocalStorageSize() {
    //     let totalSize = 0;
    //     // 遍歷 localStorage 的所有 key-value 並計算大小
    //     for (let key in localStorage) {
    //         if (localStorage.hasOwnProperty(key)) {
    //             let value = localStorage.getItem(key);
    //             // 每個 key 和 value 都是字串，使用字元數來估算大小
    //             totalSize += key.length + value.length;
    //         }
    //     }
    //     // 將總字元數轉換為 KB 
    //     let sizeInKB = totalSize / 1024;
    //     console.log(`LocalStorage 的大小約為: ${sizeInKB.toFixed(2)} KB`);
    // }
    // getLocalStorageSize();
});
