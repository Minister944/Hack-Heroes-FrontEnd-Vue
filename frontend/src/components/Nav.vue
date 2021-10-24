<template>
  <nav class="navbar navbar-expand-lg navbar-light" style="background-color: #3c987a" v-if="getuserProfile.login !== ''">

    <div class="collapse navbar-collapse">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item">
           <router-link class="special" to="'/" ><img alt="logo" height="33" class="d-inline-block align-top" style="margin-right: 12px" src="../assets/logo.png"/></router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="'/Learn" >Nauka Praktyka</router-link>
        </li>
        <li class="nav-item" v-if="this.getuserProfile.lvl > 0">
          <router-link class="nav-link" :to="'/Skrzyz/'+this.getuserProfile.lvl">Nauka Skrzyżowania</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="'/Virtualcar">Nauka Praktyka</router-link>
        </li>
      </ul>
    </div>
      <div class="wylog" @click="logout()">Wylogoj</div>
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

.wylog{
  padding-right: 24px;
  color: rgba(255, 255, 255, 0.55);
}
.wylog:hover{
  cursor: pointer;
   color: rgba(255, 255, 255, 0.76);
}

img{
  padding-left: 24px;
  height: 40px;
}

.navbar{
  padding: 4px;
  margin-bottom: 24px;
}




</style>