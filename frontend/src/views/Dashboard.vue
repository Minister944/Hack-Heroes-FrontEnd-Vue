<template>
  <div class="home fadeInDown ">
     <div class="row no-gutters">
      <div class="col mb-3">
         <div class="card p-3">
           <div class="container">
            <div class="row">
              <div class="col-6">
                <img class="img-sadow" alt="auto" style="max-width:100%" :src="getImgUrl(getuserProfile.lvl)" />
              </div>
              <div class="col-6">
                <strong>{{ getuserProfile.login }}</strong><br/>
                Poziom: {{ getuserProfile.lvl }}
              </div>
            </div>
          </div>
          
           <div class="labeldata" style="padding-top: 10px; ">Umiesz już {{this.ilosc_przerobionych_pytan1}} pytania na {{this.ilosc_wszystkich_pytan1}}</div>
           <b-progress role="progressbar" :max="this.ilosc_wszystkich_pytan1" height="2rem">
                <b-progress-bar :value="this.ilosc_przerobionych_pytan1" variant="success" striped animated>
                  <span><strong>{{((this.ilosc_przerobionych_pytan1 / this.ilosc_wszystkich_pytan1) * 100).toFixed(2)}}%</strong></span>
                </b-progress-bar>
              </b-progress>
          <div class="labeldata">Najlepszy czas egzaminu teoretycznego: {{this.naj_wynik_z_test_teoretycznego}}</div>
          <div style="padding-top: 100px; "></div>

          <h5>Podręcznik kierowcy</h5>
              <div class="pb-2 wiedz"><fa icon="ruler-vertical" class="m-2" style="  min-width: 21px;" /><div>Minimalna dopuszczalna głębokość bieżnika przez polskie prawo to 1,6 mm.</div></div>
              <div class="pb-2 wiedz"><fa icon="video" class="m-2" style="  min-width: 21px;"/><div><a target="_blank" rel=”noreferrer” href="https://www.youtube.com/watch?v=FJlGMFLhTos">5 STRASZNYCH BŁĘDÓW młodego KIEROWCY</a></div></div>
              <div class="pb-2 wiedz"><fa icon="video" class="m-2" style="  min-width: 21px;"/><div><a target="_blank" rel=”noreferrer” href="https://www.youtube.com/watch?v=nV7O8apBRZY">Jak przygotowac auto na zimę</a></div></div>
              <div class="pb-2 wiedz"><fa icon="temperature-low" class="m-2" style="  min-width: 21px;"/><div>Zalecamy zmienić opony na zimowe, gdy średnia temperatura spadnie i pozostanie poniżej 7°C.</div></div>
              <div class="pb-2 wiedz"><fa icon="video" class="m-2" style="  min-width: 21px;"/><div><a target="_blank" rel=”noreferrer” href="https://www.youtube.com/watch?v=dQf8U97tGoA">JAK UMYĆ SAMOCHÓD POD DOMEM I NA MYJNI</a></div></div>
      </div>
      </div>
      <div class="col col-md-8  col-12 ">
        <div class="row row-cols-1 row-cols-sm-2 row-cols-md-2 row-cols-lg-2 no-gutters">

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
                  to="/Skrzyz"
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
                  to="/VirtualCarTest"
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
            <p>Najlepsze czasy użytkowników, którzy rozwiązali egzamin teoretyczny na 100%.</p>
            <div class="card-text">
              <b-table striped hover :items="items" :fields="fields"></b-table>
            </div>
          </div>
        </div>
      </div>

      <!-- <div class="col mb-4">
        <div class="card">
          <div class="card-body">
            <h1 class="card-title">Podręcznik kierowcy</h1>
           <ul class="list-group list-group-flush">
              <li href="#" class="list-group-item">Minimalna dopuszczalna głębokość bieżnika przez polskie prawo to 1,6 mm.</li>
              <li class="list-group-item"><a target="_blank" rel=”noreferrer” href="https://www.youtube.com/watch?v=FJlGMFLhTos">5 STRASZNYCH BŁĘDÓW młodego KIEROWCY</a></li>
              <li class="list-group-item"><a target="_blank" rel=”noreferrer” href="https://www.youtube.com/watch?v=nV7O8apBRZY">Jak przygotowac auto na zimę</a></li>
              <li class="list-group-item">Zalecamy zmienić opony na zimowe, gdy średnia temperatura spadnie i pozostanie poniżej 7°C.</li>
              <li class="list-group-item"><a target="_blank" rel=”noreferrer” href="https://www.youtube.com/watch?v=dQf8U97tGoA">JAK UMYĆ SAMOCHÓD POD DOMEM I NA MYJNI BEZDOTYKOWEJ</a></li> 
           </ul>
          </div>
        </div>
      </div> -->
      <div class="col mb-4 ">
        <div class="card" >
          <div class="card-body">
            <h1 class="card-title">Nauka</h1>
            <div class="container" style="flex-direction: row;">
              <div class="row justify-content-md-center">
                <div class="col col-lg-2 box p-0" v-bind:class="{actual: getuserProfile.lvl == n-1, unloc: getuserProfile.lvl > n-1}" v-for="n in 20" :key="n">
                 <router-link v-if="getuserProfile.lvl == n-1" to="/Learn" type="button" style="text-decoration: none; color: black;" class="linku">{{n}}</router-link>
                 <router-link v-else-if="getuserProfile.lvl > n-1" :to="'/LearnOne/'+n" type="button" style="text-decoration: none; color: black" class="linku">{{n}}</router-link>
                <div v-else>{{n}}</div>
                
                </div>
              </div>
            </div>
            <h1 class="card-title pt-3">Skrzyżowania</h1>
            <div class="container" style="flex-direction: row;">
              <div class="row justify-content-md-center">
                <div class="col col-lg-2 box p-0" v-bind:class="{unloc: getuserProfile.lvl > n-1}" v-for="n in 20" :key="n">
                 <router-link v-if="getuserProfile.lvl > n-1" :to="'/Skrzyz/'+n" type="button" style="text-decoration: none; color: black;" class="linku">{{n}}</router-link>
                <div v-else>{{n}}</div>
                
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


      <!-- <div class="col mb-4 ">
        <div class="card" >
          <div class="card-body">
            <h1 class="card-title">Technologie</h1>
            <div class="container" style="flex-direction: row;">
              <div class="row justify-content-md-center">
                <div class="col ">
                  <a target="_blank" rel=”noreferrer” href="https://vuejs.org/"><img alt="Vue logo" src="../assets/Vue.png"></a>
                </div>
                <div class="col ">
                  <a target="_blank" rel=”noreferrer” href="https://nodejs.org/"><img alt="node logo" src="../assets/node.png" ></a>
                </div>
                <div class="w-100"></div>
                <div class="col ">
                  <a target="_blank" rel=”noreferrer” href="https://www.mysql.com/"><img alt="mysql logo" src="../assets/mysql.png" ></a>
                </div>
                <div class="col">
                  <a target="_blank" rel=”noreferrer” href="https://dotnet.microsoft.com/apps/xamarin"><img alt="xamarin logo"  src="../assets/xamarin.jpg"></a>
                </div>

              </div>
              <p>Aplikacja na telefon panad 40 plikow 6 tys lini kodu.<br/>
              Frontend 15 plikow i 3 tys lini kodu. <br/>
              Piękny backend 5 pliow i 1 tys lini kodu.<br/>
              I to wszystko w technologiach ktore widzielismy pierwysz raz na oczy, no może poza MySQL :)<br />
              Pierwsze 4 dni pracy to nauka smaych jezykow jak i technologi aby zrobić Hello Worda</p>
            </div>
          </div>
        </div>
      </div> -->

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
      naj_wynik_z_test_teoretycznego: '0',
      ilosc_wszystkich_pytan1: 2020,
      ilosc_przerobionych_pytan1: 0,

      fields: [
        { key: "id", label: "Miejsce" },
        { key: "login", label: "Login" },
        { key: "czas", label: "Czas" },
      ],
      items: [
        {login: '', ilosc_punktow: '',czas: '' },
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
    try{
       var s = response.data.naj_wynik_z_test_teoretycznego.czas
      var min = s / 60; 
        var sLeft = Math.floor(s  % 60);     
        var minLeft = Math.floor(min % 60); 
        console.log(sLeft)
        if (minLeft < 10) minLeft = "0" + minLeft;
        if (sLeft < 10) sLeft = "0" + sLeft;
       this.naj_wynik_z_test_teoretycznego = minLeft+ ' min '+sLeft+' sec'
    } catch{
      console.log('brak najleposzego czasu')
    }


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
  },
  beforeCreate() {
        document.body.className = 'home1';
    },
};
</script>
<style scoped>
.box{
  flex: 0 0 50px;
  background-color: #e44848;
  display: flex; 
  justify-content: center; 
  line-height: 50px;
   border-radius: 2rem;
   margin: 1px;
}
.box:hover{
  opacity: 0.9;
  cursor: pointer;
}

