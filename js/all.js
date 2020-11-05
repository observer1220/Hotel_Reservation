// 建立變數load：在開啟網頁時，顯示class名稱load裡的值(資料載入中)，並在getData取得資料後，將內容改變為空值
let load = document.querySelector('.load');
// 建立變數roomType：選取HTML頁class名稱roomType的項目
let roomType = document.querySelector('.roomType');
let reserveInfo = document.querySelector('.reserveInfo');

// 建立變數nowurl：取得當前網頁的網址參數，擷取等號('=')後的第1個字串
let nowurl = location.search.split('=')[1];
// 因單一房型及多人房型的網址只差在/rooms及/room/{id}，所以將重複的網址存成一個變數，之後再以組字串的方式進到特定網址
const url = 'https://challenge.thef2e.com/api/thef2e2019/stage6/';
// 宣告常數token：填入自己的token代號(常數只要宣告完畢就不能改變了)
const token = '3AuT7x3ltYcgVYEzPMftKVHFbw9obKYAHLLV9yvGtAjBKNs5CVUtUoJHdcvQ';

// 先定義一個陣列，存放撈回的資料
let roomsData = [];

// 擷取目前時間
let _date = new Date;
// 建立常數thisDate：調整時間格式
let _thisDate = _date.getFullYear() + '-' + (_date.getMonth() + 1) + '-' + ('0' + _date.getDate());

// 建立函式getData，建立參數links
function getData(links) {
    // 設定axios認證token預設值(固定語法)
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    // 以axios到特定網址取得資料，此處的網址為參數links，在尚未設定參數內容前為空值
    axios.get(links)
        .then((res) => {
            // 選取HTML頁面名為load的class名稱，以innerHTML的方式塞入一個空值(將資料載入中...的字樣覆蓋掉)
            load.innerHTML = '';
            // 判斷變數nowurl是否為undefined
            if (nowurl === undefined) {
                // 如果是，就以res.data.items的路徑提取資料
                roomsData = res.data.items;
                // 並執行函式category()的內容(顯示頁面資訊)
                category();
            } else {
                // 如果不是，就以res.data.room的路徑提取資料
                roomsData = res.data.room;
                // 並執行函式roomDetails()的內容(顯示頁面資訊)
                roomDetails();
            }
        });
};

// 函式category
function category() {
    // 設定變數str的預設值為空值
    let str = '';
    // 設定forEach陣列名稱為roomsData、元素名稱為item
    // 陣列roomsData預設值為空值，當getData判斷式為true時roomsData = res.data.items
    // 參數item為res.data.items裡的每個項目
    roomsData.forEach((item) => {
        console.log(item)
        // 設定變數str內容：為什麼a連結只寫./room.html?recommed=${item.id}，不用寫url
        str +=
            `<li>
        <div class="roominfo">
            <img class="roomImage" src="${item.imageUrl}" alt="">
            <p class="roominfoWord">${item.name}</p>
            <p class="roominfoWord">平日(一~四)：$${item.normalDayPrice}</p>
            <p class="roominfoWord">假日(五~日)：$${item.holidayPrice}</p>
            <a class="reserve" href="./room.html?recommed=${item.id}">訂房去</a>
        </div>
        </li>`;
    });
    // 選取HTML頁class名稱為roomType的項目，並插入上述字串
    roomType.innerHTML = str;
}

