<template>
  <div class="container">
    <div class="row">
      <div class="col-12 text-center pt-3">
        <!-- display logo -->
      </div>
    </div>

    <!-- header -->

    <div class="row">
      <div class="col-12 justify-content-center d-flex pt-3">
        <div id="signup" class="flex-item border">
          <h2 class="pt-4 pl-4">Create Account</h2>
          <form @submit="signup" class="pt-4 pl-4 pr-4">
            <div class="form-group">
              <label for="Email">Email</label>
              <input
                type="email"
                v-model="email"
                class="form-control"
                required
              />
            </div>
            <div class="form-row">
              <div class="col">
                <div class="form-group">
                  <label> First Name</label>
                  <input
                    type="text"
                    v-model="firstName"
                    class="form-control"
                    required
                  />
                </div>
              </div>
              <div class="col">
                <div class="form-group">
                  <label> Last Name</label>
                  <input
                    type="text"
                    v-model="lastName"
                    class="form-control"
                    required
                  />
                </div>
              </div>
            </div>

            <!-- password -->
            <div class="form-group">
              <label for="Password"> Password</label>
              <input
                type="password"
                v-model="password"
                class="form-control"
                required
              />
            </div>

            <!-- confirm password -->
            <div class="form-group">
              <label for="Password"> Confirm password</label>
              <input
                type="password"
                v-model="confirmPassword"
                class="form-control"
                required
              />
            </div>

            <button class="btn btn-primary mt-2">Create Account</button>
          </form>
        </div>
      </div>
    </div>

    <!-- form -->
  </div>
</template>
<script>
import axios from "axios";
import swal from "sweetalert";
export default {
  props: ["baseURL"],
  data() {
    return {
      email: null,
      firstName: null,
      lastName: null,
      password: null,
      confirmPassword: null,
    };
  },
  methods: {
    async signup(e) {
      e.preventDefault();
      if (this.password === this.confirmPassword) {
        // call signup api
        const user = {
          email: this.email,
          firstName: this.firstName,
          lastName: this.lastName,
          password: this.password,
        };
        console.log("user", user);
        await axios
          .post(`${this.baseURL}user/signup`, user)
          .then(() => {
            this.$router.replace("/");
            swal({
              text: "User signup successful, please login",
              icon: "success",
            });
          })
          .catch((err) => console.log("err", err));
      } else {
        // show some error
        swal({
          text: "passwords dont match",
          icon: "error",
        });
      }
    },
  },
};
</script>
<style scoped>
.btn-primary {
  background-color: #f0c14b;
  color: #000;
}

@media screen and (min-width: 992 px) {
  #signup {
    width: 40%;
  }
}
</style>
