<template>
    <div class="container">
        <div class="row">
            <div class="col-12 text-center">
                <h4 class="pt-3" style="margin-bottom: 20px">
                    Edit Product</h4>
            </div>
        </div>

        <div class="row">
            <div class="col-3"></div>
            <div class="col-6">
                <form>
                    {{ product }}
<!--                    <div class="form-group">-->
<!--                        <label>Category</label>-->
<!--                        <select class="form-control" v-model="product.categoryId" required>-->
<!--                            <option v-for="category of categories" :key="category.id"-->
<!--                                    :value="category.id">{{ category.categoryName}}</option>-->
<!--                        </select>-->
<!--                    </div>-->
                    <div class="form-group">
                        <label>Product Name</label>
                        <input type="text" class="form-control" v-model="product.name" required>
                    </div>
                    <div class="form-group">
                        <label>Product description</label>
                        <input type="text" class="form-control" v-model="product.description" required>
                    </div>
                    <div class="form-group">
                        <label>Product imageUrl</label>
                        <input type="text" class="form-control" v-model="product.imageURL" required>
                    </div>
                    <button type="button" class="btn btn-primary" @click="editProduct">Submit</button>
                </form>
            </div>
                <div class="col-3"></div>
            </div>

        </div>
</template>
<script>
    export default {
        data() {
            return {
                id: null,
                categoryId: null,
                product: {
                    name: "",
                    imageURL: "",
                    description: "",
                    categoryId: "",
                    price: 0
                }
            }
        },
        props: ["baseURL", "products", "categories"],
        mounted() {
            this.id = this.$route.params.id;
            console.log('id', this.id);
            this.productIndex = this.products
                .findIndex(product => product.id == this.id);
            this.product = this.products[this.productIndex];
            console.log('productIndex', this.productIndex);
            console.log('product', this.product);
        }
    }
</script>