// 函式roomDetails
function roomDetails() {
    // 設定變數str的預設值為空值
    let str = '';
    // 設定forEach陣列名稱為roomsData、元素名稱為item
    // 陣列roomsData預設值為空值，當getData判斷式為false時roomsData = res.data.room
    // 參數item為res.data.room裡的每個項目(此處只有一個項目)
    roomsData.forEach((item) => {
        // 顯示item.imageUrl裡的圖片內容
        str +=
            `<li>
        <div class="detailImageGroup">
            <img class="detailImage" src="${item.imageUrl[0]}">
            <div class="imageThumbnail">
                <img class="detailImage2" src="${item.imageUrl[1]}">
                <img class="detailImage3" src="${item.imageUrl[2]}">
            </div>
        </div>
        <div class="detailInfo">
            <div class="detailMain">
                <div class="detailText">
                    <p class="detailTitle">${item.name}</p>
                    <p class="detailDescribe">${item.description}</p>

                    <p>房間人數限制：${item.descriptionShort.GuestMax}人</p>
                    <p>衛浴數量：${item.descriptionShort["Private-Bath"]}間</p>
                    <p>房間大小：${item.descriptionShort.Footage}平方公尺</p>

                    <p>Check-In時段：${item.checkInAndOut.checkInEarly}~${item.checkInAndOut.checkInLate}</p>
                    <p>Check-Out時段：${item.checkInAndOut.checkOut}</p>
                </div>
            <form class="reserveForm" action="">
                <div class="reservePrice">
                    <p>平日(一~四)價格：<span class="reservePriceStyle">$${item.normalDayPrice}</span></p>
                    <p>假日(五~日)價格：<span class="reservePriceStyle">$${item.holidayPrice}</span></p>
                </div>
                <label class="personNameUser">
                    <input type="text" class="personName" id="personName" placeholder="Name">
                </label>
                <label class="personTelUser">
                    <input type="tel" class="personTel" id="personTel" placeholder="Phone">
                </label>
                <label class="CheckInDateUser">
                    <input type="text" class="checkInDate" id="checkInDate" placeholder="Check-In & Check-Out">
                </label>
                <input type="button" class="reserveButton" id="reserveButton" value="確認送出">
                <input type="button" class="cancelButton" id="cancelButton" value="取消訂單">
            </form>
          </div>
          <div class="detailLogoGroup">
            <div class="col-lg-4 ${item.amenities["Wi-Fi"] ? "text-success" : "text-muted"}"><i class="fas fa-wifi"></i><span class="pl-2">Wi-Fi</span></div>
            <div class="col-lg-4 ${item.amenities["Breakfast"] ? "text-success" : "text-muted"}"><i class="fas fa-utensils"></i><span class="pl-2">早餐</span></div>
            <div class="col-lg-4 ${item.amenities["Mini-Bar"] ? "text-success" : "text-muted"}"><i class="fas fa-glass-martini-alt"></i><span class="pl-2">酒吧</span></div>
          
            <div class="col-lg-4 ${item.amenities["Room-Service"] ? "text-success" : "text-muted"}"><i class="fas fa-concierge-bell"></i><span class="pl-2">客房服務</span></div>
            <div class="col-lg-4 ${item.amenities["Television"] ? "text-success" : "text-muted"}"><i class="fas fa-tv"></i><span class="pl-2">電視</span></div>
            <div class="col-lg-4 ${item.amenities["Air-Conditioner"] ? "text-success" : "text-muted"}"><i class="fas fa-wind"></i><span class="pl-2">空調</span></div>
          
            <div class="col-lg-4 ${item.amenities["Refrigerator"] ? "text-success" : "text-muted"}"><i class="fas fa-box"></i><span class="pl-2">冰箱</span></div>
            <div class="col-lg-4 ${item.amenities["Sofa"] ? "text-success" : "text-muted"}"><i class="fas fa-couch"></i><span class="pl-2">沙發</span></div>
            <div class="col-lg-4 ${item.amenities["Great-View"] ? "text-success" : "text-muted"}"><i class="fas fa-binoculars"></i><span class="pl-2">景觀</span></div>
          
            <div class="col-lg-4 ${item.amenities["Smoke-Free"] ? "text-success" : "text-muted"}"><i class="fas fa-smoking"></i><span class="pl-2">抽菸</span></div>
            <div class="col-lg-4 ${item.amenities["Child-Friendly"] ? "text-success" : "text-muted"}"><i class="fas fa-child"></i><span class="pl-2">兒童友善</span></div>
            <div class="col-lg-4 ${item.amenities["Pet-Friendly"] ? "text-success" : "text-muted"}"><i class="fas fa-dog"></i><span class="pl-2">寵物友善</span></div>
        </div>
        </div>
        </li>`;
        console.log(item)
    });
    // 選取HTML頁class名稱為roomType的項目，並插入上述字串
    roomType.innerHTML = str;

    // 導入flatpicker日曆API
    $("#checkInDate").flatpickr({
        mode: "range",
        minDate: "today", // 最小日期：今天
        maxDate: new Date().fp_incr(90), // 最大日期：90 days from now
    });

    // 建立變數reserveButton：選取HTML頁class名稱為personTel的項目
    const reserveButton = document.getElementById('reserveButton');
    const cancelButton = document.getElementById('cancelButton');
    // 必須等axios.get到資料後，roomDetails才會將文字渲染到HTML頁面
    // roomDetails的文字內容渲染到HTML頁面，reserveButton才監聽得到東西
    reserveButton.addEventListener('click', postData, false);
    cancelButton.addEventListener('click', cancelData, false);
}
// 執行函式getData並設定links內容
// links = https://challenge.thef2e.com/api/thef2e2019/stage6/rooms
getData(`${url}rooms`);
// links = https://challenge.thef2e.com/api/thef2e2019/stage6/room/{id}
getData(`${url}room/${nowurl}`);

