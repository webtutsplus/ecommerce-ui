<template>
  <div style="display: flex; align-items: center; justify-content: center">
      <div class="div_class">
          <h3>You will be redirected to payment page</h3>

          <div class="alert alert-primary" role="alert">
              While making payment use card number 4242 4242 4242 4242 and enter random cvv(3 digit)
          </div>

          <button class="btn checkout_button" id="proceed-to-checkout" @click="goToCheckout()">
              Make payment
          </button>
      </div>
  </div>
</template>
<script>
const axios = require('axios')
export default {
    data(){
        return {
            stripeAPIToken: '<Stripe public key>',
            stripe: '',
            token:null,
            sessionId:null,
            checkoutBodyArray:[]
            }
    },

    name:'Checkout',
    props:["baseURL"],
    methods: {
        /*
            Includes Stripe.js dynamically
        */
        includeStripe( URL, callback ){
            let documentTag = document, tag = 'script',
                object = documentTag.createElement(tag),
                scriptTag = documentTag.getElementsByTagName(tag)[0];
            object.src = '//' + URL;
            if (callback) { object.addEventListener('load', function (e) { callback(null, e); }, false); }
            scriptTag.parentNode.insertBefore(object, scriptTag);
        },

        /*
            Configures Stripe by setting up the elements and
            creating the card element.
        */
        configureStripe(){
            /* global Stripe */
            this.stripe = Stripe( this.stripeAPIToken );
        },

        // get all cart Items for the user
        getAllCartItems(){
            axios.get(`${this.baseURL}cart/?token=${this.token}`).then((response) => {
                if(response.status==200){
                    let cartItems = response.data.cartItems
                    // for each cart item populate the checkoutBodyArray Array
                    cartItems.forEach((item) => {
                        this.checkoutBodyArray.push({
                            productName: item.product.name,
                            quantity: item.quantity,
                            price: item.product.price,
                            productId: item.product.id
                        })
                    })
                }
            },err=>{
                console.log(err)
            })
        },

        // checkout
        goToCheckout(){
            // first call the create-checkout-session with checkoutBodyArray
            axios.post(`${this.baseURL}order/create-checkout-session`,
               this.checkoutBodyArray
            ).then((response)=>{
                // receive the sessionId in response
              localStorage.setItem("sessionId",response.data.sessionId)
              return response.data
            }).then((session)=>{
                // redirect to checkout page of stripe
               return this.stripe.redirectToCheckout({ sessionId: session.sessionId })
            })
        }

    },
    mounted(){
        // get the token
        this.token = localStorage.getItem("token");

        // configure include stripe
        this.includeStripe('js.stripe.com/v3/', function(){
            this.configureStripe();
        }.bind(this) );

        // get all the cart items
        this.getAllCartItems()
    },
}

</script>

 <style >

.div_class{
    margin-top: 5%;
    width: 50%;
    align-content: center;
}

.checkout_button{
    background-color: #5d3dec;
    border: none;
    color: white;
    padding: 15px 30px;
    text-align: center;
    text-decoration: none;
    font-size: 15px;
    font-weight: bold;
    border-radius: 15px;
}

.checkout_button:focus{
    outline: none;
    box-shadow: none;
}

.checkout_button:disabled{
    background-color: #9b86f7;
    border: none;
    color: white;
    padding: 15px 30px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 15px;
    font-weight: bold;
    border-radius: 15px;
    cursor:not-allowed;
}

</style>
