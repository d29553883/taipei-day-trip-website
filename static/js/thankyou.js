function thankyouPage() {
  x = String(window.location.href);
  let orderNumber = x.slice(-14);
  fetch("/api/orders/" + orderNumber, {
    method: "GET",
  })
    .then((response) => response.json())
    .then((res) => {
      let ordernumber = res.data.number;
      let numberBox = document.getElementById("numberBox");
      let number = document.createElement("div");
      number.className = "ordernumber";
      let number_text = document.createTextNode(ordernumber);
      number.appendChild(number_text);
      numberBox.appendChild(number);
    });
}

thankyouPage();

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