// 建立函式PostData
function postData() {
    // 建立常數personName：選取HTML頁class名稱為personName的項目
    const personName = document.getElementById('personName').value;
    // 建立常數personTel：選取HTML頁class名稱為personTel的項目
    const personTel = document.getElementById('personTel').value;

    const startRange = document.querySelector('.startRange').dateObj;
    const inRange = document.querySelectorAll('.inRange');
    const endRange = document.querySelector('.endRange').dateObj;

    // 重組startRange字串
    const sR = new Date(startRange).getFullYear() + '-' + (new Date(startRange).getMonth() + 1) + '-' + new Date(startRange).getDate();
    // 重組inRange字串：因為inRange可能有很多個，因此先建立一個空陣列，再以for迴圈及push將日期丟到isIR
    let isIR = [];
    for (i = 0; i < inRange.length; i++) {
        const iR = new Date(inRange[i].dateObj).getFullYear() + '-' + (new Date(inRange[i].dateObj).getMonth() + 1) + '-' + new Date(inRange[i].dateObj).getDate();
        isIR.push(iR);
    };
    // 重組endRange字串
    const eR = new Date(endRange).getFullYear() + '-' + (new Date(endRange).getMonth() + 1) + '-' + new Date(endRange).getDate();


    // 建立常數booking陣列：name(字串)、tel(字串)、date(陣列)準備存放使用者資料
    const booking = {
        name: '',
        tel: '',
        date: [],
    }
    let str = '';
    // 當personName等於空值時，顯示請填寫聯絡姓名
    if (personName === '') {
        alert('請輸入姓名')
        // 當personTel等於空值時，顯示請填寫手機號碼
    } else if (personTel === '') {
        alert('請輸入電話')
        // 當checkInDate等於空值時，顯示請輸入入住時間
        // } else if (startRange === '') {
        //       alert('請輸入訂房時間')
    } else {
        // 常數booking欄位的name等於常數personName
        booking.name = personName
        // 常數booking欄位的tel等於常數personTel
        booking.tel = personTel
        // 常數booking欄位的date等於常數sR,iR,eR
        // ...可將陣列攤開
        booking.date = [sR, ...isIR, eR]
        // 設定axios認證token預設值(固定語法)
        axios.defaults.headers.common.Authorization = `Bearer ${token}`;
        // 以axios到預約房型的網站擷取資料，並將常數booking擷取到的值傳入其中
        axios.post(`${url}room/${nowurl}`, booking)
            .then((res) => {
                // 查看常數booking擷取到什麼資料?
                console.log(booking)
                swal("訂房成功", `預約日期：${sR}~${eR}`, "success");
            }).catch((err) => {
                swal("訂房失敗", `此日期已無法預約😢`, "error");
            })
    }
}

// 刪除功能
function cancelData() {
    const booking = {
        name: '',
        tel: '',
        date: [],
    }
    let str = '';
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    // 以axios.delete的方式，刪除booking常數裡的所有資料
    axios.delete(`${url}rooms`, booking)
        .then((res) => {
            // 刪除HTML頁的訂房內容
            console.log(booking)
        })
}

// function windowSize(){
//     var width = this.innerWidth;
//     var height = this.innerHeight;
//     return [height, width];
//   }
//   console.log(windowSize());

// let xhr = new XMLHttpRequest();
// xhr.open('get','https://challenge.thef2e.com/api/thef2e2019/stage6/rooms',true);
// // xhr.setRequestHeader('Content-type','application/json');
// xhr.send();
// xhr.onload = function(){
//     data = JSON.parse(xhr.responseText);
//     console.log(data)
// }

// function init() {
//     getData();
// }
// init();

// // 帳號登入(signin)
// let xhr2 = new XMLHttpRequest();
// xhr2.open('post', 'https://hexschool-tutorial.herokuapp.com/api/signin', true);
// // 設定請求頭：傳送格式、編碼方式
// xhr2.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
// xhr2.send('email=lovef2e@hexschool.com&password=12345678');
// let account = {
//     email: 'qwe22r@hexschool.com',
//     password: '123456'
// }

// // 帳號註冊(signup)
// let xhr;
// // 建立變數send，從HTML頁面擷取class名稱為.send的項目
// let send = document.querySelector('.send');
// // 指定變數send並監聽此項目(當此項目被點擊時，觸發函式signup、冒泡)
// send.addEventListener('click', signup, false);

// // 函式signup
// function signup() {
//     // 設定變數account為空值
//     let account = {};
//     // 設定變數emailStr，從HTML頁面擷取class名稱為.account的項目，並撈出裡面的值
//     let emailStr = document.querySelector('.account').value;
//     // 設定變數passwordStr，從HTML頁面擷取class名稱為.password的項目，並撈出裡面的值
//     let passwordStr = document.querySelector('.password').value;
//     // 設定變數account.email的內容為emailStr
//     account.email = emailStr;
//     // 設定變數account.password的內容為passwordStr
//     account.password = passwordStr;

