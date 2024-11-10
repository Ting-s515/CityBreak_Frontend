// querySelectorAll傳回一個 NodeList，可以用來遍歷和操作多個元素。
//NodeList 是一個類似陣列的物件，但它不是陣列。不能直接使用陣列的方法（如 push、pop 等），
//但可以使用 forEach 來遍歷每個元素。
document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.search_Form').forEach((form) => {
        form.addEventListener('submit', function (e) {
            let searchInputs = form.querySelectorAll('.search_Input');
            //Array.from() 用於將 NodeList 轉換為陣列
            //every() 陣列的方法，接收一個回調函式(callback function)，
            //用來檢查陣列中的每個元素是否滿足條件
            let checkNull = Array.from(searchInputs).every(function (input) {
                return input.value.trim() === '';
            });
            // .trim()方法，用於去除字串兩端的空白字符
            // 檢查是否有輸入
            if (checkNull) {
                e.preventDefault();
                alert('請輸入搜尋關鍵字');
            }
        });
    });
});