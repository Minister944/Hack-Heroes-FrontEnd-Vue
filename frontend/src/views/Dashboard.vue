<template>
  <div class="home">
    <div class="row row-cols-1 row-cols-lx-4 row-cols-md-3 row-cols-sm-2 ">
      <div class="col mb-4">
        <!-- <div class="card" style="height: 40rem;"> -->
        <div class="card">
          <div class="card-body">
            <h1 class="card-title">Statystyki</h1>
            <img alt="auto" :src="getImgUrl('autoLvl' + getuserProfile.lvl)" />
            <img
              alt="kierowca"
              :src="getImgUrl('kierowcaLvl' + getuserProfile.lvl)"
            />
            <div class="cardstat">
              {{ getuserProfile.login }} Poziom: {{ getuserProfile.lvl }}
            </div>
            <div class="card-text">
              <div class="labeldata">Najlepszy czas teoria: 25 min 42 sec.</div>
              <div class="labeldata">
                Najlepszy czas Praktyka: 40 min 18 sec.
              </div>
              <div class="labeldata">Umiesz już {{this.ilosc_przerobionych_pytan1}} pyania na {{this.ilosc_wszystkich_pytan1}}</div>
              <b-progress :max="this.ilosc_wszystkich_pytan1" style="margin: 5px">
                <b-progress-bar
                  :value="this.ilosc_przerobionych_pytan1"
                  variant="success"
                  striped
                  animated
                  :label="`${((this.ilosc_przerobionych_pytan1 / this.ilosc_wszystkich_pytan1) * 100).toFixed(2)}%`"
                ></b-progress-bar>
              </b-progress>
            </div>
          </div>
        </div>
      </div>

      <div class="col mb-4">
        <div class="card">
          <div class="card-body">
            <h1 class="card-title">Nauka</h1>
            <div class="card-text">
              <div>
                <router-link
                  to="/Learn"
                  type="button"
                  class="btn btn-primary btn-lg custom-btn"
                  >Teoria</router-link
                >
              </div>
              <div>
                <router-link
                  to="/VirtualCar"
                  type="button"
                  class="btn btn-primary btn-lg custom-btn"
                  >Skrzyżowania</router-link
                >
              </div>
              <div>
                <router-link
                  to="/VirtualCar"
                  type="button"
                  class="btn btn-primary btn-lg custom-btn"
                  >Praktyka</router-link
                >
              </div>
            </div>
            <h1 class="card-title">Testy</h1>
            <div class="card-text">
              <div>
                <router-link
                  to="/Theory"
                  type="button"
                  class="btn btn-primary btn-lg custom-btn"
                  >Teorytyczny</router-link
                >
              </div>
              <div>
                <router-link
                  to="/VirtualCar"
                  type="button"
                  class="btn btn-primary btn-lg custom-btn"
                  >Praktyczny</router-link
                >
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col mb-4">
        <div class="card">
          <div class="card-body">
            <h1 class="card-title">Ranking</h1>
            <p>Lista użytkowników ktorzy rozwiazali teori na 100% i w jak najkrotszym czasie</p>
            <div class="card-text">
              <b-table striped hover :items="items" :fields="fields"></b-table>.
            </div>
          </div>
        </div>
      </div>

      <div class="col mb-4">
        <div class="card">
          <div class="card-body">
            <h1 class="card-title">Podręcznik kierowcy</h1>
           <ul class="list-group list-group-flush">
              <li href="#" class="list-group-item">Minimalna dopuszczalna głębokość bieżnika przez polskie prawo to 1,6 mm.</li>
              <li class="list-group-item"><a href="https://www.youtube.com/watch?v=FJlGMFLhTos">5 STRASZNYCH BŁĘDÓW młodego KIEROWCY</a></li>
              <li class="list-group-item"><a href="https://www.youtube.com/watch?v=nV7O8apBRZY">Jak przygotowac auto na zimę</a></li>
              <li class="list-group-item">Zalecamy zmienić opony na zimowe, gdy średnia temperatura spadnie i pozostanie poniżej 7°C.</li>
              <li class="list-group-item"><a href="https://www.youtube.com/watch?v=dQf8U97tGoA">JAK UMYĆ SAMOCHÓD POD DOMEM I NA MYJNI BEZDOTYKOWEJ</a></li>
           
           </ul>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
import axios from "axios";
import VueCookies from "vue-cookies";
export default {
  name: "Dashboard",
  data() {
    return {
      ilosc_wszystkich_pytan1: 2020,
      ilosc_przerobionych_pytan1: 0,

      fields: [
        { key: "id", label: "Miejsce" },
        { key: "login", label: "Login" },
        { key: "czas", label: "Czas" },
      ],
      items: [
        {login: '', ilosc_punktow: '',czas: "00:64" },
      ],
    };
  },
  components: {},
  computed: {
    ...mapGetters("auth", {
      getuserProfile: "getuserProfile",
      getLogout: "getLogout",
    }),
  },
  methods: {
    async gettatistic(){
      var response = await axios.post(
        "http://46.41.136.62:5000/api/v1/statistics/getStats", '',
        {
          headers: {
            "Access-Control-Allow-Credentials": true,
            Authorization: "Bearer " + VueCookies.get("token"),
          },
        }
      );
    this.ilosc_wszystkich_pytan1 = response.data.ilosc_wszystkich_pytan
    this.ilosc_przerobionych_pytan1 = response.data.ilosc_przerobionych_pytan
    },
    async getranking(){
      var response = await axios.post(
        "http://46.41.136.62:5000/api/v1/statistics/getRanking", '',
        {
          headers: {
            "Access-Control-Allow-Credentials": true,
            Authorization: "Bearer " + VueCookies.get("token"),
          },
        }
      );

    console.log(response.data.ranking.length)
    if(response.data.ranking.length > 10)
    {
      var dlug = 10
    }
    else dlug = response.data.ranking.length
    
    for(var i=0; i<dlug;i++)
    {

        var s = response.data.ranking[i].czas;
        
        var min = s / 60; 
        var sLeft = Math.floor(s  % 60);     
        var minLeft = Math.floor(min % 60); 
        console.log(sLeft)
        if (minLeft < 10) minLeft = "0" + minLeft;
        if (sLeft < 10) sLeft = "0" + sLeft;

      this.items[i] = {czas: minLeft+ ':'+sLeft, id: i+1, login: response.data.ranking[i].login,}
    }
      console.log(this.items)

    },
    getImgUrl(pet) {
      var images = require.context("../assets/", false, /\.png$/);
      return images("./" + pet + ".png");
    },
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
  mounted() {
    this.gettatistic()
    this.getranking()
  }
};
</script>
<style scoped>
.custom-btn {
  background-color: #3c987a;
  border-color: #3c987a;
  margin: 4px;
}
img {
  max-width: 50%;
}
.card-body {
  text-align: center;
}
.labeldata {
  padding: 5px;
}
.cardstat {
  padding: 25px;
  font-size: 20pt;
}
.card-title {
  padding-bottom: 10px;
}
.home {
  padding-left: 24px;
  padding-right: 24px;
}
</style>
