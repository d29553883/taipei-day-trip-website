let Page = 0;
let htmlStr = "";

function createdata() {
  let src = "/api/attractions?page=0";
  fetch(src)
    .then(function (response) {
      return response.json();
    })
    .then(function (result) {
      let img_list = [];
      let name_list = [];
      let mrt_list = [];
      let category_list = [];
      let datas = result.data;
      let nextpage = result.nextPage;
      Page = nextpage;

      for (let i in datas) {
        name_list.push(datas[i].name);
        img_list.push(datas[i].images[0]);
        mrt_list.push(datas[i].mrt);
        category_list.push(datas[i].category);
      }
      for (let i = 0; i < datas.length; i++) {
        let pic = document.getElementsByClassName("warp")[0];
        let divitem = document.createElement("item");
        let name_container = document.createElement("div");
        let divtext = document.createElement("div");
        let p_container = document.createElement("div");
        let mrt_text = document.createElement("div");
        name_container.className = "name_container";
        mrt_text.className = "mrt_text";
        let category_text = document.createElement("div");
        category_text.className = "category_text";
        let textNode = document.createTextNode(name_list[i]);
        divitem.className = "item";
        divtext.className = "pictext";
        p_container.className = "p_container";
        let imgNode = document.createElement("img");
        imgNode.className = "cover";
        let mrtNode = document.createTextNode(mrt_list[i]);
        let categoryNode = document.createTextNode(category_list[i]);
        imgNode.src = img_list[i];
        divtext.appendChild(textNode);
        mrt_text.appendChild(mrtNode);
        name_container.appendChild(divtext);
        category_text.appendChild(categoryNode);
        p_container.appendChild(imgNode);
        p_container.appendChild(name_container);
        divitem.appendChild(p_container);
        divitem.appendChild(mrt_text);
        divitem.appendChild(category_text);
        pic.appendChild(divitem);
      }
    });
}

function loadmore() {
  if (Page !== 0 && Page !== "null") {
    src = "/api/attractions?page=" + Page;
    fetch(src)
      .then(function (response) {
        return response.json();
      })
      .then(function (result) {
        let img_list = [];
        let name_list = [];
        let mrt_list = [];
        let category_list = [];
        let datas = result.data;
        let nextpage = result.nextPage;
        Page = nextpage;
        for (let i in datas) {
          name_list.push(datas[i].name);
          img_list.push(datas[i].images[0]);
          mrt_list.push(datas[i].mrt);
          category_list.push(datas[i].category);
        }
        for (let i = 0; i < datas.length; i++) {
          let pic = document.getElementsByClassName("warp")[0];
          let divitem = document.createElement("item");
          let name_container = document.createElement("div");
          let divtext = document.createElement("div");
          let p_container = document.createElement("div");
          let mrt_text = document.createElement("div");
          name_container.className = "name_container";
          mrt_text.className = "mrt_text";
          let category_text = document.createElement("div");
          category_text.className = "category_text";
          let textNode = document.createTextNode(name_list[i]);
          divitem.className = "item";
          divtext.className = "pictext";
          p_container.className = "p_container";
          let imgNode = document.createElement("img");
          imgNode.className = "cover";
          let mrtNode = document.createTextNode(mrt_list[i]);
          let categoryNode = document.createTextNode(category_list[i]);
          imgNode.src = img_list[i];
          divtext.appendChild(textNode);
          mrt_text.appendChild(mrtNode);
          name_container.appendChild(divtext);
          category_text.appendChild(categoryNode);
          p_container.appendChild(imgNode);
          p_container.appendChild(name_container);
          divitem.appendChild(p_container);
          divitem.appendChild(mrt_text);
          divitem.appendChild(category_text);
          pic.appendChild(divitem);
        }
      });
  } else if (Page !== 0 && Page == "null") {
    observer.unobserve(loadingObserver);
  } else {
    return;
  }
}

const loadingObserver = document.getElementsByClassName("foot")[0];
const options = {
  threshold: 1,
};
const callback = ([entry]) => {
  if (Page !== 0 && entry.isIntersecting) {
    loadmore();
  } else if (searchkeyword.value !== "" && Page == 0 && entry.isIntersecting) {
    searchdata2();
  }
};
let observer = new IntersectionObserver(callback, options);
observer.observe(loadingObserver);

createdata();

const searchkeyword = document.getElementById("searchkeyword");
const searchBtn = document.getElementById("searchBtn");

