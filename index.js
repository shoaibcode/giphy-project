import axios from "axios";
import debounce from "debounce";

/*
const API_KEY = "7WwNo3DzW1zeXaxq7a7g06fx96HFEgr7";
const COUNT = 10;
let OFFSET = 0;

let searchText = "javascript";
*/

const giphy = {
  API_KEY: "7WwNo3DzW1zeXaxq7a7g06fx96HFEgr7",
  COUNT: 10,
  OFFSET: 0,
  searchText: "javascript",
  init() {
    this.cacheDOM();
    this.bindEvents();

    this.getData();
    this.debouncedGetData = debounce(this.getData, 400);
  },
  cacheDOM() {
    // DOM Element
    this.root = document.querySelector("#root");

    // Form
    this.searchForm = document.querySelector("#searchForm");
    this.searchTextInputTag = document.querySelector("#searchText");

    // Pagination
    this.btnContainer = document.querySelector(".btn-container");
    this.previousBtn = this.btnContainer.querySelector(".previous");
    this.nextBtn = this.btnContainer.querySelector(".next");
  },
  bindEvents() {
    // Set Event
    this.searchForm.addEventListener("submit", (event) => {
      event.preventDefault();
    });

    this.searchTextInputTag.addEventListener("keyup", (event) => {
      this.searchText = event.target.value;
      this.debouncedGetData();
    });

    this.previousBtn.addEventListener("click", () => {
      if (this.OFFSET > 0) {
        this.OFFSET -= this.COUNT;
        this.getData();
      }
    });

    this.nextBtn.addEventListener("click", () => {
      this.OFFSET += this.COUNT;
      this.getData();
    });
  },
  getData() {
    this.root.innerHTML = '<div class="loader">Loading...</div>';
    const URL = `https://api.giphy.com/v1/gifs/search?api_key=${this.API_KEY}&q=${this.searchText}&limit=${this.COUNT}&offset=${this.OFFSET}&rating=G&lang=en`;
    axios
      .get(URL)
      .then((reponse) => {
        this.root.innerHTML = "";
        reponse.data.data.forEach((dataItem) => {
          const div = document.createElement("div");
          div.classList.add("item");
          // data[0].images.original.url
          div.style.background = `url(${dataItem.images.original.url}) no-repeat`;

          this.root.appendChild(div);
        });
      })
      .catch((error) => {
        console.log(error);
      });
  },
};

giphy.init();

// getData();

// searchTextInputTag.value = searchText;

// const debouncedGetData = debounce(getData, 400);
