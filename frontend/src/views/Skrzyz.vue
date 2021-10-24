<template>
  <div class="home d-flex justify-content-center">
    <div class="dash d-flex flex-row">
      <div id="learning-question" class="">
        <div class="row video-row">
          <div class="col-sm-9 col-md-8 col-lg-8" id="resource-holder">
            <img v-if="this.queryquery.media !== ''" alt="pod maska" :src="getImgUrl(this.queryquery.media)" />
          </div>

          <div class="col-sm-3 col-md-4 col-lg-4 text-center">
            <div class="row m-2">
              <router-link type="button" class="btn btn-warning btn-lg" to="/">
                Wróć
              </router-link>
            </div>
          </div>
        </div>

        <div class="question">
          <div class="row">
            <div class="col-xs-12 col-sm-9 col-md-8 col-lg-8 p-3">
              <h5>{{ this.queryquery.pytanie }}</h5>
            </div>
          </div>

          <div
            class="good1 odp"
            v-if="this.nowodp && this.odp === this.queryquery.poprawna_odp"
          >
            Poprawna odpowiedz
          </div>
          <div class="bad1 odp" v-else-if="this.odp !== '' && this.nowodp">
            Zła odpowiedz
          </div>
          <div class="row" v-if="this.queryquery.odpowiedz_a === ''">
            <div class="col-xs-6 col-sm-4 col-md-4 col-lg-4">
              <div
                type="button"
                class="btn btn-outline-primary btn-lg special"
                :class="{
                  good:
                    this.nowodp &&
                    this.odp === this.queryquery.poprawna_odp &&
                    this.odp === 'N',
                  bad:
                    this.nowodp &&
                    this.odp !== this.queryquery.poprawna_odp &&
                    this.odp === 'N',
                }"
                @click="odpuztfun('N')"
              >
                NIE
              </div>
            </div>
            <div class="col-xs-6 col-sm-4 col-md-4 col-lg-4">
              <div
                type="button"
                class="btn btn-outline-primary btn-lg special"
                :class="{
                  good:
                    this.nowodp &&
                    this.odp === this.queryquery.poprawna_odp &&
                    this.odp === 'T',
                  bad:
                    this.nowodp &&
                    this.odp !== this.queryquery.poprawna_odp &&
                    this.odp === 'T',
                }"
                @click="odpuztfun('T')"
              >
                TAK
              </div>
            </div>
          </div>

          <div class="row p-3" v-if="this.queryquery.odpowiedz_a !== ''">
            <div class="col-xs-12 col-sm-9 col-md-8 col-lg-8">
              <div
                type="button"
                class="btn btn-outline-primary btn-lg"
                :class="{
                  good:
                    this.nowodp &&
                    this.odp === this.queryquery.poprawna_odp &&
                    this.odp === 'A',
                  bad:
                    this.nowodp &&
                    this.odp !== this.queryquery.poprawna_odp &&
                    this.odp === 'A',
                }"
                @click="odpuztfun('A')"
              >
                A. {{ this.queryquery.odpowiedz_a }}
              </div>
            </div>
          </div>
          <div class="row p-3" v-if="this.queryquery.odpowiedz_a !== ''">
            <div class="col-xs-12 col-sm-9 col-md-8 col-lg-8">
              <div
                type="button"
                class="btn btn-outline-primary btn-lg"
                :class="{
                  good:
                    this.nowodp &&
                    this.odp === this.queryquery.poprawna_odp &&
                    this.odp === 'B',
                  bad:
                    this.nowodp &&
                    this.odp !== this.queryquery.poprawna_odp &&
                    this.odp === 'B',
                }"
                @click="odpuztfun('B')"
              >
                B. {{ this.queryquery.odpowiedz_b }}
              </div>
            </div>
          </div>
          <div class="row p-3" v-if="this.queryquery.odpowiedz_a !== '' && this.queryquery.odpowiedz_c != ''">
            <div class="col-xs-12 col-sm-9 col-md-8 col-lg-8">
              <div
                type="button"
                class="btn btn-outline-primary btn-lg"
                :class="{
                  good:
                    this.nowodp &&
                    this.odp === this.queryquery.poprawna_odp &&
                    this.odp === 'C',
                  bad:
                    this.nowodp &&
                    this.odp !== this.queryquery.poprawna_odp &&
                    this.odp === 'C',
                }"
                @click="odpuztfun('C')"
              >
                C. {{ this.queryquery.odpowiedz_c }}
              </div>
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
      odp: "asd",
      queryquery: {
        media: '',
        odpowiedz_a: "",
        odpowiedz_b: "",
        odpowiedz_c: "",
        poprawna_odp: "",
        pytanie: "Kliknij przycisk losuj",
      },
      database: [
        {
          media: 1,
          odpowiedz_a: "2, 1",
          odpowiedz_b: "1, 2",
          poprawna_odp: "A",
          pytanie: "Poprawna kolejność przejazdu przez skrzyżowanie to:",
        },
        {
          media: 1,
          odpowiedz_a: "",
          odpowiedz_b: "",
          odpowiedz_c: "",
          poprawna_odp: "T",
          pytanie: "Czy auto z numerem 1 ma pierwszeństwo przejazdu?",
        },
        {
          media: 2,
          odpowiedz_a: "1, 2, 3",
          odpowiedz_b: "3, 2, 1",
          odpowiedz_c: "2, 3, 1",
          poprawna_odp: "C",
          pytanie: "Poprawna kolejność przejazdu przez skrzyżowanie to:",
        },
        {
          media: 2,
          odpowiedz_a: "",
          odpowiedz_b: "",
          poprawna_odp: "N",
          pytanie: "Czy auto z numerem 1 ma pierwszeństwo przejazdu?",
        },
        {
          media: 3,
          odpowiedz_a: "",
          odpowiedz_b: "",
          poprawna_odp: "N",
          pytanie: "Czy auto z numerem 1 ma pierwszeństwo przejazdu?",
        },
        {
          media: 3,
          odpowiedz_a: "",
          odpowiedz_b: "",
          poprawna_odp: "T",
          pytanie: "Czy auto z numerem 3 ma pierwszeństwo przejazdu?",
        },
        {
          media: 4,
          odpowiedz_a: "1",
          odpowiedz_b: "2",
          odpowiedz_c: "3",
          poprawna_odp: "C",
          pytanie: "Które auto ma pierwszeństwo przejzadu?",
        },
        {
          media: 4,
          odpowiedz_a: "",
          odpowiedz_b: "",
          poprawna_odp: "N",
          pytanie: "Czy auto z numerem 2 ma pierwszeństwo przejazdu?",
        },
        {
          media: 5,
          odpowiedz_a: "2",
          odpowiedz_b: "1",
          poprawna_odp: "B",
          pytanie: "Które auto ma pierwszeństwo przejazdu?",
        },
        {
          media: 5,
          odpowiedz_a: "2",
          odpowiedz_b: "3",
          poprawna_odp: "A",
          pytanie: "Które auto pojedzie jako pierwsze?",
        },
        {
          media: 6,
          odpowiedz_a: "",
          odpowiedz_b: "",
          poprawna_odp: "T",
          pytanie: "Czy auto z numerem 1 może wjechać na skrzyżowanie?",
        },
        {
          media: 7,
          odpowiedz_a: "",
          odpowiedz_b: "",
          poprawna_odp: "T",
          pytanie: "Czy auto z numerem 2 ma pierwszeństwo przejazdu?",
        },
        {
          media: 7,
          odpowiedz_a: "",
          odpowiedz_b: "",
          poprawna_odp: "N",
          pytanie: "Czy auto z numerem 1 ma pierwszeństwo przejazdu?",
        },
        {
          media: 8,
          odpowiedz_a: "",
          odpowiedz_b: "",
          poprawna_odp: "T",
          pytanie: "Czy auto z numerem 2 ma pierwszeństwo przejazdu?",
        },
        {
          media: 8,
          odpowiedz_a: "",
          odpowiedz_b: "",
          poprawna_odp: "T",
          pytanie: "Czy auto z numerem 1 ma pierwszeństwo przejazdu?",
        },
        {
          media: 9,
          odpowiedz_a: "1",
          odpowiedz_b: "2",
          odpowiedz_c: "3",
          poprawna_odp: "B",
          pytanie: "Kto ma pierwszeństwo przejazdu?",
        },
        {
          media: 9,
          odpowiedz_a: "",
          odpowiedz_b: "",
          poprawna_odp: "N",
          pytanie:
            "Czy auto z numerem 1 ma pierwszeństwo przejazdu przed tramwajem?",
        },
        {
          media: 10,
          odpowiedz_a: "1",
          odpowiedz_b: "2",
          odpowiedz_c: "3",
          poprawna_odp: "C",
          pytanie: "Kto ma pierwszeństwo przejazdu?",
        },
        {
          media: 10,
          odpowiedz_a: "",
          odpowiedz_b: "",
          poprawna_odp: "N",
          pytanie:
            "Czy auto z numerem 2 ma pierwszeństwo przejazdu przed tramwajem?",
        },
        {
          media: 10,
          odpowiedz_a: "",
          odpowiedz_b: "",
          poprawna_odp: "N",
          pytanie:
            "Czy auto z numerem 1 ma pierwszeństwo przejazdu przed tramwajem?",
        },
      ],
    };
  },
  watch: {
    // call again the method if the route changes
    '$route': 'fetchData'
  },
  components: {},
  methods: {
    getImgUrl(pet) {
      var images = require.context("../assets/skrzyzowania/", false, /\.png$/);
      return images("./" + pet + ".png");
    },
    odpuztfun(data) {
      if (!this.nowodp) {
        this.odp = data;
        this.nowodp = true;
      }
    },
  },
  mounted() {
    console.log("aktuala baza pytan " + this.database.length);
    this.odp = "";
      this.nowodp = false;
      this.queryquery = this.database[this.getuserProfile.lvl];
  },
  computed: {
    ...mapGetters("auth", {
      getuserProfile: "getuserProfile",
    }),
  },
};
</script>
<style scoped>
.home {
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

.active {
  background-color: blue;
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
  .home {
    padding: 4px;
  }
  .dash {
    padding: 0px;
    width: 100%;
  }
  .special {
    margin: 10px;
    text-align: center;
  }
}
</style>