function searchdata2() {
  let ky = searchkeyword.value;
  if (Page !== "null") {
    observer.unobserve(loadingObserver);
    let src = "/api/attractions?page=1" + "&keyword=" + ky;
    fetch(src)
      .then(function (response) {
        return response.json();
      })
      .then(function (result) {
        let img_list = [];
        let name_list = [];
        let mrt_list = [];
        let category_list = [];
        console.log(result.data);
        let datas = result.data;
        // let nextpage = result.nextPage;
        // Page = nextpage;
        for (let i in datas) {
          name_list.push(datas[i].name);
          img_list.push(datas[i].images[0]);
          mrt_list.push(datas[i].mrt);
          category_list.push(datas[i].category);
        }
        for (let i = 0; i < datas.length; i++) {
          let pic = document.getElementsByClassName("warp")[0];
          let divitem = document.createElement("item");
          let name_container = document.createElement("div");
          let divtext = document.createElement("div");
          let p_container = document.createElement("div");
          let mrt_text = document.createElement("div");
          name_container.className = "name_container";
          mrt_text.className = "mrt_text";
          let category_text = document.createElement("div");
          category_text.className = "category_text";
          let textNode = document.createTextNode(name_list[i]);
          divitem.className = "item";
          divtext.className = "pictext";
          p_container.className = "p_container";
          let imgNode = document.createElement("img");
          imgNode.className = "cover";
          let mrtNode = document.createTextNode(mrt_list[i]);
          let categoryNode = document.createTextNode(category_list[i]);
          imgNode.src = img_list[i];
          divtext.appendChild(textNode);
          mrt_text.appendChild(mrtNode);
          name_container.appendChild(divtext);
          category_text.appendChild(categoryNode);
          p_container.appendChild(imgNode);
          p_container.appendChild(name_container);
          divitem.appendChild(p_container);
          divitem.appendChild(mrt_text);
          divitem.appendChild(category_text);
          pic.appendChild(divitem);
        }
      });
  } else {
    return;
  }
}

function searchdata() {
  let ky = searchkeyword.value;
  let img_list = [];
  let name_list = [];
  let mrt_list = [];
  let category_list = [];
  let Page = 0;
  let src = "/api/attractions?page=" + Page + "&keyword=" + ky;
  fetch(src)
    .then(function (response) {
      return response.json();
    })
    .then(function (result) {
      if (searchkeyword.value !== "" && result.data.length !== 0) {
        console.log(result.data.length);
        let datas = result.data;
        // let nextpage = result.nextPage;
        Page = 0;
        let oldpic = document.getElementsByClassName("warp")[0];
        while (oldpic.firstChild) {
          oldpic.removeChild(oldpic.firstChild);
        }
        for (let i in datas) {
          name_list.push(datas[i].name);
          img_list.push(datas[i].images[0]);
          mrt_list.push(datas[i].mrt);
          category_list.push(datas[i].category);
        }
        for (let i = 0; i < datas.length; i++) {
          let pic = document.getElementsByClassName("warp")[0];
          let divitem = document.createElement("item");
          let name_container = document.createElement("div");
          let divtext = document.createElement("div");
          let p_container = document.createElement("div");
          let mrt_text = document.createElement("div");
          name_container.className = "name_container";
          mrt_text.className = "mrt_text";
          let category_text = document.createElement("div");
          category_text.className = "category_text";
          let textNode = document.createTextNode(name_list[i]);
          divitem.className = "item";
          divtext.className = "pictext";
          p_container.className = "p_container";
          let imgNode = document.createElement("img");
          imgNode.className = "cover";
          let mrtNode = document.createTextNode(mrt_list[i]);
          let categoryNode = document.createTextNode(category_list[i]);
          imgNode.src = img_list[i];
          divtext.appendChild(textNode);
          mrt_text.appendChild(mrtNode);
          name_container.appendChild(divtext);
          category_text.appendChild(categoryNode);
          p_container.appendChild(imgNode);
          p_container.appendChild(name_container);
          divitem.appendChild(p_container);
          divitem.appendChild(mrt_text);
          divitem.appendChild(category_text);
          pic.appendChild(divitem);
        }
        observer.observe(loadingObserver);
        console.log(Page);
      } else {
        let oldpic = document.getElementsByClassName("warp")[0];
        while (oldpic.firstChild) {
          oldpic.removeChild(oldpic.firstChild);
        }
        let error = document.getElementsByClassName("error")[0];
        let noresult = document.createTextNode("查無此資料");
        error.appendChild(noresult);
      }
    });
}

searchBtn.addEventListener("click", function () {
  observer.unobserve(loadingObserver);
  searchdata();
  Page = 0;
});
