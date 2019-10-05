<template>
  <div id="app">

    <div class="nav flex w-full justify-start items-center m-auto">
       <h1 class="title text-2xl">now </h1>
       <h1 class="no-title text-2xl">Current</h1>
             <h1 class="no-title text-2xl">Articles</h1>
      <h1 class="no-title text-2xl">Podcast</h1>
      <h1 class="no-title text-2xl">Video</h1>

      <h1 class="no-title text-2xl">Campaigns</h1>
      <h1 class="no-title text-2xl">Academy</h1>
             <h1 class="no-title text-2xl">Forms</h1>

    </div>

    <div class="flex flex-wrap w-full px-20 mt-40 m-auto">
          <h1 class="text-4xl mx-4 forms">Forms</h1>
</div>

    <div class="flex flex-wrap w-full px-20 mt-10 m-auto">


    <div class="form w-1/3 rounded-lg px-4" v-for='form in forms' @click='openForm(form.id)'>
      <div class="thumbnail" v-if='form.background' :style="{ background: form.background['splash'] }">
      <h2>{{ form.title }}</h2>
      <p :style="{ color: form.background['splash'] }">{{ form.questions.length }} Questions</p>
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
      formData: null,
      
    };
  },
  components: {
    Form
  },
  methods: {
    openForm(value) {
      this.formData = this.forms[value];
      this.modal = !this.modal;
      this.$router.push('/' + this.formData.id)
    },
    closeForm() {
      this.modal = !this.modal;
      this.$router.push('/')
    },
    complete(data) {
      // Send to database here
      console.log("Form complete", data.map(d => d.question + ': ' + d.answer));
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
@import url('https://fonts.googleapis.com/css?family=Cousine|Inconsolata|Ubuntu|Major+Mono+Display|PT+Mono|Share+Tech+Mono|Ubuntu+Mono&display=swap');



html,
body {
  height: 100%;
}

.form {
  height: 300px;
}

.nav {
position: absolute;
top: 0;
height: 70px;
background: rgba(0,0,0,0.04);
}

h1.forms {
    font-size: 3rem;
 font-family: 'Ubuntu', monospace;

}

h1.title {
    background: url("data:image/svg+xml,%3Csvg viewBox='0 0 500 500' version='1' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill='white' d='M0 250a250 250 0 1 1 500 0 250 250 0 0 1-500 0zm250 183V250H67a183 183 0 1 1 183 183z' fill-rule='evenodd'/%3E%3C/svg%3E") no-repeat 10px 18px orangered;
      background-size: 35px;
color: white;
  width: auto;
  font-size: 1.5rem;
  text-align: left;
height: 100%;
display: flex;
align-items: center;
  padding-left: 55px;
  padding-right: 20px;
  font-weight: 100;

font-family: 'Inconsolata', monospace;
font-family: 'Ubuntu Mono', monospace;
}

h1.no-title {
  display: flex;
align-items: center;
padding: 10px 20px;
color: rgba(0,0,0,0.3);
margin-left: 0px;
padding-top: 10px;
border-left: .5px solid rgba(0,0,0,0.08);
  width: auto;
  height: 100%;
  font-size: 1.3rem;
  text-align: left;
  background-size: 35px;
    font-family: 'Ubuntu' !important;
    font-family: 'Cousine', monospace;

}

.thumbnail {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  font-weight: bold;
  color: white;
  padding: 20px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
  border-radius: 0px;
  &:hover {
  cursor: pointer
}
  h2 {
  font-size: 1.2rem;
  padding-bottom: 5px;
  width: 100%;
  text-align: left;
  font-family: 'Ubuntu', monospace;

  border-bottom: 1px solid rgba(255,255,255,0.2);
}
p {
  text-align: left !important;
  border-radius: 4px;
  font-size: 1.2rem;
  padding: 7px 12px;
  margin-top: 14px;
  background: rgba(255,255,255,0.7);
}
}

#app {
  height: 100%;
}
</style>
