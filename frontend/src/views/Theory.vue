<template>
  <div class="home d-flex justify-content-center">
    <div class="dash d-flex flex-row">
      <div id="learning-question" class="" v-if="endyest">
                    <div class="row video-row">
                      <div class="col-sm-9 col-md-8 col-lg-8" id="resource-holder">
                      <img alt="media"
                            v-if="this.queryquery.pytania[this.NumberPytanie].media[this.queryquery.pytania[NumberPytanie].media.length - 1] !== '4' && this.queryquery.pytania[NumberPytanie].media !== ''"
                            v-bind:src="'http://46.41.136.62/media/' + this.queryquery.pytania[NumberPytanie].media"
                          />
                          <video id="hls-video" autoplay v-if="this.queryquery.pytania[this.NumberPytanie].media[this.queryquery.pytania[NumberPytanie].media.length - 1] === '4' && this.queryquery.pytania[NumberPytanie].media !== '' && stoptimevideo">
                            <source
                              v-bind:src="'http://46.41.136.62/media/' + this.queryquery.pytania[NumberPytanie].media"
                              type="video/mp4"
                            />
                          </video>
                          <img alt="media film" v-if="this.queryquery.pytania[this.NumberPytanie].media[this.queryquery.pytania[NumberPytanie].media.length - 1] === '4' && this.queryquery.pytania[NumberPytanie].media !== '' && !stoptimevideo"
                            src='http://46.41.136.62/media/obj.png'
                          />
                          <img alt="media brak zdjecia"
                            v-if="this.queryquery.pytania[NumberPytanie].media === ''"
                            src='http://46.41.136.62/media/brak_zdjecia_1024x576.jpg'
                          />
                      </div>

                      <div class="col-sm-3 col-md-4 col-lg-4 text-center">
                        <div class="row m-2">
                            <div class="col-sm-12">
                              <h5>Pytanie {{this.NumberPytanie+1}}/{{this.queryquery.pytania.length}}</h5>
                            </div>
                        </div>

                        <div class="row m-2">
                          <div class="col-xs-12 question-time-label">  
                            <h5 v-if="this.zap_odp">Czas na zapoznanie się z pytaniem</h5>
                            <h5 v-else>Czas na udzielenie odpowiedzi</h5>
                          </div>
                        </div>

                        <div class="row m-2">
                          <div class="question-time-holder">
                             <b-progress v-if="this.zap_odp" :max=max_timezapoznanie style="margin: 5px">
                                <b-progress-bar
                                  :value=timezapoznanie
                                  variant="success"
                                  striped
                                  animated
                                  :label="`${timezapoznanie}`"
                                ></b-progress-bar>
                              </b-progress>

                               <b-progress v-else :max=max_timeodp style="margin: 5px">
                                <b-progress-bar
                                  :value=timeodp
                                  variant="success"
                                  striped
                                  animated
                                  :label="`${timeodp}`"
                                ></b-progress-bar>
                              </b-progress>
                          </div>
                        </div>

                        <div class="row m-2">
                          <div class="col-xs-12 question-time-label">  
                            <h6>Czas {{this.timeuser}}/ 25 min</h6>
                          </div>
                        </div>

                        <div class="row m-2">
                          <div type="button" class="btn btn-warning btn-lg" @click="this.nextquery = true">Następe</div>
                        </div>
                      </div>
                    </div>

                    <div class="question">
                      <div class="row">
                        <div class="col-xs-12 col-sm-9 col-md-8 col-lg-8 p-3 m-2">
                          <h5>{{this.queryquery.pytania[NumberPytanie].pytanie}}</h5>
                        </div>
                      </div>

                      <div class="row" v-if="this.queryquery.pytania[NumberPytanie].odpowiedz_a === ''">
                        <div class="col-xs-6 col-sm-4 col-md-4 col-lg-4 special">
                          <div type="button" class="btn btn-outline-primary btn-lg" :class="{active: isActiveNIE}" @click="odpuztfun('N')">NIE</div>
                        </div>
                        <div class="col-xs-6 col-sm-4 col-md-4 col-lg-4 special">
                          <div type="button" class="btn btn-outline-primary btn-lg" :class="{active: isActiveTAK}" @click="odpuztfun('T')" >TAK</div>
                        </div>
                      </div>

                      <div class="row p-3" v-if="this.queryquery.pytania[NumberPytanie].odpowiedz_a !== ''">
                        <div class="col-xs-12 col-sm-9 col-md-8 col-lg-8">
                          <div type="button" class="btn btn-outline-primary btn-lg" :class="{active: isActiveA}" @click="odpuztfun('A')">A. {{this.queryquery.pytania[NumberPytanie].odpowiedz_a}}</div>
                        </div>
                      </div>
                      <div class="row p-3" v-if="this.queryquery.pytania[NumberPytanie].odpowiedz_a !== ''">
                        <div class="col-xs-12 col-sm-9 col-md-8 col-lg-8">
                          <div type="button" class="btn btn-outline-primary btn-lg" :class="{active: isActiveB}" @click="odpuztfun('B')">B. {{this.queryquery.pytania[NumberPytanie].odpowiedz_b}}</div>
                        </div>
                      </div>
                      <div class="row p-3" v-if="this.queryquery.pytania[NumberPytanie].odpowiedz_a !== ''">
                        <div class="col-xs-12 col-sm-9 col-md-8 col-lg-8">
                          <div type="button" class="btn btn-outline-primary btn-lg" :class="{active: isActiveC}" @click="odpuztfun('C')">C. {{this.queryquery.pytania[NumberPytanie].odpowiedz_c}}</div>
                        </div>
                      </div>
                     

                    </div>
                  </div>
                  <!-- <div v-else v-for="n in 31" :key="n">
                    <div class="parent" :class="{bad: this.queryquery.pytania[n].poprawna_odp != odpuzt[n]}" >
                        <div class="child" >{{this.queryquery.pytania[n].id}}</div> 
                    </div>
                  </div> -->
                  <div  v-else>
                    <h4>Twoj wynik to {{this.poprawne}} na 32 czyli {{this.poprawne/32*100}}%</h4>
                    <ul>
                      <li>Test zaliczony jest po zdobyciu co najmniej 68 punktów.</li>
                      <li>Maksymalny czas trwania testu wynosi 25 minut.</li>
                      <li>Liczba możliwych do uzyskania punktów w jednym teście wynosi 74 punktów.</li>
                      <li>Każdy test zawiera 20 pytań z wiedzy podstawowej - 10 pytań za 3 punkty, 6 pytań za 2 punkty i 4 pytania za 1 punkt.</li>
                      <li>Każdy test zawiera dodatkowo 12 pytań z wiedzy specjalistycznej - 6 pytań za 3 punkty, 4 pytania za 2 punkty i 2 pytania za 1 punkt.</li>

                    </ul>
                    <div class="card-columns" style="width: 100%">
                      <div class="card good" v-for="n in 31" :key="n" :class="{bad: this.queryquery.pytania[n-1].poprawna_odp !== odpuzt[n-1]}" >
                        <img class="card-img-top"
                              v-if="this.queryquery.pytania[n-1].media[this.queryquery.pytania[n-1].media.length - 1] !== '4' && this.queryquery.pytania[n-1].media !== ''"
                              v-bind:src="'http://46.41.136.62/media/' + this.queryquery.pytania[n-1].media"
                            />
                            <img class="card-img-top"
                              v-if="this.queryquery.pytania[n-1].media === ''"
                              src='http://46.41.136.62/media/brak_zdjecia_1024x576.jpg'
                            /> 
                            <video id="hls-video" class="card-img-top" controls v-if="this.queryquery.pytania[n-1].media[this.queryquery.pytania[n-1].media.length - 1] === '4'">
                              <source
                                v-bind:src="'http://46.41.136.62/media/' + this.queryquery.pytania[n-1].media"
                                type="video/mp4"
                              />
                            </video>
                            
                        <div class="card-body">
                          <h6 class="card-title">Pytanie {{n}}</h6>
                          <h5 class="card-title">{{this.queryquery.pytania[n-1].pytanie}}</h5>
                          <p class="card-text">Poprawna odpowiedź: {{this.queryquery.pytania[n-1].poprawna_odp}}</p>
                          <p class="card-text" v-if="this.queryquery.pytania[n-1].odpowiedz_a !== ''">A. {{this.queryquery.pytania[n-1].odpowiedz_a}}</p>
                          <p class="card-text" v-if="this.queryquery.pytania[n-1].odpowiedz_a !== ''">B. {{this.queryquery.pytania[n-1].odpowiedz_b}}</p>
                          <p class="card-text" v-if="this.queryquery.pytania[n-1].odpowiedz_a !== ''">C. {{this.queryquery.pytania[n-1].odpowiedz_c}}</p>
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
  data() {
    return {
      chcekEndtime: false,
      poprawne: 0,
      counttime: true,
      timeuser: '',
      diff: Date,

      isActiveTAK: false,
      isActiveNIE: false,
      isActiveA: false,
      isActiveB: false,
      isActiveC: false,

      nextquery: false,

      stoptimevideo: false,
      timezapoznanie: 15,
      timeodp: 15,
      max_timezapoznanie: 15,
      max_timeodp: 15,

      zap_odp:  true,
      odpuzt:[],

      endyest: true,

      NumberPytanie: 0,
      nowodp: false,
      odp: 'BRAK',
      queryquery: {
        pytania:[{
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
          zakres_struktury: "",}]
      },
    };
  },
  components: {},
  methods: {
    sleep(ms) {
      return new Promise((resolve) => {
        setTimeout(resolve, ms);
      });
    },
    odpuztfun(data){
      this.odp = data
      
        this.isActiveTAK= false
        this.isActiveNIE=  false
        this.isActiveA=false
        this.isActiveB= false
        this.isActiveC= false

      if(data === 'N') this.isActiveNIE = !this.isActiveNIE
      else if(data === 'T') this.isActiveTAK = !this.isActiveTAK
      else if(data === 'A') this.isActiveA = !this.isActiveA
      else if(data === 'B') this.isActiveB = !this.isActiveB
      else if(data === 'C') this.isActiveC = !this.isActiveC
    },
    async time(){
      
      while(this.counttime){
        const today = new Date();
        this.diff = today-this.startdate
        var s = this.diff / 1000;
        var min = s / 60; 
        var sLeft = Math.floor(s  % 60);     
        var minLeft = Math.floor(min % 60); // po minieciu limitu czasu wylacz 
        if(min >= 25) {
          this.chcekEndtime = true
          this.endyest = false 
        }
        if (minLeft < 10) minLeft = "0" + minLeft;
        if (sLeft < 10) sLeft = "0" + sLeft;

        this.timeuser = minLeft+ ':'+sLeft
        await this.sleep(1000);
      }
    },
  },
  async mounted() {
    await this.sleep(1000);
    this.startdate = new Date(); 


    this.time()

    for(;this.NumberPytanie<this.queryquery.pytania.length;)
    {
      if(this.chcekEndtime) {
            for(var licz =0; licz < 31; licz++){   
            if(this.queryquery.pytania[licz].poprawna_odp === this.odpuzt[licz]) this.poprawne++
          }
        console.log('end time')

        var  response = await axios.post(
            "http://46.41.136.62:5000/api/v1/test/insertScore",
            { ilosc_punktow: this.poprawne, sekund: this.diff/1000},
            {
              headers: {
                "Access-Control-Allow-Credentials": true,
                Authorization: "Bearer " + VueCookies.get("token"),
              },
            }
          ).catch(err => console.error(err))

          console.log(response)
        break
        
      }
       console.log("this.NumberPytanie: "+this.NumberPytanie)
       console.log('open czas na zapoznanie sie z odp')
      for(var i=this.max_timezapoznanie; i> 0;i--){
        this.timezapoznanie = i
        await this.sleep(1000);
        if(this.nextquery) {
          break 
        }
      }
      if(!this.nextquery)
      {
        if(this.queryquery.pytania[this.NumberPytanie].media[this.queryquery.pytania[this.NumberPytanie].media.length - 1] === '4'){
          console.log("wideo")
        this.stoptimevideo = true
        }

        this.timezapoznanie = this.max_timezapoznanie
        this.zap_odp = !this.zap_odp
      
        for(i=this.max_timeodp; i> 0;i--){
          console.log('czas na odp')
          this.timeodp = i
          if(this.nextquery) break
          await this.sleep(1000);  
        }
      }

      this.zap_odp = this.max_odp
      this.zap_odp = !this.zap_odp

      this.stoptimevideo = false
      this.odpuzt.push(this.odp)
      this.odp = 'BRAK'
      this.nextquery = false
       this.isActiveTAK= false
      this.isActiveNIE=  false
      this.isActiveA=false
      this.isActiveB= false
      this.isActiveC= false

      this.NumberPytanie++
      console.log(this.odpuzt)
    }
    this.poprawne = 0
     for(var licz1 =0; licz1 < 31; licz1++){   
      if(this.queryquery.pytania[licz1].poprawna_odp === this.odpuzt[licz1]) this.poprawne++
     }
    this.endyest = false

  },
  computed: {
    ...mapGetters("auth", {
      getuserProfile: "getuserProfile",
    }),
  },
  async beforeCreate() {

    var  response = await axios.post(
        "http://46.41.136.62:5000/api/v1/test/getTest",
        "",
        {
          headers: {
            "Access-Control-Allow-Credentials": true,
            Authorization: "Bearer " + VueCookies.get("token"),
          },
        }
      ).catch(err => console.error(err))

      this.queryquery = response.data 
      console.log(this.queryquery)
           
  },
};
</script>
<style scoped>
.home{
  padding: 24px;
}
.dash {
  padding: 24px;
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
}
.bad {
  background-color: rgba(212, 75, 75, 0.87);
  
}
@media (max-width: 425px) {
  .home{
    padding: 4px;
  }
  .dash {
  padding: 0px;
  }
  .special{
    margin: 10px;
    text-align: center;
  }
}
</style>
