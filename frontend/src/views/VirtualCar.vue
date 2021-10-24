<template>
  <div class="home">

    <div class="d-flex justify-content-center">
      <div class="pabs">
        <div @click="Rotation(-1)" class="button">Obróć w Lewo</div>
        <div @click="Rotation(1)" class="button">Obróć W Prawo</div>
        <div @click="(cofnij())" class="button">Cofnij</div>
      </div>
      <div class="dash text-center">
        <div id="a">
          <div class="map">
            <img alt="zdj car" :class="{trans: transf}" :src="getImgUrl(imgstr)" id="image" />
            <div v-if="rotation == 1 && wheractual != 1" @click="clickusr(1)" class="aa" style="top: 46%; left: 32%; width: 38%; height: 23%;" title="MASKA"></div>
            <div  v-if="rotation == 4 && wheractual != 2" @click="clickusr(2)" class="aa" style="top: 56%; left: 77%; width: 4%; height: 6%;" title="KIERUNKOWSKAZ"></div>
            <div v-if="rotation == 2 && (wheractual != 2 && wheractual != 5)" @click="transf = true, clickusr(2)" class="aa" style="top: 54%; left: 23%; width: 4%; height: 6%;" title="KIERUNKOWSKAZ"></div>
            <div v-if="rotation == 2 && (wheractual != 5 && wheractual != 2)" @click="clickusr(5)" class="aa" style="top: 27%; left: 28%; width: 28%; height: 46%;" title="WEJDZ"></div>
            <div v-if="rotation == 3 && wheractual != 3" @click="clickusr(3)" class="aa" style="top: 16%; left: 44%; width: 10%; height: 6%;" title="STOP"></div>
            <div v-if="rotation == 3 && wheractual != 4" @click="clickusr(4)" class="aa" style="top: 43%; left: 23%; width: 5%; height: 21%;" title="LAMPA"></div>
            <div v-if="rotation == 3 && wheractual != 4" @click="transf = true, clickusr(4)" class="aa" style="top: 43%; left: 70%; width: 5%; height: 21%;" title="LAMPA"></div>
          </div>
        </div>
      </div>
      
    </div>
    
  </div>
</template>
<script>

// 1 maska 
// 2 kierunkowskaz
// 3 lampa hamowania gorna 
// 4 tylna lampa
// 5 DOR

export default {
  name: "VirtualCar",
  data() {
    return {
      rotation: 1,
      imgstr: "AUTOF",
      wheractual: 0,
      transf: false,
      time: 500,
    };
  },
  methods: {
    Rotation(rte) {
      this.transf = false
      this.wheractual = 0
      if (this.rotation == 4 && rte > 0) this.rotation = 0;
      if (this.rotation == 1 && rte < 0) this.rotation = 5;
      this.rotation = this.rotation + rte;

      switch (this.rotation) {
        case 1: 
          this.imgstr = "AUTOF"
        break
        case 2: 
          this.imgstr = "AUTOL"
        break
        case 3: 
          this.imgstr = "AUTOB"
          break
        case 4: 
          this.imgstr = "AUTOR"
          break
      }
     
      console.log(this.rotation);
    },
    async changerpgoto(){
        for(let i=0; i<7; i++)
        {
          await this.sleep(2000)
          this.imgstr = i
        }
    },
    async clickusr(wat){     
      if(wat == 1 && this.rotation == 1){
        this.wheractual = wat
        this.imgstr = "ENGINEUF"
        await this.sleep(this.time)
        this.imgstr = "ENGINE"
        await this.sleep(this.time)
        this.imgstr = "ENGINEF"
      } else if(wat == 2 && (this.rotation == 4 || this.rotation == 2)){
        this.wheractual = wat
        this.imgstr = "MIG"
      }else if(wat == 3 && this.rotation == 3){
        this.wheractual = wat
        this.imgstr = "STOP"
      }
      else if(wat == 4 && this.rotation == 3){
        this.wheractual = wat
        this.imgstr = "LAMP"
      }
      else if(wat == 5 && this.rotation == 2){
        this.wheractual = wat
        this.imgstr = "OPENDOR"
        await this.sleep(this.time)
        this.imgstr = "OPENDORF"
        await this.sleep(this.time)
        this.imgstr = "OPENIN"
        await this.sleep(this.time)
        this.imgstr = "INCAR"
        await this.sleep(this.time)
        this.imgstr = "0"
        this.changerpgoto()
      }

      console.log(wat)
    },
    async cofnij(){ 
      this.transf = false
       if(this.wheractual == 1 && this.rotation == 1){
        this.imgstr = "ENGINEF"
        await this.sleep(this.time)
        this.imgstr = "ENGINE"
        await this.sleep(this.time)
        this.imgstr = "ENGINEUF"
        await this.sleep(this.time)
       }else if(this.wheractual == 5 && this.rotation == 2){
        this.imgstr = "0"
        await this.sleep(this.time)
        this.imgstr = "INCAR"
        await this.sleep(this.time)
        this.imgstr = "OPENIN"
        await this.sleep(this.time)
        this.imgstr = "OPENDORF"
        await this.sleep(this.time)
        this.imgstr = "OPENDOR"
       }
       this.wheractual = 0
      this.Rotation(0)
    },
    getImgUrl(pet) {
      var images = require.context("../assets/car/CAR/", false, /\.jpg$/);
      return images("./" + pet + ".jpg");
    },
    sleep(ms) {
      return new Promise((resolve) => {
        setTimeout(resolve, ms);
      });
    },
  },
  mounted() {
  },
};
</script>

<style scoped>
.map {
  position: relative;
}

.pabs {
  position: absolute;
}
.map .aa {
  position: absolute;
  display: block;
}
.map .aa:hover {
  background: white;
  opacity: 0.7;
  cursor: pointer;
}
.trans{
  transform: scaleX(-1);
}

.button {
  background: white;
  border-radius: 0.1rem;
  padding: 10px;
  float: left;
  margin: 3px;
}
.button:hover {
  opacity: 0.7;
  cursor: pointer;
}
img {
  max-width: 100%;
}

.dash {
  border-radius: 1rem;
  width: 70%;
  padding: 48px;
}

@media (max-width: 575px) {
  .dash {
  width: 100%;
  margin: 4px;
  padding: 0px;
  padding-top: 55px;
  }
}
</style>