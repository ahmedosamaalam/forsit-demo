<!-- ProductForm.vue -->
<template>
    <div class="modal-content">
        <form @submit.prevent="addOrUpdateProduct">
            <div class="modal-header">
                <h5 class="modal-title">{{ isEditing ? 'Update Product' : 'Add Product' }}</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div class="mb-3">
                    <label for="productName" class="form-label">Product Name</label>
                    <input v-model="productName" type="text" class="form-control" id="productName" required>
                </div>
                <div class="mb-3">
                    <label for="description" class="form-label">Description</label>
                    <textarea v-model="description" class="form-control" id="description" required></textarea>
                </div>
                <div class="mb-3">
                    <label for="price" class="form-label">Price</label>
                    <input v-model="price" min="1" type="number" class="form-control" id="price" required>
                </div>
                <div v-if="!isEditing" class="mb-3">
                    <label for="initialStock" class="form-label">Initial Stock</label>
                    <input v-model="initialStock" min="1" type="number" class="form-control" id="initialStock" required>
                </div>
                <div v-else class="mb-3">
                    <label for="currentStock" class="form-label">Current Stock</label>
                    <input v-model="currentStock" min="1" type="number" class="form-control" id="currentStock" required>
                </div>
            </div>
            <div class="modal-footer">
                <button ref="closeButton" type="button" class="btn btn-secondary" @click="resetForm()"
                    data-bs-dismiss="modal">Close</button>
                <button type="submit" class="btn btn-success">{{ isEditing ? 'Update Product' : 'Add Product' }}</button>

            </div>
        </form>
    </div>
</template>
  
<script>

export default {
    data() {
        return {
            id: null,
            productName: "",
            description: "",
            price: 0,
            initialStock: 0,
            currentStock: 0,
        };
    },
    computed: {
        isEditing() {
            return !!this.id;
        },
    },
    methods: {
        addOrUpdateProduct() {
            const product = {

                productName: this.productName,
                description: this.description,
                price: this.price,
            };

            if (this.isEditing) {
                // If the product is being edited, update the existing product
                product.id = this.id
                product.currentStock = this.currentStock;
                this.$store.commit("updateProduct", product);
            } else {
                // If not, add a new product
                product.id = this.$store.state.products.length + 1
                product.initialStock = this.initialStock;
                product.currentStock = this.initialStock;
                this.$store.commit("addProduct", product);
            }

            // Reset form fields and close modal
            this.resetForm();
            this.closeModal();

        },
        openEditModal(product) {
            // Set form fields with the values of the product being edited
            this.id = product.id;
            this.productName = product.productName;
            this.description = product.description;
            this.price = product.price && Number(product.price);
            this.currentStock = product.currentStock && Number(product.currentStock);
        },
        closeModal() {
            this.resetForm()
            this.$refs.closeButton.click();
        },
        resetForm() {
            this.id = null;
            this.productName = "";
            this.description = "";
            this.price = 0;
            this.initialStock = 0;
            this.currentStock = 0;
        },
    },
};
</script>
  