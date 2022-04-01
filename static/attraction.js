function singlepage() {
  id = String(window.location.href);
  id = id.substr(-2, 2);
  let src = "/api/attraction/" + id;
  fetch(src)
    .then(function (response) {
      return response.json();
    })
    .then(function (result) {
      let data = result.data;
      let titlebox = document.getElementsByClassName("titlebox")[0];
      let title = document.createTextNode(data.name);
      let title2box = document.getElementsByClassName("title2box")[0];
      let title2 = document.createTextNode(
        data.category + " " + "at" + " " + data.mrt
      );
      let img_list = data.images;
      let contentbox = document.getElementsByClassName("contentbox")[0];
      let content = document.createTextNode(data.description);
      let address = document.getElementsByClassName("address")[0];
      let addresstext = document.createTextNode(data.address);
      let transport = document.getElementsByClassName("transport")[0];
      let transporttext = document.createTextNode(data.transport);
      let num = 0;
      titlebox.appendChild(title);
      title2box.appendChild(title2);
      contentbox.appendChild(content);
      address.appendChild(addresstext);
      transport.appendChild(transporttext);

      for (let i = 0; i < img_list.length; i++) {
        let tab = document.getElementById("tab");
        let tabImg = document.createElement("img");
        tabImg.className = "tabImg";
        tabImg.src = img_list[i];
        tab.appendChild(tabImg);
      }
      for (let i = 0; i < img_list.length - 1; i++) {
        num = num + 1;
        let lunbo_btn = document.getElementsByClassName("lunbo_btn")[0];
        let tabBtn = document.createElement("span");
        tabBtn.num = num;
        tabBtn.className = "tabBtn";
        lunbo_btn.appendChild(tabBtn);
      }
    });
}

singlepage();

function memberstatus() {
  fetch("/api/user", {
    method: "GET",
  })
    .then((response) => response.json())
    .then((res) => {
      if (res.data !== null) {
        document.getElementById("logout_button").style.display = "flex";
        document.getElementById("login_button").style.display = "none";
      } else {
        document.getElementById("logout_button").style.display = "none";
        document.getElementById("login_button").style.display = "flex";
      }
    });
}
memberstatus();

var Total_Obj = document.getElementsByClassName("radio-input");
let costelement = document.getElementsByClassName("costelement")[0];
let costtext = document.createTextNode(Total_Obj[0].value);
costelement.appendChild(costtext); //預設2000
Total_Obj[0].onclick = function () {
  costelement.innerHTML = "";
  let costtext = document.createTextNode(Total_Obj[0].value);
  costelement.appendChild(costtext);
};

Total_Obj[1].onclick = function () {
  costelement.innerHTML = "";
  let costtext = document.createTextNode(Total_Obj[1].value);
  costelement.appendChild(costtext);
};

var curIndex = 0; //初始化

var prve = document.getElementsByClassName("prve");
prve[0].onclick = function () {
  var img_number = document.getElementsByClassName("tabImg").length;
  console.log(img_number);
  //上一張
  curIndex--;
  if (curIndex == -1) {
    curIndex = img_number - 1;
  }
  slideTo(curIndex);
};

var next = document.getElementsByClassName("next");
next[0].onclick = function () {
  var img_number = document.getElementsByClassName("tabImg").length;
  console.log(img_number);
  //下一張
  curIndex++;
  if (curIndex == img_number) {
    curIndex = 0;
  }
  slideTo(curIndex);
};

//切換banner圖片 和 按鈕樣式
function slideTo(index) {
  var index = parseInt(index);
  console.log(index);
  var images = document.getElementsByClassName("tabImg");
  for (var i = 0; i < images.length; i++) {
    //遍歷每個圖片
    if (i == index) {
      images[i].style.display = "inline"; //顯示
    } else {
      images[i].style.display = "none"; //隱藏
    }
  }
  var tabBtn = document.getElementsByClassName("tabBtn");
  for (var j = 0; j < tabBtn.length; j++) {
    //遍歷每個按鈕
    if (j == index) {
      tabBtn[j].classList.add("hover"); //添加輪播按鈕hover樣式
      curIndex = j;
    } else {
      tabBtn[j].classList.remove("hover"); //去除輪播按鈕hover樣式
    }
  }
}

function createinfo() {
  currentid = String(window.location.href);
  currentid = currentid.substr(-2, 2);
  currentid = currentid.replace("/", "");
  currentid = Number(currentid);
  cost = document.getElementsByClassName("costelement")[0].innerText;
  dateValue = document.getElementById("date").value;
  morning = document.getElementById("1").checked;
  let data = {
    id: currentid,
    price: cost,
    date: dateValue,
    morningVlue: morning,
  };
  fetch("/api/booking", {
    method: "post",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((res) => {
      location.assign("/booking");
    });
}

document.getElementById("bookBtn").addEventListener("click", function () {
  fetch("/api/user")
    .then(function (response) {
      return response.json();
    })
    .then((result) => {
      let data = result.data;
      console.log(data);
      dateValue = document.getElementById("date").value;
      if (data !== null) {
        if (dateValue !== "") {
          createinfo();
        } else {
          let datebox = document.getElementsByClassName("datetbox")[0];

          let remindbox = document.createElement("div");
          remindbox.id = "remindbox";
          remindbox.innerHTML = "";
          let remind = document.createTextNode("請輸入日期");
          remind.id = "remind";
          remindbox.appendChild(remind);
          datebox.appendChild(remindbox);
        }
      } else {
        document.querySelector(".popup").style.display = "flex";
        stop();
      }
    });
});

document
  .getElementById("reservation_button")
  .addEventListener("click", function () {
    fetch("/api/user")
      .then(function (response) {
        return response.json();
      })
      .then((result) => {
        let data = result.data;
        console.log(data);
        if (data !== null) {
          location.assign("/booking");
        } else {
          document.querySelector(".popup").style.display = "flex";
          stop();
        }
      });
  });
