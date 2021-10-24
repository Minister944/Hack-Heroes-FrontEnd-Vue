<template>
  <div class="home d-flex justify-content-center">
    <div class="dash d-flex flex-row">
      <div id="learning-question" class="">
                    <div class="row video-row">
                      <div class="col-sm-9 col-md-8 col-lg-8" id="resource-holder">
                          <img  alt="kokpit w srodku" v-if="this.queryquery.media == true" :src="getImgUrl('kokpitall')" /> 
                          <img alt="pod maska" v-else :src="getImgUrl('podmasce')" /> 
                      </div>

                       <div class="col-sm-3 col-md-4 col-lg-4 text-center">

                       
                        <div class="row m-2">
                          <div type="button" class="btn btn-warning btn-lg"  @click="randompyt()" >Losuj</div>
                        </div>
                      </div>
                    </div>

                    <div class="question">
                      <div class="row">
                        <div class="col-xs-12 col-sm-9 col-md-8 col-lg-8 p-3">
                          <h5>{{this.queryquery.pytanie}}</h5>
                        </div>
                      </div>

                      <div class="good1 odp"
                          v-if="this.nowodp && this.odp === this.queryquery.poprawna_odp"
                        >
                          Poprawna odpowiedz
                        </div>
                        <div class="bad1 odp" v-else-if="this.odp !== '' && this.nowodp">
                          Zła odpowiedz
                        </div>
                      <div class="row" v-if="this.queryquery.odpowiedz_a === ''">
                        <div class="col-xs-6 col-sm-4 col-md-4 col-lg-4">
                          <div type="button" class="btn btn-outline-primary btn-lg special" :class="{good: this.nowodp && this.odp === this.queryquery.poprawna_odp && this.odp === 'N', bad: this.nowodp && this.odp !== this.queryquery.poprawna_odp && this.odp === 'N'}" @click="odpuztfun('N')">NIE</div>
                        </div>
                        <div class="col-xs-6 col-sm-4 col-md-4 col-lg-4">
                          <div type="button" class="btn btn-outline-primary btn-lg special" :class="{good: this.nowodp && this.odp === this.queryquery.poprawna_odp && this.odp === 'T', bad: this.nowodp && this.odp !== this.queryquery.poprawna_odp && this.odp === 'T'}"   @click="odpuztfun('T')" >TAK</div>
                        </div>
                      </div>

                      <div class="row p-3" v-if="this.queryquery.odpowiedz_a !== ''">
                        <div class="col-xs-12 col-sm-9 col-md-8 col-lg-8">
                          <div type="button" class="btn btn-outline-primary btn-lg" :class="{good: this.nowodp && this.odp === this.queryquery.poprawna_odp && this.odp === 'A', bad: this.nowodp && this.odp !== this.queryquery.poprawna_odp && this.odp === 'A'}" @click="odpuztfun('A')">A. {{this.queryquery.odpowiedz_a}}</div>
                        </div>
                      </div>
                      <div class="row p-3" v-if="this.queryquery.odpowiedz_a !== ''">
                        <div class="col-xs-12 col-sm-9 col-md-8 col-lg-8">
                          <div type="button" class="btn btn-outline-primary btn-lg" :class="{good: this.nowodp && this.odp === this.queryquery.poprawna_odp && this.odp === 'B', bad: this.nowodp && this.odp !== this.queryquery.poprawna_odp && this.odp === 'B'}" @click="odpuztfun('B')">B. {{this.queryquery.odpowiedz_b}}</div>
                        </div>
                      </div>
                      <div class="row p-3" v-if="this.queryquery.odpowiedz_a !== ''">
                        <div class="col-xs-12 col-sm-9 col-md-8 col-lg-8">
                          <div type="button" class="btn btn-outline-primary btn-lg" :class="{good: this.nowodp && this.odp === this.queryquery.poprawna_odp && this.odp === 'C', bad: this.nowodp && this.odp !== this.queryquery.poprawna_odp && this.odp === 'C'}" @click="odpuztfun('C')">C. {{this.queryquery.odpowiedz_c}}</div>
                        </div>
                      </div> 
                    </div> 
                  </div>
    </div>    
  </div>
</template>

