import {computed, ref} from 'vue';

// 建立購物車localStorage
const updateCart=function(){
    localStorage.setItem('cart',JSON.stringify(cart.value));
    console.log("購物車已更新",cart)
}
const cart=ref(JSON.parse(localStorage.getItem('cart')) || []);

// 新增商品到購物車
const addToCart=function(product){
    const existProduct=cart.value.find((item)=>item.productID===product.productID);
    if(existProduct){
        existProduct.quantity +=1;
    }
    else{
        cart.value.push({
            productID:product.productID,
            name: product.productName,
            price: product.unitPrice,
            img: product.imagePath,
            quantity:1,
        });
    }
    updateCart();
}

// 減少數量
const decrease=function(item){
    if(item.quantity>1){
        item.quantity -= 1;
        updateCart();
    }
    else{
        removeFromCart(item.productID);
    }
}

// 增加數量
const increase=function(item){
    item.quantity +=1;
    updateCart();
}

//移除單項商品
const removeFromCart=function(productID){
    const index=cart.value.findIndex((item)=>item.productID === productID);
    //找不到該索引返回-1
    if(index !== -1){
        //找到該索引，並刪除1個索引
        cart.value.splice(index,1);
        updateCart();
    }
};

//總價
const totalPrice=computed(()=>{
    return cart.value.reduce((total,item)=>total + item.price * item.quantity,0);
});

//清空購物車
const clearCart=function(){
    cart.value=[];
    updateCart();
    console.log(localStorage.getItem('cart'));
}

//計算品項數量
const cartItemCount =computed(()=>cart.value.length);

export{addToCart,decrease,increase,removeFromCart,cart,totalPrice,clearCart,cartItemCount};