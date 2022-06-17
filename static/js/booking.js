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
          console.log(result);
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

function deleteBook() {
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
}

TPDirect.setupSDK(
  123992,
  "app_XpdqJEzCUtW3DqRCgzOrLSNfYRFz3ae3Zu6pxTdyp1qWYKOqWbuvN1lU4VFz",
  "sandbox"
);
TPDirect.card.setup({
  // Display ccv field
  fields: {
    number: {
      // css selector
      element: "#card-number",
      placeholder: "**** **** **** ****",
    },
    expirationDate: {
      // DOM object
      element: document.getElementById("card-expiration-date"),
      placeholder: "MM / YY",
    },
    ccv: {
      element: "#card-ccv",
      placeholder: "ccv",
    },
  },
  styles: {
    // Style all elements
    input: {
      color: "gray",
    },
    // Styling ccv field
    "input.ccv": {
      "font-size": "16px",
    },
    // Styling expiration-date field
    "input.expiration-date": {
      "font-size": "16px",
    },
    // Styling card-number field
    "input.card-number": {
      "font-size": "16px",
    },
    // style focus state
    ":focus": {
      color: "black",
    },
    // style valid state
    ".valid": {
      color: "green",
    },
    // style invalid state
    ".invalid": {
      color: "red",
    },
    // Media queries
    // Note that these apply to the iframe, not the root window.
    "@media screen and (max-width: 400px)": {
      input: {
        color: "orange",
      },
    },
  },
});
let submitButton = document.getElementById("confirmBtn");
TPDirect.card.onUpdate(function (update) {
  // update.canGetPrime === true
  // --> you can call TPDirect.card.getPrime()
  if (update.canGetPrime) {
    // Enable submit Button to get prime.
    let submitButton = document.getElementById("confirmBtn");
    submitButton.removeAttribute("disabled");
  } else {
    // Disable submit Button to get prime.
    let submitButton = document.getElementById("confirmBtn");
    submitButton.setAttribute("disabled", true);
  }
  // cardTypes = ['mastercard', 'visa', 'jcb', 'amex', 'unionpay','unknown']
  if (update.cardType === "visa") {
    // Handle card type visa.
  }
  // number 欄位是錯誤的
  if (update.status.number === 2) {
    setNumberFormGroupToError(".card-number-group");
  } else if (update.status.number === 0) {
    setNumberFormGroupToSuccess(".card-number-group");
  } else {
    setNumberFormGroupToNormal(".card-number-group");
  }

  if (update.status.expiry === 2) {
    setNumberFormGroupToError(".expiration-date-group");
  } else if (update.status.expiry === 0) {
    setNumberFormGroupToSuccess(".expiration-date-group");
  } else {
    setNumberFormGroupToNormal(".expiration-date-group");
  }

  if (update.status.cvc === 2) {
    setNumberFormGroupToError(".cvc-group");
  } else if (update.status.cvc === 0) {
    setNumberFormGroupToSuccess(".cvc-group");
  } else {
    setNumberFormGroupToNormal(".cvc-group");
  }
});

submitButton.addEventListener("click", function () {
  onSubmit();
});

function onSubmit(event) {
  // event.preventDefault();
  // 取得 TapPay Fields 的 status
  let phoneValue = document.getElementById("cellphone").value;
  const tappayStatus = TPDirect.card.getTappayFieldsStatus();
  // 確認是否可以 getPrime
  if (tappayStatus.canGetPrime === false || phoneValue === "") {
    document.getElementById("checkinfoBox").innerHTML = "";
    let checkinfoBox = document.getElementById("checkinfoBox");
    let checkinfo = document.createElement("div");
    checkinfo.id = "checkinfo";
    let checkinfo_text = document.createTextNode("請確實填寫聯絡資訊與卡號");
    checkinfo.appendChild(checkinfo_text);
    checkinfoBox.appendChild(checkinfo);
    return;
  } else {
    // Get prime
    TPDirect.card.getPrime((result) => {
      if (result.status !== 0) {
        return;
      }
      let data = {
        prime: result.card.prime,
        username: document.getElementById("name").value,
        email: document.getElementById("email").value,
        phone: phoneValue,
      };
      fetch("/api/orders", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((res) => {
          console.log(res);
          if (res.data !== "") {
            if (res.data.payment.status === 0) {
              // deleteBook();
              let orderNumber = res.data.number;
              location.assign("/thankyou?number=" + orderNumber);
            } else {
              document.getElementById("checkinfoBox").innerHTML = "";
              let checkinfoBox = document.getElementById("checkinfoBox");
              let checkinfo = document.createElement("div");
              checkinfo.id = "checkinfo";
              let checkinfo_text = document.createTextNode("付款失敗");
              checkinfo.appendChild(checkinfo_text);
              checkinfoBox.appendChild(checkinfo);
            }
          } else {
            document.getElementById("checkinfoBox").innerHTML = "";
            let checkinfoBox = document.getElementById("checkinfoBox");
            let checkinfo = document.createElement("div");
            checkinfo.id = "checkinfo";
            let checkinfo_text = document.createTextNode("付款失敗");
            checkinfo.appendChild(checkinfo_text);
            checkinfoBox.appendChild(checkinfo);
          }
        });

      // send prime to your server, to pay with Pay by Prime API .
    });
  }
}
function setNumberFormGroupToError(selector) {
  $(selector).addClass("has-error");
  $(selector).removeClass("has-success");
}

function setNumberFormGroupToSuccess(selector) {
  $(selector).removeClass("has-error");
  $(selector).addClass("has-success");
}

function setNumberFormGroupToNormal(selector) {
  $(selector).removeClass("has-error");
  $(selector).removeClass("has-success");
}

function forceBlurIos() {
  if (!isIos()) {
    return;
  }
  var input = document.createElement("input");
  input.setAttribute("type", "text");
  // Insert to active element to ensure scroll lands somewhere relevant
  document.activeElement.prepend(input);
  input.focus();
  input.parentNode.removeChild(input);
}

function isIos() {
  return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
}
