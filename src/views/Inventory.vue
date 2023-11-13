<template>
  <div class="container-fluid mt-4">
    <div class="row">
      <div class="col-xl-4 col-sm-4 mb-xl-0 p-0">
        <mini-statistics-card title="Total Products" :value="totalProducts" :percentage="{
          value: '+505%',
          color: 'text-success',
        }" :icon="{
  component: 'ni ni-basket',
  background: iconBackground,
}" direction-reverse />
      </div>
      <div class="col-xl-4 col-sm-4 mb-xl-0 ">
        <mini-statistics-card title="Low Stocks" :value="lowStockProducts" :percentage="{
          value: '+505%',
          color: 'text-success',
        }" :icon="{
  component: 'ni ni-money-coins',
  background: iconBackground,
}" direction-reverse />
      </div>

      <div class="col-xl-4 col-sm-4 mb-xl-0  ">
        <div class="d-flex justify-content-end mt-4 ">
          <button class="btn btn-success" ref="addProduct" data-bs-toggle="modal" data-bs-target="#addProduct"
            color="success" size="sm">Add
            Product</button>
        </div>
      </div>
    </div>
    <div class="row">
      <products-table @edit-product="handleEditProduct"></products-table>
    </div>

    <!-- Modal -->
    <div class="modal fade" id="addProduct" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
      aria-labelledby="addProductLabel" aria-hidden="true">
      <div class="modal-dialog">
        <product-form ref="productFormRef"></product-form>
      </div>
    </div>

  </div>
</template>

<script>
import ProductsTable from "@/views/components/ProductsTable.vue";
import ProductForm from "@/views/components/ProductForm.vue";
import MiniStatisticsCard from "@/examples/Cards/MiniStatisticsCard.vue";

export default {
  name: "Inventory",
  data() {
    return {
      iconBackground: "bg-gradient-success",
    }
  },
  components: {
    ProductsTable,
    ProductForm,
    MiniStatisticsCard
  },
  computed: {
    totalProducts() {
      return this.$store.state.products.length || "";
    },

    lowStockProducts() {
      const threshold = 5;
      return this.$store.state.products.filter(
        (product) => product.currentStock < threshold
      ).length || "";
    },
  },
  methods: {
    handleEditProduct(product) {
      this.$refs.productFormRef.openEditModal({ ...product });
      this.$refs.addProduct.click();
    },
  },
};
</script>
