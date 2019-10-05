<template>
  <div class="home">
  	
       <vue-headful
            title="Edgeryders | Forms"
            description="Welcome to Edgeryders."
        />
    <Home />
  </div>
</template>

<script>
// @ is an alias to /src
import Home from "@/components/Home.vue";

export default {
  name: "home",
  components: {
    Home
  }
};
</script>
