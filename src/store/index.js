import { createStore } from "vuex";
import bootstrap from "bootstrap/dist/js/bootstrap.min.js";
import dummyData from "@/dummy-data";

const {products,orders} = dummyData
export default createStore({
  state: {
    products,
    orders,
    searchProductQuery: "",
    sortColumn: null,
    sortDirection: "asc", // or "desc"
    hideConfigButton: false,
    isPinned: true,
    showConfig: false,
    isTransparent: "",
    isRTL: false,
    color: "",
    isNavFixed: false,
    isAbsolute: false,
    showNavs: true,
    showSidenav: true,
    showNavbar: true,
    showFooter: true,
    showMain: true,
    navbarFixed:
      "position-sticky blur shadow-blur left-auto top-1 z-index-sticky px-0 mx-4",
    absolute: "position-absolute px-4 mx-0 w-100 z-index-2",
    bootstrap,
  },
  mutations: {
    addProduct(state, product) {
      state.products.push(product);
    },
    updateProduct(state, updatedProduct) {
      // Find the index of the product with the matching id
      const index = state.products.findIndex(product => product.id === updatedProduct.id);
  
      // If the product is found, update its properties
      if (index !== -1) {
        // Use the spread operator to ensure reactivity when updating an array item by index
        state.products[index] = { ...state.products[index], ...updatedProduct };
      }
    },
    updateProductSearchQuery(state, query) {
      state.searchProductQuery = query;
    },
    updateProductSort(state, { column, direction }) {
      state.sortColumn = column;
      state.sortDirection = direction;
    },
    toggleConfigurator(state) {
      state.showConfig = !state.showConfig;
    },
    navbarMinimize(state) {
      const sidenav_show = document.querySelector(".g-sidenav-show");
      if (sidenav_show.classList.contains("g-sidenav-hidden")) {
        sidenav_show.classList.remove("g-sidenav-hidden");
        sidenav_show.classList.add("g-sidenav-pinned");
        state.isPinned = true;
      } else {
        sidenav_show.classList.add("g-sidenav-hidden");
        sidenav_show.classList.remove("g-sidenav-pinned");
        state.isPinned = false;
      }
    },
    sidebarType(state, payload) {
      state.isTransparent = payload;
    },
    cardBackground(state, payload) {
      state.color = payload;
    },
    navbarFixed(state) {
      if (state.isNavFixed === false) {
        state.isNavFixed = true;
      } else {
        state.isNavFixed = false;
      }
    },
    toggleEveryDisplay(state) {
      state.showNavbar = !state.showNavbar;
      state.showSidenav = !state.showSidenav;
      state.showFooter = !state.showFooter;
    },
    toggleHideConfig(state) {
      state.hideConfigButton = !state.hideConfigButton;
    },
  },
  actions: {
    toggleSidebarColor({ commit }, payload) {
      commit("sidebarType", payload);
    },
    setCardBackground({ commit }, payload) {
      commit("cardBackground", payload);
    },
  },
  getters: {
    filteredProducts: (state) => {
      const query = state.searchProductQuery?.toLowerCase();
      let filteredAndSortedProducts = state.products.filter(
        (product) =>
          product.productName.toLowerCase().includes(query)
      );

      
      if (state.sortColumn) {
        filteredAndSortedProducts.sort((a, b) => {
          const parseMixedValue = (value) => {
            if (!isNaN(value)) {
              return parseFloat(value);
            } else {
              return value;
            }
          };
          
          const aValue = parseMixedValue(a[state.sortColumn]);
          const bValue = parseMixedValue(b[state.sortColumn]);
      
          if (typeof aValue === 'string' && typeof bValue === 'string') {
            if (state.sortDirection === "asc") {
              return aValue.localeCompare(bValue);
            } else {
              return bValue.localeCompare(aValue);
            }
          } else {
            // If either value is not a string, perform numeric comparison
            if (state.sortDirection === "asc") {
              return aValue - bValue;
            } else {
              return bValue - aValue;
            }
          }
        });
      }

      return filteredAndSortedProducts;
    },
  
  },
});
