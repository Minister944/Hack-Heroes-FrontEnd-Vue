<template>
  <nav
    class="navbar navbar-expand-md navbar-dark"
    style="background-color: #3c987a"
    v-if="getuserProfile.login !== ''">
    <div class="container-fluid">
      <div>
        <router-link to="/" class="navbar-brand">
          <img  alt="logo" height="33" class="d-inline-block align-top" style="margin-right: 4px" src="../assets/logo.png"/>
        </router-link>
        <router-link to="/" class="navbar-brand" v-if="getuserProfile.login === ''">Start</router-link>
        <span class="navbar-brand" v-else>{{ getuserProfile.login }} <span class='visu'>poziom: {{ getuserProfile.lvl }}</span></span >

      </div>
      <div>
        <ul
          class="navbar-nav me-auto mb-2 mb-md-0"
          v-if="getuserProfile.login === ''">
          <li class="nav-item">
            <router-link to="/login" class="nav-link">Logowanie</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/register" class="nav-link" >Rejestracja</router-link>
          </li>
        </ul>

        <ul
          class="navbar-nav me-auto mb-2 mb-md-0"
          v-if="getuserProfile.login !== ''">
          <li class="nav-item">
            <a href="#" class="nav-link" @click="logout()">Wylogoj</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
export default {
  name: "Nav",
  components: {},
  computed: {
    ...mapGetters("auth", {
      getuserProfile: "getuserProfile",
      getLogout: "getLogout",
    }),
  },
  methods: {
    ...mapActions("auth", {
      userLogout: "userLogout",
    }),
    ...mapMutations("auth", {
      setLogout: "setLogout",
      setuserProfile: "setuserProfile",
    }),
    async logout() {
      await this.userLogout();

      if (this.setLogout) {
        const resetUser = {
          login: "",
          email: "",
          lvl: "",
        };
        this.setuserProfile(resetUser);
        this.setLogout(false);
        this.$router.push("/login");
      }
    },
  },
};
</script>

<style scoped>
.navbar{
    margin-bottom: 24px;
  }
@media (max-width: 575px) {
  .navbar{
    margin-bottom: 4px;
  }
}
@media (max-width: 388px) {
  .visu{
    display: none;
  }
}




</style>