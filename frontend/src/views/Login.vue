<template>
<div class="bodyyy">
      <b-modal v-model="modalShow" >
        <div class="text-center">
          Chcesz się uczyć na telefonie? <br/><a style="color: #0d6efd;" href="https://drive.google.com/drive/folders/1_LSO5Bdl8zZeTyA5GXgzfAjj47IiJDM5?usp=sharing">Pobierz aplikacje</a>
          <br />Nie zdążyliśmy jescze przygodowac strony w 100% na urządzenia mobilne
        </div>
        </b-modal>
       <div class="wrapper fadeInDown">
          <Start />
        <div id="formContent">
          
          <!-- Login Form -->
          <form>
            <p v-if="errors.length" style="color: red">
              <ul>
                <li v-bind:key="error" v-for="error in errors">{{ error }}</li>
              </ul>
            </p>
            <input type="text" id="login" v-model="email" class="fadeIn second" placeholder="Email" >
            <input type="password" id="password" v-model="password" class="fadeIn third" placeholder="Hasło">
            <input type="button" class="fadeIn fourth" value="Zaloguj" @click="login">
          </form>

          <!-- Remind Passowrd -->
          <div id="formFooter">
            <router-link class="underlineHover" to="/register">Zarejestruj sie</router-link>           
          </div>

        </div>
      </div>
</div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import Start from "../components/Start.vue";

export default {
  data() {
    return {
      email: "",
      password: "",
      errors: [],
      modalShow: false,
    };
  },
  name: "Login",
  computed: {
    ...mapGetters("auth", {
      getLoginApiStatus: "getLoginApiStatus",
    }),
  },
  methods: {
    ...mapActions("auth", {
      loginApi: "loginApi",
    }),
    async login() {
      if (!this.checkForm()) {
        return 0;
      }

      const payload = {
        email: this.email,
        haslo: this.password,
      };
      await this.loginApi(payload);
      if (this.getLoginApiStatus == "success") {
        this.$router.push("/Dashboard");
      } else {
        this.errors.push("Złe dane logowania");
      }
    },
    checkForm() {
      this.errors = [];

      if (!this.email) {
        this.errors.push("Email wymagany.");
      } else if (!this.validEmail(this.email) || this.email.length > 40) {
        this.errors.push("Zły adres Email.");
      }
      if (!this.password) {
        this.errors.push("Hasło wymagane.");
      } else if (this.password.length > 40) {
        this.errors.push("Hasło za długie.");
      } else if (this.password.length < 8) {
        this.errors.push("Hasło za krótkie.");
      }

      if (!this.errors.length) {
        return true;
      }
    },
    validEmail: function (email1) {
      var re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email1);
    },
    detectMob() {
      const toMatch = [
        /Android/i,
        /webOS/i,
        /iPhone/i,
        /iPad/i,
        /iPod/i,
        /BlackBerry/i,
        /Windows Phone/i,
      ];

      return toMatch.some((toMatchItem) => {
        return navigator.userAgent.match(toMatchItem);
      });
    },
  },
  mounted() {
    // document.getElementsByTagName("body").style = "background: url('http://46.41.136.62/media/road.jpg') no-repeat center center fixed; -webkit-background-size: cover; -moz-background-size: cover; -o-background-size: cover; background-size: cover; ";
    const toMatch = [
      /Android/i,
      /webOS/i,
      /iPhone/i,
      /iPad/i,
      /iPod/i,
      /BlackBerry/i,
      /Windows Phone/i,
    ];
    console.log(
      toMatch.some((toMatchItem) => {
        return navigator.userAgent.match(toMatchItem);
      })
    );
    if (
      toMatch.some((toMatchItem) => {
        return navigator.userAgent.match(toMatchItem);
      })
    )
      this.modalShow = true;
  },
  components: {
    Start,
  },
};
</script>

<style scoped>
ul {
  list-style-type: none;
}

a {
  color: #92badd;
  display: inline-block;
  text-decoration: none;
  font-weight: 400;
}

h2 {
  text-align: center;
  font-size: 16px;
  font-weight: 600;
  text-transform: uppercase;
  display: inline-block;
  margin: 40px 8px 10px 8px;
  color: #cccccc;
}

.wrapper {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  min-height: 100%;
  padding: 20px;
}

#formContent {
  padding: 30px;
  width: 90%;
  max-width: 450px;
  position: relative;
  padding: 0px;
  text-align: center;
}

