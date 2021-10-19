<template>
  <div class="home p-4 d-flex justify-content-center">
    <div class="dash p-4 d-flex flex-row">
      <div id="learning-question" class="">
                    <div class="row video-row">
                      <div class="col-sm-9 col-md-8 col-lg-8" id="resource-holder">
                      <img
                            v-if="this.queryquery.media[this.queryquery.media.length - 1] !== '4' && this.queryquery.media !== ''"
                            v-bind:src="'http://46.41.136.62/media/' + this.queryquery.media"
                          />
                          <video id="hls-video" autoplay v-if="this.queryquery.media[this.queryquery.media.length - 1] === '4' && this.queryquery.media !== ''" class="p-3">
                            <source
                              v-bind:src="'http://46.41.136.62/media/' + this.queryquery.media"
                              type="video/mp4"
                            />
                          </video>
                          <img
                            v-if="this.queryquery.media === ''"
                            src='http://46.41.136.62/media/brak_zdjecia_1024x576.jpg'
                          /> 
                      </div>

                       <div class="col-sm-3 col-md-4 col-lg-4 text-center">
                        <div class="row m-2">
                            <div class="card-text">
                              Numer pytania w bazie danych: {{ this.queryquery.numer_pytania }}
                            </div>
                            <div class="card-text">
                              Punkty: {{ this.queryquery.liczba_punktow }}
                            </div>
                            <div class="card-text">
                              Zakres: {{ this.queryquery.zakres_struktury }}
                            </div>
                        </div>

                        <div class="row m-2">
                          <div class="col-xs-12 question-time-label">  
                             <input type="number" class="form-control" v-model="nrpytania" placeholder="np. 180">
                          </div>
                        </div>

                       
                        <div class="row m-2">
                          <div type="button" class="btn btn-warning btn-lg"  @click="getQuestionById(this.nrpytania)" >Wczytaj</div>
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
                          <div type="button" class="btn btn-outline-primary btn-lg" :class="{good: this.nowodp && this.odp === this.queryquery.poprawna_odp && this.odp === 'N', bad: this.nowodp && this.odp !== this.queryquery.poprawna_odp && this.odp === 'N'}" @click="odpuztfun('N')">NIE</div>
                        </div>
                        <div class="col-xs-6 col-sm-4 col-md-4 col-lg-4">
                          <div type="button" class="btn btn-outline-primary btn-lg" :class="{good: this.nowodp && this.odp === this.queryquery.poprawna_odp && this.odp === 'T', bad: this.nowodp && this.odp !== this.queryquery.poprawna_odp && this.odp === 'T'}"   @click="odpuztfun('T')" >TAK</div>
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
import axios from "axios";
import VueCookies from "vue-cookies";
export default {
  name: "Learn",
  props: ['id'],
  data() {
    return {
      nrpytania: 0,


      NumberPytanie: 0,
      nowodp: false,
      odp: '',
      queryquery: {
        id: 0,
        liczba_punktow: "",
        media: "",
        nazwa_bloku: "",
        numer_pytania: "",
        odpowiedz_a: "",
        odpowiedz_b: "",
        odpowiedz_c: "",
        poprawna_odp: "",
        pytanie: "",
        zakres_struktury: "",
      }
    };
  },
  components: {},
  methods: {
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
     async getQuestionById(data) {
       

      if(this.getuserProfile.lvl+2*100 <= data) return

       this.odp = ''
        this.nowodp = false 
      var response = await axios.post(
        "http://46.41.136.62:5000/api/v1/queries/getQuestionById",
        { pytanie_id: data },
        {
          headers: {
            "Access-Control-Allow-Credentials": true,
            Authorization: "Bearer " + VueCookies.get("token"),
          },
        }
      );
      this.queryquery = response.data.pytanie;

      var asd = true
      if(this.queryquery.media[this.queryquery.media.length - 1] === '4' && this.queryquery.media !== ''){
        do{
          await this.sleep(10);
          var videoc = document.getElementById("hls-video")
          console.log(videoc)
          if(videoc != null){
            videoc.load()
            asd = false
          }
          
        }while(asd)
      }
     



    },
  },
  computed: {
    ...mapGetters("auth", {
      getuserProfile: "getuserProfile",
    }),
  },
};
</script>
<style scoped>
.dash {
  background-color: rgba(255, 255, 255, 0.87);
  border-radius: 1rem;
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
</style>
