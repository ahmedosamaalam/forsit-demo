<template>
  <div class="card mb-4">
    <div class="card-header pb-0">
      <h6>Products</h6>
    </div>
    <div class="card-body px-0 pt-0 pb-2">
      <soft-input class="px-3" placeholder="Search products" @input="updateSearch" />
      <div class="table-responsive p-0">
        <table class="table align-items-center mb-0">
          <thead>
            <tr>
              <th @click="sortBy('productName')"
                class="cursor-pointer text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                Product Name
              </th>

              <th @click="sortBy('price')"
                class=" cursor-pointer text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                Price
              </th>
              <th @click="sortBy('currentStock')"
                class="cursor-pointer text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                Current Stock
              </th>
              <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Actions</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="(product, index) in filteredProducts" :key="index">
              <td>
                <!-- Display product information -->
                <div class="d-flex px-2 py-1">
                  <div>
                    <soft-avatar :img="img1" size="sm" border-radius="lg" class="me-3" alt="user1" />
                  </div>
                  <div class="d-flex flex-column justify-content-center">
                    <h6 class="mb-0 text-sm">{{ product.productName }}</h6>
                    <p class="text-xs text-secondary mb-0">{{ product.description }}</p>
                  </div>
                </div>
              </td>
              <td>
                <!-- Display other product details -->
                <p class="text-xs text-center font-weight-bold mb-0">${{ product.price }}</p>
              </td>
              <td>
                <!-- Display stock information with badge -->
                <div class="text-center">
                  <p class="text-xs font-weight-bold mb-0">{{ product.currentStock }}</p>
                  <soft-badge v-if="product.currentStock < 5" color="danger" variant="gradient" size="sm">Low
                    Stock</soft-badge>
                  <soft-badge v-else color="success" variant="gradient" size="sm">In
                    Stock</soft-badge>
                </div>
              </td>
              <td class="text-center">
                <a @click="editProduct(product)" href="javascript:;"
                  class="text-secondary text-center font-weight-bold text-xs" data-toggle="tooltip"
                  data-original-title="Edit user">Edit</a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import SoftAvatar from "@/components/SoftAvatar.vue";
import SoftBadge from "@/components/SoftBadge.vue";
import SoftInput from "@/components/SoftInput.vue";
import { mapState, mapGetters, mapMutations } from 'vuex';
import img1 from "../../assets/img/team-2.jpg";
import img2 from "../../assets/img/team-3.jpg";
import img3 from "../../assets/img/team-4.jpg";
import img4 from "../../assets/img/team-3.jpg";
import img5 from "../../assets/img/team-2.jpg";
import img6 from "../../assets/img/team-4.jpg";

export default {
  name: "products-table",
  data() {
    return {
      img1,
      img2,
      img3,
      img4,
      img5,
      img6,
    };
  },
  components: {
    SoftAvatar,
    SoftBadge,
    SoftInput
  },
  computed: {
    ...mapState(["sortColumn", "sortDirection"]),
    ...mapGetters(["filteredProducts",]),
  },
  methods: {
    ...mapMutations(["updateProductSearchQuery", "updateProductSort"]),
    updateSearch(val) {

      this.updateProductSearchQuery(val.target.value);
    },
    sortBy(column) {
      const direction = this.sortColumn === column && this.sortDirection === "asc" ? "desc" : "asc";
      this.updateProductSort({ column, direction });
    },
    editProduct(product) {
      this.$emit("edit-product", product);
    },
  },
};
</script>
