<template>
  <div id="a">
    <div class="map">
        <img src="../assets/autoLvl0.png" />
        <a style="top:300px; left:350px; height:23px; width:27px" @click="test" title="Booth 64" />
    </div>
  </div>
</template>
<script>
export default {
  name: "VirtualCar",
  data() {
    return {};
  },
  methods: {
      test(){
          alert(1)
      },
  },
  mounted() {},
};
</script>

<style scoped>
.map {
    position: relative;
}
.map a{
    position: absolute;
    display: block;
    background: black;
    opacity: 0;
}
.map a:hover{
    opacity: 0.7;
}

</style>