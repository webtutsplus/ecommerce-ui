<template>
    <div class="container">
        <div class="row">
            <div class="col-12 text-center">
                <h4 class="pt-3">Order Id: {{orderID}}</h4>
            </div>
        </div>

        <!-- TODO       Loop through orderItems and display each item-->

        <!--        Display the total price-->
    </div>
</template>

<script>

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
