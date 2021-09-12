<template>
    <div class="container">
        <div class="row">
            <div class="col-12 text-center">
                <h4 class="pt-3">Our Categories</h4>
                <router-link id="add-category" :to="{name : 'AddCategory'}" v-show="$route.name=='AdminCategory'">
                    <button class="btn">Add a new Category</button>
                </router-link>
            </div>
        </div>
        <div class="row">
            <div v-for="category of categories" :key="category.id" class="col-md-6 col-xl-4 col-12 pt-3  justify-content-around d-flex">
                <CategoryBox :category="category">
                </CategoryBox>
            </div>
        </div>
    </div>
</template>

<script>
    import CategoryBox from '../../components/Category/CategoryBox';
    var axios =  require('axios');
    export default {
        name: 'Category',
        components : {CategoryBox},
        data() {
            return {
                baseURL : "https://limitless-lake-55070.herokuapp.com/",
                categories : null,
            }
        },
        methods: {
            async getCategories() {
                //fetch categories
                await axios.get(this.baseURL + "category/")
                    .then(res => this.categories = res.data)
                    .catch(err => console.log(err))
            }
        },
        mounted(){
            this.getCategories();
        }
    }
</script>

<style scoped>
    h4 {
        font-family: 'Roboto', sans-serif;
        color: #484848;
        font-weight: 700;
    }

    #add-category {
        float: right;
        font-weight: 500;
    }
</style>
