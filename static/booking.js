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

function userinfo() {
  fetch("/api/user")
    .then(function (response) {
      return response.json();
    })
    .then((result) => {
      if (result.data !== null) {
        let data = result.data;
        let st = document.getElementById("st");
        let stext = document.createTextNode(
          "您好 ，" + data.name + "， 帶預定的行程如下:"
        );
        st.appendChild(stext);
        let username = document.getElementById("name");
        username.value = data.name;
        let email = document.getElementById("email");
        email.value = data.email;
      }
    });
}
userinfo();

function bookBefore() {
  fetch("/api/booking")
    .then(function (response) {
      return response.json();
    })
    .then((result) => {
      if (result.error !== true) {
        if (result.data !== null) {
          let data = result.data;
          console.log(data);
          let s1_pic_out = document.getElementById("s1_pic_out");
          let bookImg = document.createElement("img");
          let attraction = document.getElementById("attraction");
          let attractiontext = document.createTextNode(
            "台北一日遊 : " + data.attraction.name
          );
          let date = document.getElementById("date");
          let datetext = document.createTextNode(data.date);
          let time = document.getElementById("time");
          let timetext = document.createTextNode(data.time);
          let cost = document.getElementById("cost");
          let costtext = document.createTextNode("新台幣" + data.price + "元");
          let address = document.getElementById("address");
          let addresstext = document.createTextNode(data.attraction.address);
          let totalcost = document.getElementById("totalcost");
          let totalcosttext = document.createTextNode(
            "總價 : 新台幣" + data.price + "元"
          );
          totalcost.appendChild(totalcosttext);
          address.appendChild(addresstext);
          cost.appendChild(costtext);
          time.appendChild(timetext);
          date.appendChild(datetext);
          attraction.appendChild(attractiontext);
          bookImg.className = bookImg;
          bookImg.src = data.attraction.image;
          s1_pic_out.appendChild(bookImg);
        } else {
          document.getElementById("warp").innerHTML = "";
          let stout = document.getElementById("stout");
          let nobook = document.createElement("div");
          nobook.id = "nobook";
          let nobooktext = document.createTextNode("目前沒有任何代預定的行程");
          let extendout = document.createElement("div");
          extendout.className = "extendout";
          let extend = document.createElement("div");
          extend.id = "extend";
          extendout.appendChild(extend);
          document.getElementById("extendout").style.display = "flex";
          nobook.appendChild(nobooktext);
          stout.appendChild(nobook);
        }
      } else {
        location.assign("/");
      }
    });
}
bookBefore();

document.getElementById("delete").addEventListener("click", function () {
  fetch("/api/booking", {
    method: "DELETE",
  })
    .then(function (response) {
      return response.json();
    })
    .then((result) => {
      if (result.ok === true) {
        document.getElementById("warp").innerHTML = "";
        let stout = document.getElementById("stout");
        let nobook = document.createElement("div");
        nobook.id = "nobook";
        let nobooktext = document.createTextNode("目前沒有任何代預定的行程");
        let extendout = document.createElement("div");
        extendout.className = "extendout";
        let extend = document.createElement("div");
        extend.id = "extend";
        extendout.appendChild(extend);
        document.getElementById("extendout").style.display = "flex";
        nobook.appendChild(nobooktext);
        stout.appendChild(nobook);
      }
    });
});
