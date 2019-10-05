<template>
  <div class="home">
    <Now />
  </div>
</template>

<script>
// @ is an alias to /src
import Now from "@/components/Now.vue";

export default {
  name: "now",
  components: {
    Now
  }
};
</script>