.actual{
   background-color: #fcba03
}

.unloc{
  background-color: #18d698;
}

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
  padding-left: 25px;
  padding-right: 25px;
  font-size: 20pt;

}

.home {
  padding-left: 24px;
  padding-right: 24px;
}
@media (max-width: 575px) {
  .home {
  padding-left: 8px;
  padding-right: 8px;
  }
}
span {
    position: absolute;
    display: block;
    width: 100%;
    color: black;
    font-size: 150%;
}
.card{
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 2rem;
-webkit-box-shadow: 8px 8px 24px 0px rgba(10, 10, 10, 1);
-moz-box-shadow: 8px 8px 24px 0px rgba(10, 10, 10, 1);
box-shadow: 8px 8px 24px 0px rgba(10, 10, 10, 1);
} 
.img-sadow{
    border-radius: 50%;
  -webkit-box-shadow: 8px 8px 24px -13px rgba(66, 68, 90, 1);
  -moz-box-shadow: 8px 8px 24px -13px rgba(66, 68, 90, 1);
  box-shadow: 8px 8px 24px -13px rgba(66, 68, 90, 1);
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
.linku{
  width: 100%;
  height: 100%;
}
.podkier{
  list-style-type: none;
}
.wiedz{
  display: flex; 
  align-items: center;
}

</style>

<style>
.dash{
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 2rem;
  -webkit-box-shadow: 8px 8px 24px -13px rgba(66, 68, 90, 1);
  -moz-box-shadow: 8px 8px 24px -13px rgba(66, 68, 90, 1);
  box-shadow: 8px 8px 24px -13px rgba(66, 68, 90, 1);
} 
</style>