//     let xhr = new XMLHttpRequest();
//     xhr.open('post', 'https://hexschool-tutorial.herokuapp.com/api/signup', true);
//     xhr.setRequestHeader('Content-type', 'application/json');
//     let data = JSON.stringify(account);
//     // 將變數account裡的資料轉為字串
//     // account原始形式：{email:"qwe22e@hexschool.com",password:"123456"};
//     // account轉成字串：{"email":"qwe22e@hexschool.com","password":"123456"};
//     xhr.send(data);
//     xhr.onload = function () {
//         let callbackData = JSON.parse(xhr.responseText);
//         let veriStr = callbackData.message;
//         if (veriStr == '帳號註冊成功') {
//             alert('😊帳號註冊成功囉~~~')
//         } else {
//             alert('😢帳號註冊失敗')
//         }
//     }
// }

// // 在window作用域宣告變數name，並賦予名稱為臺灣
// var name = '臺灣';
// // 在window作用域宣告變數KH為1個陣列，且當中有4個物件
// var KH = {
//     // 第1個物件name為高雄
//     name: '高雄',
//     // 第2個物件callName1為一個匿名函式
//     // 因console.log(1,2,3)都寫在function的作用域裡，所以this會指向陣列KH
//     callName1: function () {
//         console.log('1', this.name); // 1 高雄
//         console.log('2', this); // 2 指向陣列kaohsiung
//     },
//     // 第3個物件callName2為縮寫版的的匿名函式
//     // 雖然沒有把function寫出來，卻具有function的作用域，，所以this會指向陣列KH
//     callName2() {
//         console.log('3', this.name); // 3 高雄
//         console.log('4', this); // 4 指向陣列kaohsiung
//     },
//     // 第4個物件callName3為ES6版本的箭頭函式
//     // 沒有參數(parameter)時，箭頭函式前一定要有括號，有參數時，則不須有括號
//     // 因cosole.log(7,8,9)，並不是寫在function的作用域裡，所以this會指向window作用域
//     callName3: () => {
//         console.log('5', this.name); // 5 臺灣
//         console.log('6', this); // 6 指向window作用域
//     },
// }
// KH.callName1();
// KH.callName2();
// KH.callName3();

// // 函式：擷取第1個數字
// function getFirstNum() {
//     return new Promise((FirstNum) => {
//         // 以setTimeout模擬等待過程
//         setTimeout(function () {
//             FirstNum(3);
//         }, 3000);
//     });
// }
// // 函式：擷取第2個數字
// function getSecondNum() {
//     return new Promise((SecondNum) => {
//         SecondNum(4);
//     });
// }

// // 函式：加總參數X與Y
// function add(X, Y) {
//     // 當擷取到同步返回的兩個參數後，執行一個匿名函式，這個匿名函式裡有一個參數叫value
//     return Promise.all([X, Y]).then(function (value) {
//         // 執行加法運算：因Promise.all必須以陣列方式回傳，所以value[0]就是參數X，value[1]就是參數Y
//         return value[0] + value[1];
//     });
// }
// // 執行函式add，將函式getFirstNum所擷取到的數字丟入參數X，將函式getSecondNum所擷取到的數字丟入參數Y
// add(getFirstNum(), getSecondNum()).then(
//     function (sum) {
//         console.log(sum); // 列印加總
//     },
//     function (err) {
//         console.error(err); // 列印錯誤
//     },
// );

// // 建立變數mingRunPromise，箭頭函式(參數someone)
// let mingRunPromise = (someone) => {
//     // 建立變數ran：解析Math.random回傳的數字，並返回一個整數
//     // 返回0時顯示失敗，返回1時顯示成功
//     // Math.random解析後之所以要乘以2，是因為返回的數字介於0~1之間，若不乘以2，數字永遠都會小於1
//     let ran = parseInt(Math.random() * 2);
//     // 顯示someone開始跑步的訊息
//     console.log(`${someone} 開始跑步`);
//     // 返回new Promise及兩個參數(resolve, reject)
//     return new Promise((resolve, reject) => {
//         if (ran) {
//             setTimeout(() => {
//                 resolve(`${someone}抵達終點，花了3秒`); // 3秒時間後，透過 resolve 來表示完成
//             }, 3000);
//         } else {
//             reject(`${someone}跌倒失敗`); // 回傳失敗
//         }
//     });
// }

// mingRunPromise('小明').then((sucess) => {
//     console.log(sucess); // 成功訊息(需要3秒)
// }).catch((fail) => {
//     console.log(fail); // 失敗訊息 (立即)
// });