#formFooter {
  padding: 15px;
  text-align: center;
}

h2.inactive {
  color: #cccccc;
}

h2.active {
  color: #0d0d0d;
  border-bottom: 2px solid #5fbae9;
}

input[type="button"],
input[type="submit"],
input[type="reset"] {
  background-color: #56baed;
  border: none;
  color: white;
  padding: 15px 80px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  text-transform: uppercase;
  font-size: 13px;
  -webkit-box-shadow: 0 10px 30px 0 rgba(95, 186, 233, 0.4);
  box-shadow: 0 10px 30px 0 rgba(95, 186, 233, 0.4);
  -webkit-border-radius: 5px 5px 5px 5px;
  border-radius: 5px 5px 5px 5px;
  margin: 10px 20px 10px 20px;
  -webkit-transition: all 0.3s ease-in-out;
  -moz-transition: all 0.3s ease-in-out;
  -ms-transition: all 0.3s ease-in-out;
  -o-transition: all 0.3s ease-in-out;
  transition: all 0.3s ease-in-out;
}

input[type="button"]:hover,
input[type="submit"]:hover,
input[type="reset"]:hover {
  background-color: #39ace7;
}

input[type="button"]:active,
input[type="submit"]:active,
input[type="reset"]:active {
  -moz-transform: scale(0.95);
  -webkit-transform: scale(0.95);
  -o-transform: scale(0.95);
  -ms-transform: scale(0.95);
  transform: scale(0.95);
}

input[type="text"],
input[type="password"] {
  background-color: #f6f6f6;
  border: none;
  color: #0d0d0d;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 5px;
  width: 85%;
  border: 2px solid #f6f6f6;
  -webkit-transition: all 0.5s ease-in-out;
  -moz-transition: all 0.5s ease-in-out;
  -ms-transition: all 0.5s ease-in-out;
  -o-transition: all 0.5s ease-in-out;
  transition: all 0.5s ease-in-out;
  -webkit-border-radius: 5px 5px 5px 5px;
  border-radius: 5px 5px 5px 5px;
}

input[type="text"]:focus {
  background-color: #fff;
  border-bottom: 2px solid #5fbae9;
}

input[type="text"]:placeholder {
  color: #cccccc;
}

.fadeInDown {
  -webkit-animation-name: fadeInDown;
  animation-name: fadeInDown;
  -webkit-animation-duration: 1s;
  animation-duration: 1s;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
}

@-webkit-keyframes fadeInDown {
  0% {
    opacity: 0;
    -webkit-transform: translate3d(0, -100%, 0);
    transform: translate3d(0, -100%, 0);
  }
  100% {
    opacity: 1;
    -webkit-transform: none;
    transform: none;
  }
}

@keyframes fadeInDown {
  0% {
    opacity: 0;
    -webkit-transform: translate3d(0, -100%, 0);
    transform: translate3d(0, -100%, 0);
  }
  100% {
    opacity: 1;
    -webkit-transform: none;
    transform: none;
  }
}

@-webkit-keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
@-moz-keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.fadeIn {
  opacity: 0;
  -webkit-animation: fadeIn ease-in 1;
  -moz-animation: fadeIn ease-in 1;
  animation: fadeIn ease-in 1;

  -webkit-animation-fill-mode: forwards;
  -moz-animation-fill-mode: forwards;
  animation-fill-mode: forwards;

  -webkit-animation-duration: 1s;
  -moz-animation-duration: 1s;
  animation-duration: 1s;
}

.fadeIn.first {
  -webkit-animation-delay: 0.4s;
  -moz-animation-delay: 0.4s;
  animation-delay: 0.4s;
}

.fadeIn.second {
  -webkit-animation-delay: 0.6s;
  -moz-animation-delay: 0.6s;
  animation-delay: 0.6s;
}

.fadeIn.third {
  -webkit-animation-delay: 0.8s;
  -moz-animation-delay: 0.8s;
  animation-delay: 0.8s;
}

.fadeIn.fourth {
  -webkit-animation-delay: 1s;
  -moz-animation-delay: 1s;
  animation-delay: 1s;
}

.underlineHover:after {
  display: block;
  left: 0;
  bottom: -10px;
  width: 0;
  height: 2px;
  background-color: #56baed;
  content: "";
  transition: width 0.2s;
}

.underlineHover:hover {
  color: #fff;
}

.underlineHover:hover:after {
  width: 100%;
}

</style>+