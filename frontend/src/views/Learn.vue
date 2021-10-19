<template>
  <div class="home">
    <div class="d-flex justify-content-center">
      <div class="dash text-center">
        <h1 class="p-3">{{ this.queryquery.pytanie }}</h1>
        <div class="card-text">
          Numer pytania: {{ this.queryquery.numer_pytania }}
        </div>
        <div class="card-text">
          Punkty: {{ this.queryquery.liczba_punktow }}
        </div>
        <div class="card-text">
          Zakres: {{ this.queryquery.zakres_struktury }}
        </div>
        <img
          v-if="this.queryquery.media[this.queryquery.media.length - 1] !== '4' && this.queryquery.media !== ''"
          v-bind:src="'http://46.41.136.62/media/' + this.queryquery.media"
        />
        <video v-if="this.queryquery.media[this.queryquery.media.length - 1] === '4' && this.queryquery.media !== ''" controls class="p-3">
          <source
            v-bind:src="'http://46.41.136.62/media/' + this.queryquery.media"
            type="video/mp4"
          />
        </video>
        <img
          v-if="this.queryquery.media === ''"
          src='http://46.41.136.62/media/brak_zdjecia_1024x576.jpg'
        />
        <div
          class="good odp"
          v-if="this.nowodp && this.odp === this.queryquery.poprawna_odp"
        >
          Poprawna odpowiedz
        </div>
        <div class="bad odp" v-else-if="this.odp !== '' && this.nowodp">
          Zła odpowiedz
        </div>
        <!-- tylko tak i nie -->
        <div v-if="this.queryquery.odpowiedz_a === '' && !this.nowodp">
          <div class="btn" @click="(this.odp = 'T'), (this.nowodp = true)">
            TAK
          </div>
          <div class="btn" @click="(this.odp = 'N'), (this.nowodp = true)">
            NIE
          </div>
        </div>
        <!-- tylko a b c  -->
        
          <div v-if="this.queryquery.odpowiedz_a !== '' && !this.nowodp">
            <div class="btn" @click="(this.odp = 'A'), (this.nowodp = true)">
              A.{{ this.queryquery.odpowiedz_a }}
            </div> <br/>
            <div class="btn" @click="(this.odp = 'B'), (this.nowodp = true)">
              B.{{ this.queryquery.odpowiedz_b }}
            </div><br/>
            <div class="btn" @click="(this.odp = 'C'), (this.nowodp = true)">
              C.{{ this.queryquery.odpowiedz_c }}
            </div>
          </div>
        
         
        <div v-if="this.nowodp && this.queryquery.odpowiedz_a !== ''">
          <div class="btn good" v-if="this.queryquery.poprawna_odp === odp && odp === 'A'">
            A.{{ this.queryquery.odpowiedz_a }}
          </div>
          <div class="btn good" v-else-if="this.queryquery.poprawna_odp === 'A'">
            A.{{ this.queryquery.odpowiedz_a }}
          </div>
          <div class="btn bad" v-else>
            A.{{ this.queryquery.odpowiedz_a }}
          </div>

          <br/>
          <div class="btn good" v-if="this.queryquery.poprawna_odp === odp && odp === 'B'">
            B.{{ this.queryquery.odpowiedz_b }}
          </div>
          <div class="btn good" v-else-if="this.queryquery.poprawna_odp === 'B'">
            B.{{ this.queryquery.odpowiedz_b }}
          </div>
          <div class="btn bad" v-else>
            B.{{ this.queryquery.odpowiedz_b }}
          </div>

          <br/>
          <div class="btn good" v-if="this.queryquery.poprawna_odp === odp && odp === 'C'">
            C.{{ this.queryquery.odpowiedz_c }}
          </div>
          <div class="btn good" v-else-if="this.queryquery.poprawna_odp === 'C'">
            C.{{ this.queryquery.odpowiedz_c }}
          </div>
          <div class="btn bad" v-else>
            C.{{ this.queryquery.odpowiedz_c }}
          </div>
          <br/>
          
        </div>

        <div v-if="this.nowodp">
          <div class="btn" @click="next(true)">DALEJ</div>
          <div class="btn" @click="next(false)">ZGADYWAŁEM DALEJ</div>
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
      pytania: [],
      nowodp: false,
      odp: "",
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
      },
    };
  },
  components: {},
  methods: {
    async next(odpq) {
      if (this.odp == this.queryquery.poprawna_odp && odpq) {
        console.log("poprawna odp");
        await axios.post(
          "http://46.41.136.62:5000/api/v1/queries/checkAnswer",
          { pytanie_id: this.queryquery.id, uzytkownik_odp: this.odp },
          {
            headers: {
              "Access-Control-Allow-Credentials": true,
              Authorization: "Bearer " + VueCookies.get("token"),
            },
          }
        );
        this.nowodp = false;
        this.queryquery = {
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
        };

        if (this.pytania.length == 0) {
          var response = await axios.post(
            "http://46.41.136.62:5000/api/v1/queries/continueCourse",
            "",
            {
              headers: {
                "Access-Control-Allow-Credentials": true,
                Authorization: "Bearer " + VueCookies.get("token"),
              },
            }
          );
          this.pytania = response.data.pytania;
        }
        this.getQuestionById();
      } else {
        console.log("NIE poprawna odp");
        this.nowodp = false;
        this.queryquery = {
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
        };
        if (this.pytania.length == 0) {
          response = await axios.post(
            "http://46.41.136.62:5000/api/v1/queries/continueCourse",
            "",
            {
              headers: {
                "Access-Control-Allow-Credentials": true,
                Authorization: "Bearer " + VueCookies.get("token"),
              },
            }
          );
          this.pytania = response.data.pytania;
        }
        this.getQuestionById();
      }
    },
    async getQuestionById() {
      var response = await axios.post(
        "http://46.41.136.62:5000/api/v1/queries/getQuestionById",
        { pytanie_id: this.pytania[0] },
        {
          headers: {
            "Access-Control-Allow-Credentials": true,
            Authorization: "Bearer " + VueCookies.get("token"),
          },
        }
      );
      this.queryquery = response.data.pytanie;
      this.pytania.shift();
      console.log("pobrano pytanie:");
      console.log(this.queryquery);
    },
    getImgUrl(pet) {
      var images = require.context("../assets/", false, /\.png$/);
      return images("./" + pet + ".png");
    },
  },
  computed: {
    ...mapGetters("auth", {
      getuserProfile: "getuserProfile",
    }),
  },
  async beforeCreate() {
    var response = await axios.post(
      "http://46.41.136.62:5000/api/v1/queries/continueCourse",
      "",
      {
        headers: {
          "Access-Control-Allow-Credentials": true,
          Authorization: "Bearer " + VueCookies.get("token"),
        },
      }
    );
    this.pytania = response.data.pytania;

    await this.getQuestionById(); // ponbieranie  danych danego id

    // for(var i=0; i<99; i++){
    //    axios.post(
    //       "http://127.0.0.1:5000/api/v1/queries/checkAnswer",
    //       { pytanie_id: this.queryquery.id, uzytkownik_odp: this.queryquery.poprawna_odp },
    //       {
    //         headers: {
    //           "Access-Control-Allow-Credentials": true,
    //           Authorization: "Bearer " + VueCookies.get("token"),
    //         },
    //       }
    //     )
    //     this.queryquery = {
    //       id: 0,
    //       liczba_punktow: "",
    //       media: "",
    //       nazwa_bloku: "",
    //       numer_pytania: "",
    //       odpowiedz_a: "",
    //       odpowiedz_b: "",
    //       odpowiedz_c: "",
    //       poprawna_odp: "",
    //       pytanie: "",
    //       zakres_struktury: ""}
    //     await this.getQuestionById();
    // }
  },
};
</script>
<style scoped>
.odp {
  padding-top: 17px;
  font-weight: 160px;
}

.dash {
  background-color: rgba(255, 255, 255, 0.87);
  border-radius: 1rem;
  width: 70%;
}
video, img {
  max-width: 94%;
}

.btn {
  background-color: #3c987a;
  border-color: #3c987a;
  margin: 13px;
  font-size: 30pt;
  min-width: 130px;
}

.bad {
  color: brown;
}
.good {
  color: green;
}
</style>