<script>
import { mapGetters } from "vuex";
// import axios from "axios";
// import VueCookies from "vue-cookies";
export default {
  name: "VirtualCarTest",
  data() {
    return {
      nrpytania: 0,

      nowodp: false,
      odp: 'asd',
      queryquery: {
        media: true,
        odpowiedz_a: "",
        odpowiedz_b: "",
        odpowiedz_c: "",
        poprawna_odp: "",
        pytanie: "Kliknij przycisk losuj",
      },
      database: [{
        media: false,
        odpowiedz_a: "Wlew paliwa",
        odpowiedz_b: "Wlew płynu chłodniczego",
        odpowiedz_c: "Wlew płynu chmulcowego",
        poprawna_odp: "B",
        pytanie: "Co znajduje sie pod numerm 1",
      },{
        media: false,
        odpowiedz_a: "Wlew oleju",
        odpowiedz_b: "Wlew płynu do spryskiwaczy",
        odpowiedz_c: "Pomiar poziomu płyny chłodniczego",
        poprawna_odp: "B",
        pytanie: "Co znajduje sie pod numerm 2",
      },{
        media: false,
        odpowiedz_a: "Wlew oleju",
        odpowiedz_b: "Wlew płynu chłodniczego",
        odpowiedz_c: "Wlew płynu chmulcowego",
        poprawna_odp: "A",
        pytanie: "Co znajduje sie pod numerm 3",
      },{
        media: false,
        odpowiedz_a: "Bagnet do poziomu spryskiwaczy",
        odpowiedz_b: "Bagnet do poziomu wody w silniku",
        odpowiedz_c: "Bagnet do poziomu oleju w silniku",
        poprawna_odp: "C",
        pytanie: "Co znajduje sie pod numerm 4",
      },{
        media: false,
        odpowiedz_a: "Wlew płynu chłodniczego",
        odpowiedz_b: "Wlew płynu chmulcowego",
        odpowiedz_c: "Bagnet do poziomu oleju w silniku",
        poprawna_odp: "B",
        pytanie: "Co znajduje sie pod numerm 5",
      },{
        media: false,
        odpowiedz_a: "",
        odpowiedz_b: "",
        odpowiedz_c: "",
        poprawna_odp: "T",
        pytanie: "Czy poziom płynu (numer 1) zawsze powinien być między maximum a minimum",
      },{
        media: false,
        odpowiedz_a: "",
        odpowiedz_b: "",
        odpowiedz_c: "",
        poprawna_odp: "N",
        pytanie: "Czy poziom płynu (numer 2) zawsze powinien być między maximum a minimum",
      },{
        media: false,
        odpowiedz_a: "",
        odpowiedz_b: "",
        odpowiedz_c: "",
        poprawna_odp: "N",
        pytanie: "Czy poziom płynu (numer 4) zawsze powinien być poniżej minimum",
      },{
        media: false,
        odpowiedz_a: "",
        odpowiedz_b: "",
        odpowiedz_c: "",
        poprawna_odp: "N",
        pytanie: "Czy poziom płynu (numer 5) zawsze powinien być powyżej maximum",
      },{
        media: true,
        odpowiedz_a: "Światła pozycyjne",
        odpowiedz_b: "Światła drogowe",
        odpowiedz_c: "Światła mijania",
        poprawna_odp: "C",
        pytanie: "Kontrolka o numerze 1 oznacza",
      },{
        media: true,
        odpowiedz_a: "Światła drogowe",
        odpowiedz_b: "Światła przeciwmgielne tylnie",
        odpowiedz_c: "Światła mijania",
        poprawna_odp: "A",
        pytanie: "Kontrolka o numerze 2 oznacza",
      },{
        media: true,
        odpowiedz_a: "Światła przeciwmgielne tylnie",
        odpowiedz_b: "Światła przeciwmgielne przednie",
        odpowiedz_c: "Światła drogowe",
        poprawna_odp: "B",
        pytanie: "Kontrolka o numerze 3 oznacza",
      },{
        media: true,
        odpowiedz_a: "Światła przeciwmgielne tylnie",
        odpowiedz_b: "Światła drogowe",
        odpowiedz_c: "Światła przeciwmgielne tylnie",
        poprawna_odp: "A",
        pytanie: "Kontrolka o numerze 4 oznacza",
      },{
        media: true,
        odpowiedz_a: "Kierunkowskaz w lewo",
        odpowiedz_b: "Kierunkowskaz w prawo",
        odpowiedz_c: "Światła awaryjne",
        poprawna_odp: "A",
        pytanie: "Kontrolka o numerze 5 oznacza",
      },{
        media: true,
        odpowiedz_a: "Kierunkowskaz w lewo",
        odpowiedz_b: "Kierunkowskaz w prawo",
        odpowiedz_c: "Światła awaryjne",
        poprawna_odp: "B",
        pytanie: "Kontrolka o numerze 6 oznacza",
      },{
        media: true,
        odpowiedz_a: "Check engine",
        odpowiedz_b: "Kierunkowskaz w prawo i lewo",
        odpowiedz_c: "Światła awaryjne",
        poprawna_odp: "C",
        pytanie: "Jeśli kontrolki 5 i 6 mrugają to oznacza że:",
      },{
        media: true,
        odpowiedz_a: "",
        odpowiedz_b: "",
        odpowiedz_c: "",
        poprawna_odp: "T",
        pytanie: "Jeśli kierunkowskaz mryga za szybko to oznacza uszkodzenie kierunkowskazu",
      },
      
      ]
    };
  },
  components: {},
  methods: {
    getImgUrl(pet) {
      var images = require.context("../assets/car/CAR/", false, /\.jpg$/);
      return images("./" + pet + ".jpg");
    },
    odpuztfun(data){
      if(!this.nowodp)
      {
        this.odp = data
        this.nowodp = true 
      }

    },
    sleep(ms) {
      return new Promise((resolve) => {
        setTimeout(resolve, ms);
      });
    },
    randompyt() {
      this.odp = ''
      this.nowodp = false
      this.queryquery = this.database[this.getRandomInt(0,this.database.length)]
    },
    getRandomInt(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min)) + min;
    }
  },
  mounted(){
      console.log('aktuala baza pytan '+this.database.length)
  },
  computed: {
    ...mapGetters("auth", {
      getuserProfile: "getuserProfile",
    }),
  },
};
</script>
<style scoped>
.home{
   padding: 24px;
}
.dash {
  border-radius: 1rem;
  padding: 24px;
  width: 80%;
}
img,
video {
  display: block;
  max-width: 100%;
}

.active{
  background-color:blue;
}


.good {
  background-color: rgba(91, 214, 75, 0.87);
  color: white;
  border-color: rgba(91, 214, 75, 0.87);
}
.bad {
  background-color: rgba(212, 75, 75, 0.87);
  color: white;
  border-color: rgba(212, 75, 75, 0.87);
}

.good1 {
  color: rgba(91, 214, 75, 0.87);
}
.bad1 {
  color: rgba(212, 75, 75, 0.87);
}

@media (max-width: 425px) {
  .home{
    padding: 4px;
  }
  .dash {
  padding: 0px;
  width: 100%;
  
  }
  .special{
    margin: 10px;
    text-align: center;
  }
}
</style>
