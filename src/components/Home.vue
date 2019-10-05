<template>
  <div id="app">
    <vue-headful
      title="Edgeryders | Forms"
      description="Welcome to Edgeryders."
    />

    <div class="flex flex-wrap w-full md:px-20 md:mt-20 font-bold text-white tracking-tighter m-auto">
      <h1 class="title text-xl px-3 py-2 pb-2">/forms</h1>
    </div>

    <div class="flex flex-wrap w-full md:px-20 md:mt-10 m-auto">
      <div
        class="form w-full h-48 md:h-56 md:w-1/3 rounded-lg md:pr-8"
        v-for="form in forms"
        @click="openForm(form.slug)"
      >
        <div
          class="thumbnail h-full px-5 flex flex-col justify-center items-start text-white shadow-md"
          v-if="form.background"
          :style="{ background: form.background['splash'] }"
        >
          <h2 class="w-full text-lg text-left pb-2">{{ form.title }}</h2>
          <p class="text-sm text-left rounded-sm px-2 py-1 mt-3">{{ form.questions.length }} Questions</p>
        </div>
        <div class="thumbnail" v-else>
          <h2>{{ form.title }}</h2>
          <p>{{ form.questions.length }} Questions</p>
        </div>
      </div>
    </div>

    <Form v-if="modal" :data="formData" :open="modal" @close="closeForm()" />
  </div>
</template>

<script>
import Form from "@/components/Form";
import data from "@/data/demo";

export default {
  data() {
    return {
      forms: data,
      modal: false,
      formData: null
    };
  },
  components: {
    Form
  },
  methods: {
    openForm(value) {
      this.formData = this.forms[value];
      this.modal = !this.modal;
      this.$router.push("/" + this.forms[value].slug);
    },
    closeForm() {
      this.modal = !this.modal;
      this.$router.push("/");
    },
    complete(data) {
      // Send to database here
      console.log("Form complete", data.map(d => d.question + ": " + d.answer));
    }
  },
  mounted: function() {
    var current = this.$route.path.toString().substring(1);
    if (this.forms[current] != null) {
      this.formData = this.forms[current];
      this.modal = !this.modal;
    }
  }
};
</script>

<style lang="scss" scoped>
html,
body {
  height: 100%;
}

#app {
  height: 100%;
}

.title {
  padding-left: 33px;
  font-size: 1.2rem !important;
  background: url("data:image/svg+xml,%3Csvg viewBox='0 0 500 500' version='1' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill='%23fff' d='M0 250a250 250 0 1 1 500 0 250 250 0 0 1-500 0zm250 183V250H67a183 183 0 1 1 183 183z' fill-rule='evenodd'/%3E%3C/svg%3E")
    no-repeat 10px 50% orangered;
  background-size: 20px;
  font-family: "Ubuntu Mono";
}

.thumbnail {
  font-family: "Ubuntu Mono", monospace;
  &:hover {
    cursor: pointer;
  }
  h2 {
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  }
  p {
    border: 1px solid rgba(255, 255, 255, 0.2);
  }
}


</style>
