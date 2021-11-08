<template>
    <div class="container">
        <div class="row">
            <div class="col-12 text-center">
                <h4 class="pt-3" style="margin-bottom: 20px"> Edit Category</h4>
            </div>
        </div>

        <div class="row">
            <div class="col-3"></div>
            <div class="col-6">
                <form>
                    <div class="form-group">
                        <label>Category Name</label>
                        <input type="text" class="form-control" v-model="categoryName" required>
                    </div>
                    <div class="form-group">
                        <label>Category description</label>
                        <input type="text" class="form-control" v-model="description" required>
                    </div>
                    <div class="form-group">
                        <label>Category imageUrl</label>
                        <input type="text" class="form-control" v-model="imageUrl" required>
                    </div>
                    <button type="button" class="btn btn-primary" @click="editCategory">Submit</button>
                </form>
            </div>
            <div class="col-3"></div>
        </div>
    </div>
</template>
<script>
    import axios from 'axios'
    import swal from 'sweetalert'
export default {
    data() {
        return {
            id: null,
            categoryIndex: null,
            categoryName: "",
            description: "",
            imageUrl: "",
        }
    },
    props: ["baseURL", "categories"],
    methods: {
        async editCategory() {
            const editedCategory = {
                id: this.id,
                categoryName: this.categoryName,
                description: this.description,
                imageUrl: this.imageUrl
            }
            await axios.post(this.baseURL+"category/update/"+this.id, editedCategory)
            .then((res) => {
                console.log('res', res);
                this.$emit("fetchData");
                this.$router.push({name: 'Category'});
                swal({
                    text: "Category updated Successfully",
                    icon: "success"
                })
            }).catch(err => console.log('err', err))
        }
    },
    mounted() {
        this.id = this.$route.params.id;
        this.categoryIndex = this.categories
            .findIndex(category => category.id == this.id)
        const category = this.categories[this.categoryIndex];
        console.log("category", category);
        this.categoryName = category.categoryName;
        this.description = category.description;
        this.imageUrl = category.imageUrl;
    }

}
</script>
