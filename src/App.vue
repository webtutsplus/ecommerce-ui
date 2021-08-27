<template>
  <div id="app">
    <div id="nav">
      <!-- <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> -->
    </div>
    <!-- <router-view v-if="categories"
    :baseURL="baseURL" 
    :categories="categories"
    @fetchData = "fetchData"
    @refreshNav = "refreshNav"
     /> -->
     <router-view/>
  </div>
</template>

<script>
export default {
  data() {
    return {
      baseURL : "https://limitless-lake-55070.herokuapp.com/",
      categories : null,
      key : 0
    }
  },
  methods : {
    // async fetchData() {
    //   const axios = require('axios')
    //   //fetch categories
    //   await axios.get(this.baseURL + "category/")
    //   .then(res => this.categories = res.data)
    //   .catch(err => console.log(err))
    // },
    // refreshNav() {
    //   this.key += 1;
    // }
  },
  mounted() {
    // this.fetchData();
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
