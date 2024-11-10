//檢查用戶是否登入，會跳出"請先登入"提示
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('#cart-button').forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            // 使用API 確認用戶是否登入
            fetch('/userVerify')
                .then(response => response.json())
                .then(data => {
                    const gmail = data.email;
                    const localEmail = data.user.localEmail;
                    console.log("Gmail from API= ", gmail);
                    console.log("localEmail from API= ", localEmail);
                    //如果兩個都為空值
                    if (!gmail && !localEmail) {
                        alert("請先登入");
                        window.location.href = "/userLogin";
                    } else {
                        window.location.href = "/cart";
                    }
                })
        });
    });
});
//檢查用戶是否登入，動態變更icon顯示資訊
document.addEventListener('DOMContentLoaded', () => {
    fetch('/userVerify')
        .then(response => response.json())//後端傳回來json資料轉成js物件
        .then(data => {
            //因為user=data.user; user是物件，key-value，if(user)空物件也是true
            //所以要檢查物件是否有值，必須要檢查要有沒有key
            //Object.keys(user).length === 0  檢查key數量
            const gmail = data.email;
            const localEmail = data.user.localEmail;
            const name = data.user.name;
            const memberID = data.memberID;
            console.log("Gmail from API= ", gmail);
            console.log("localEmail from API= ", localEmail);
            console.log("Name from API= ", name);
            const userInfo = document.querySelectorAll('#user-info');
            const userLogin = document.querySelectorAll('#userLogin');
            const userLogout = document.querySelectorAll('#userLogout');
            if (localEmail) {
                userInfo.forEach(userInfo => {
                    userInfo.innerText = `會員: ${name} 您好`;
                })
                userLogin.forEach(userLogin => {
                    userLogin.style.display = 'none';
                })
                userLogout.forEach(userLogout => {
                    userLogout.style.display = "inline";
                })
            }
            else if (gmail) {
                // userInfo.forEach(userInfo => {
                //     userInfo.innerText = 'Google會員已登入';
                // })
                userInfo.forEach(userInfo => {
                    userInfo.innerText = `會員: ${memberID} 您好`;
                })
                userLogin.forEach(userLogin => {
                    userLogin.style.display = 'none';
                })
                userLogout.forEach(userLogout => {
                    userLogout.style.display = "inline";
                })
            }
        })
});

