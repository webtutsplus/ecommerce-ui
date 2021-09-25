<template>
    <div class="container">
        <div class="row pt-5">
            <!--            Leave some empty space in left-->
            <div class="col-md-1">
            </div>
            <!--                Display the image in left side-->
            <div class="col-md-4 col-12">
                <img :src="product.imageURL" :alt="product.name" class="img-fluid">
            </div>
            <!-- Display product name category name and product description-->
            <div class="col-md-6 col-12 pt-3 pt-md-0">
                <h4>{{product.name}}</h4>

                <h6 class="category font-italic">{{category.categoryName}}</h6>

                <p><span class="font-weight-bold">Description: -</span> <br>{{product.description}}</p>

                <div class="d-flex flex-row justify-content-between">
                    <div class="input-group col-md-3 col-4 p-0">
                        <div class="input-group-prepend">
                            <span class="input-group-text" id="basic-addon1">Quantity</span>
                        </div>
                        <input class="form-control" type="number" v-model="quantity"/>
                    </div>
                    <!-- wishlist button -->
                    <button id="wishlist-button" class="btn mr-3 p-1 py-0" style="background-color: #b3a594"
                            @click="addToWishList(this.id)">
                        Add to wishlist
                    </button>

                    <!-- Add to cart button-->
                    <button type="button" id="add-to-cart-button" class="btn" @click="addToCart(this.id)">
                        Add to Cart
                        <ion-icon name="cart-outline" v-pre></ion-icon>
                    </button>
                </div>

                <!-- Dummy placeholder features -->
                <div class="features pt-3">
                    <h5><strong>Features</strong></h5>
                    <ul>
                        <li>Lorem ipsum dolor sit amet consectetur adipisicing elit.</li>
                        <li>Officia quas, officiis eius magni error magnam voluptatem</li>
                        <li>nesciunt quod! Earum voluptatibus quaerat dolorem doloribus</li>
                        <li>molestias ipsum ab, ipsa consectetur laboriosam soluta et</li>
                        <li>ut doloremque dolore corrupti, architecto iusto beatae.</li>
                    </ul>
                </div>
            </div>
        </div>

    </div>

</template>

<script>
const axios = require('axios')
import swal from 'sweetalert';
export default {
    data(){
        return {
            product : {},
            category : {},
            id : null,
            quantity: 1
        }
    },
    props : ["baseURL","products", "categories"],
    methods:{
        // add to wishlist
        addToWishList(productId){
            axios.post(`${this.baseURL}wishlist/add?token=${this.token}`, {
                id:productId
            }).then((response) => {
                if(response.status==201) {
                    swal({
                        text: "Added to WishList. Please continue",
                        icon: "success"
                    });
                }
            },(error) =>{
                console.log(error)
                swal({
                    text: "Something wrong with add to wishlist",
                    icon: "error",
                    closeOnClickOutside: false,
                });

            });
        },

        // add to cart function
        addToCart(productId){
            // post productId and quantity
            axios.post(`${this.baseURL}cart/add?token=${this.token}`,{
                productId : productId,
                quantity : this.quantity
            }).then((response) => {
                // success
                if(response.status==201){
                    swal({
                        text: "Product Added to the cart!",
                        icon: "success",
                        closeOnClickOutside: false,
                    });
                }
            },(error) =>{
                // error handling
                console.log(error)
                swal({
                    text: "Something wrong with add to cart",
                    icon: "error",
                    closeOnClickOutside: false,
                });
            });
        },
    },
    mounted() {
        this.id = this.$route.params.id;
        this.product = this.products.find(product => product.id == this.id);
        this.category = this.categories.find(category => category.id == this.product.categoryId);
        this.token = localStorage.getItem('token');
    }
}
</script>

<style>
.category {
    font-weight: 400;
}

/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

#add-to-cart-button {
    background-color: #febd69;
}


</style>
