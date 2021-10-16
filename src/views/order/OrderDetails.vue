<template>
    <div class="container">
        <div class="row">
            <div class="col-12 text-center">
                <h4 class="pt-3">Order Id: {{orderID}}</h4>
            </div>
        </div>

        <!-- TODO       Loop through orderItems and display each item-->
        <div v-for="(orderItem, index) in orderItems" :key="index" class="row mt-2 pt-3 justify-content-around">
            <!--            leave some padding in left-->
            <div class="col-1"></div>
            <!--            Display image-->
            <div class="col-md-3 embed-responsive embed-responsive-16by9">
                <img :src="orderItem.product.imageURL" class="w-100 card-img-top embed-responsive-item">
                <hr/>
            </div>
            <!--            Display order item informations-->
            <div class="col-md-5 px-3">
                <div class="card-block px-3">
                    <h6 class="card-title" >{{orderItem.product.name}}</h6>
                    <p id="item-price" class="mb-0 font-weight-bold">${{orderItem.product.price}} per unit</p>
                    <p id="item-quantity" class="mb-0">Quantity : {{orderItem.quantity}}</p>
                    <p id="item-total-price" class="mb-0">
                        Total Price : $<span class="font-weight-bold">{{ orderItem.price * orderItem.quantity}}</span>
                    </p>
                </div>
            </div>
            <div class="col-1"></div>
        </div>

        <!--        Display the total price-->
        <div class="total-cost pt-2 text-right">
            <h5>Total Cost : $ {{order.totalPrice}}</h5>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name:'OrderItems',
    props:["baseURL"],

    data() {
        return {
            orderItems:[],
            order: {},
            token: null,
            orderID: 0
        }
    },

    methods:{
        getOrder(){
            // TODO 1. fetch api `/order/${orderID}?token=$token}`
            // save response into order and order items
            axios.get(`${this.baseURL}order/${this.orderID}?token=${this.token}`).then((response) => {
                    if(response.status === 200) {
                        this.order = response.data
                        this.orderItems = this.order.orderItems
                    }
                },
                (err)=>{
                    console.log(err)
                })
        }
    },
    mounted(){
        // get the id in param
        this.orderID = this.$route.params.id;
        // get the token
        this.token = localStorage.getItem("token")
        this.getOrder()
    }
}

</script>

<style scoped>

h4 {
    font-family: 'Roboto', sans-serif;
    color: #484848;
    font-weight: 700;
}

.embed-responsive .card-img-top {
    object-fit: cover;
}

</style>
