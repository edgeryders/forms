<template>
  <div class="modal" :class="{ exitModal: exit }">

      <vue-headful
            :title="'Edgeryders | ' + data.title"
            :description="data.description"
        />
      
      <div class="header" :style="{ background: data.background['splash'] }">
        <div class="nav">
          <div class="home" @click='close'><h1> {{ data.title }}</h1></div>
          <div class="social">
            <a :href="link.twitter" target="_blank" class="twitter"></a>
            <a :href="link.facebook" target="_blank" class="facebook"></a>
                <div class="url" @click="copy" >
                  <textarea readonly rows='1' oninput='this.style.height = "";this.style.height = this.scrollHeight + "px"' ref="text">{{this.link.url}}</textarea>
                </div>
               <div class="copied" :class="{ active : copied }"><p>copied to clipboard!</p></div>

          </div>
        </div>
         
          <a class="link" target="_blank" v-if='link.website' :href='link.website.url'>go to {{ link.website.name }} </a>
      </div>

    <full-page ref="fullpage" :options="options" id="fullpage">
       
      <div class="section" v-for="entry in data.splash">

        <div class="flex container flex-col w-full justify-center items-center" id="element1">
          <div class="splash" v-html="entry.text"></div>
          <button :style="{ background: data.background['splash'] }" @click="$refs.fullpage.api.moveSectionDown()">
            Continue
          </button>
        </div>
      </div>
      <div class="section" v-for="entry in data.questions">
        <div
          class="entry flex flex-col w-full pt-0 mt-0 justify-center items-center bg-gray-200"  :class="{ split: entry.type == 'box' }"
        >
      
            <div class="question px-4 md:px-0" >

              <h3 class="text-2xl md:px-40 md:text-3xl">{{ entry.question }}</h3>

              <p class="mt-4" v-if="entry.small">* {{ entry.small }}</p>
            </div>

            <div class="answer">
              <div v-if="entry.type == 'email'">
                <input v-model="response" v-on:keyup.enter="answer(entry.id)" value="enter your email" :placeholder='questionnaire[entry.id]'></input>
              </div>

              <div v-if="entry.type == 'box'" class="box">
                <textarea
                  v-model="response"
                  class="h-full w-full"
                  value="enter your answer here"
                  :placeholder='questionnaire[entry.id]'
                ></textarea>

                        <transition name="fade">
                  <button class="next" v-if="response != null" :style="{ background: data.background['splash'] }" @click="answer(entry.id)">
                    Next
                  </button>
                </transition>
              </div>

              <div v-if="entry.type == 'text'">
                <input v-model="response" v-on:keyup.enter="answer(entry.id)" value="enter your answer here" :placeholder='questionnaire[entry.id]' />
              </div>
            </div>

            <transition name="fade" v-if="entry.type !== 'box'">
              <button class="next" v-if="response != null" :style="{ background: data.background['splash'] }" @click="answer(entry.id)">
                Next
              </button>
            </transition>

          </div>
      
      </div>

      <div class="section">

                <div class="entry submit flex flex-col w-full pt-0 mt-0 justify-center items-center bg-gray-200" id="element1">


        <div class="confirm" v-html="data.confirm.text"></div>

              <button
                class="submit"
                @click="submitForm"
                :style="{ backgroundColor: data.background['splash'] }"
              >
                Submit
              </button>

              <div class="success bg-gray-200" v-if="submitAnswers" @click="submitForm">
      <div class="checkmark svg">
        <svg
          version="1.1"
          id="tick"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          x="0px"
          y="0px"
          viewBox="0 0 37 37"
          style="enable-background:new 0 0 37 37;"
          xml:space="preserve"
        >
          <path
            class="circ path"
            style="fill:#10c170;stroke:RGBA(14, 176, 103, 1.00);stroke-width:3;stroke-linejoin:round;stroke-miterlimit:10;"
            d="
        M30.5,6.5L30.5,6.5c6.6,6.6,6.6,17.4,0,24l0,0c-6.6,6.6-17.4,6.6-24,0l0,0c-6.6-6.6-6.6-17.4,0-24l0,0C13.1-0.2,23.9-0.2,30.5,6.5z"
          />
          <polyline
            class="tick path"
            style="fill:none;stroke:#fff;stroke-width:3;stroke-linejoin:round;stroke-miterlimit:10;"
            points="
        11.6,20 15.9,24.2 26.4,13.8 "
          />
        </svg>
      </div>
      <h3 class="text-2xl mx-6 md:mx-40 font-display">
        Your form has been succesfully submitted. Check your inbox for a
        response very soon!
      </h3>
    </div>

    </div>

      </div>

    </full-page>

    <div class="navigation">

      <div class="arrow down" :style="{ backgroundColor: data.background['splash'] }" @click="down()"></div>
       <div class="arrow up" :style="{ backgroundColor: data.background['splash'] }" @click="up()"></div>
       <div class="progress" >
           <div class="percentage" :style="{ width: progress + '%', backgroundColor: data.background['splash'] }">
              </div>
                  <p class="font-body" :class="{ light: half }">
                  {{ progress.toString().substring(0, 3)}}%
                </p>
          </div>

    </div>

  </div>
</template>

<script>
import data from "@/data/demo";
import axios from "axios";

export default {
  data() {
    return {
      options: {
        sectionsColor: ["#EDF2F7", "#ff5f45", "#0798ec"],
        verticalCentered: false,
        normalScrollElements: "#element1, .split"
      },
      response: null,
      questionnaire: null,
      currentQuestionIndex: 0,
      exit: false,
      submitAnswers: false,
      answered: [],
      copied: false,
      link: {
        facebook: null,
        twitter: null,
        url: null,
        website: null
      }
    };
  },
  props: ["data"],
  components: {},
  methods: {
    submitForm() {
      this.submitAnswers = true;
      const formdata = {
        records: [
          {
            fields: {
              Name: this.questionnaire.name,
              Email: this.questionnaire.email,
              Languages: this.questionnaire.languages,
              City: this.questionnaire.city,
              Biography: this.questionnaire.bio
            }
          }
        ]
      };

      let airtable =
        "https://api.airtable.com/v0/appSsObHW2QODf3jA/" + this.data.id;

      let axiosConfig = {
        headers: {
          Authorization: "Bearer keyocggSHfh6E9gSg",
          "Content-Type": "application/json"
        }
      };
      var self = this;

      axios
        .post(airtable, formdata, axiosConfig)
        .then(function(response) {
          // handle success
          console.log("success");

          setTimeout(function() {
            self.close();
          }, 2000);
        })
        .catch(function(error) {
          // handle error
          console.log(error);
        });
    },
    answer(questionId) {
      this.questionnaire[questionId] = this.response;

      if (!this.answered.includes(questionId)) {
        this.answered.push(questionId);
      }

      this.$refs.fullpage.api.moveSectionDown();
      this.response = null;
    },
    down() {
      this.$refs.fullpage.api.moveSectionDown();
    },
    up() {
      this.$refs.fullpage.api.moveSectionUp();
    },
    close() {
      this.exit = true;
      var self = this;
      setTimeout(function() {
        self.exit = false;
        self.$emit("close");
      }, 200);
    },
    copy() {
      this.$refs.text.select();
      const link = "http://forms.edgeryders.eu/" + this.$refs.text.select();

      document.execCommand("copy");
      this.copied = true;
      setTimeout(() => (this.copied = false), 2000);
    }
  },
  computed: {
    progress() {
      return (this.answered.length / this.data.questions.length) * 100;
    },
    half() {
      if (this.progress > 49) {
        return true;
      }
    }
  },
  mounted: function() {
    var questions = {};

    this.data.questions.forEach(function(entry) {
      questions[entry.id] = "";
    });

    this.questionnaire = questions;

    var weburl = "https://forms.edgeryders.eu/" + this.data.slug;

    this.link.url = weburl;

    this.link.facebook =
      "https://www.facebook.com/sharer/sharer.php?u=" + weburl;

    if (this.data.description) {
      this.link.twitter =
        "https://twitter.com/intent/tweet?text=" +
        this.data.description +
        "&url=" +
        weburl;
    } else {
      this.link.twitter =
        "https://twitter.com/intent/tweet?text=Sign%20up%20for%20the%20" +
        this.data.title +
        " -%20Edgeryders&url=" +
        weburl;
    }

    if (this.data.link) {
      this.link.website = {
        name: this.data.link.name,
        url: this.data.link.url
      };
    }
  }
};
</script>

<style lang="scss" scoped>
@keyframes animate-stripes {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: 60px 0;
  }
}

@keyframes fadeIn {
  from,
  20%,
  40%,
  60%,
  80%,
  to {
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  }

  0% {
    opacity: 0;
    transform: scale3d(0.2, 0.2, 0.2) translateY(20px);
  }

  to {
    opacity: 1;
    transform: scale3d(1, 1, 1) translateY(0px);
  }
}

@keyframes fadeOut {
  to {
    opacity: 0;
    transform: scale3d(0, 0, 0) translateY(20px);
  }
}

@keyframes slideup {
  30% {
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes fadein {
  100% {
    opacity: 1;
  }
}

@keyframes checkmark {
  100% {
    stroke-dashoffset: 0;
    opacity: 1;
  }
}

@keyframes tick {
  100% {
    stroke-dashoffset: 0;
  }
}

.fade-enter-active {
  transition: all 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(-20px);
}

.modal {
  height: 100vh !important;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  animation: fadeIn 0.8s forwards ease-out;
}

.exitModal {
  animation: fadeOut 0.4s forwards ease-out;
  opacity: 1;
}

.section {
  width: 100vw;
  display: flex;
  justify-content: center;
}

.header {
  position: fixed;
  top: 0;
  z-index: 99;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.8);
  height: 70px;
  width: 100%;
  .nav {
    width: auto;
    position: absolute;
    display: flex;
    left: 0;
    top: 0;
    height: 100%;
  }
  .home {
    background: url("data:image/svg+xml,%3Csvg viewBox='0 0 500 500' version='1' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill='none' stroke='white' stroke-width='10' d='M0 250a250 250 0 1 1 500 0 250 250 0 0 1-500 0zm250 183V250H67a183 183 0 1 1 183 183z' fill-rule='evenodd'/%3E%3C/svg%3E")
      no-repeat 20px 53%;
    background-size: 31px;
    display: flex;
    justify-content: start;
    align-items: center;
    width: auto;
    height: 100%;
    padding-left: 65px;
    &:hover {
      cursor: pointer;
    }
    h1 {
      color: white;
      font-weight: bold;
      letter-spacing: -0px;
      font-weight: 100;
      font-size: 1.3rem;
      font-family: "Ubuntu Mono" !important;
    }
  }
  h2 {
    color: white;
    font-weight: bold;
    font-size: 1.6rem;
  }

  .social {
    float: left;
    width: auto;
    display: flex;
    height: 70%;
    padding-left: 20px;
    margin-left: 20px;
    margin-top: 10px;
    border-left: 1px solid rgba(255, 255, 255, 0.2);
    a.twitter {
      background: url("data:image/svg+xml,%3Csvg aria-hidden='true' data-prefix='fab' data-icon='twitter' class='svg-inline--fa fa-twitter fa-w-16' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'%3E%3Cpath fill='%23fff' d='M459 152l1 13c0 139-106 299-299 299-59 0-115-17-161-47a217 217 0 00156-44c-47-1-85-31-98-72l19 1c10 0 19-1 28-3-48-10-84-52-84-103v-2c14 8 30 13 47 14A105 105 0 0136 67c51 64 129 106 216 110-2-8-2-16-2-24a105 105 0 01181-72c24-4 47-13 67-25-8 24-25 45-46 58 21-3 41-8 60-17-14 21-32 40-53 55z'/%3E%3C/svg%3E")
        no-repeat 1px 11px;
      background-size: 28px;
      width: 40px;
      display: block;
      height: 100%;
      margin-right: 7px;
    }
    a.facebook {
      background: url("data:image/svg+xml,%3Csvg aria-hidden='true' data-prefix='fab' data-icon='facebook' class='svg-inline--fa fa-facebook fa-w-16' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'%3E%3Cpath fill='%23fff' d='M504 256a248 248 0 10-287 245V328h-63v-72h63v-55c0-62 37-96 94-96 27 0 55 5 55 5v61h-31c-31 0-40 19-40 38v47h69l-11 72h-58v173a248 248 0 00209-245z'/%3E%3C/svg%3E")
        no-repeat 0 10px;
      background-size: 28px;
      width: 40px;
      display: block;
      height: 100%;
      margin-right: 6px;
    }
    .url {
      background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 10 12.5' fill-rule='evenodd' clip-rule='evenodd' shape-rendering='geometricPrecision' text-rendering='geometricPrecision' image-rendering='optimizeQuality'%3E%3Cpath fill='%23fff' d='M5 0a5 5 0 110 10A5 5 0 015 0zm1.7 4.6A.3.3 0 107 5l.2-.2c.6-.6.6-1.5 0-2.1-.6-.6-1.5-.6-2 0l-1 1c-.6.5-.6 1.4 0 2a.3.3 0 10.4-.4.9.9 0 010-1.3l1-.9c.3-.3.9-.3 1.2 0 .3.4.3 1 0 1.3l-.2.2zm-3.4.8A.3.3 0 003 5l-.2.2c-.6.6-.6 1.5 0 2.1.6.6 1.5.6 2 0l1-1c.6-.5.6-1.4 0-2a.3.3 0 10-.4.4c.3.4.3 1 0 1.3l-1 .9c-.3.3-.8.3-1.2 0a.9.9 0 010-1.3l.2-.2z'/%3E%3C/svg%3E")
        no-repeat 0 10px;
      background-size: 28.5px;
      width: 40px;
      display: block;
      transition: all 1s ease;
      height: 100%;
      position: relative;
      &:hover {
        cursor: pointer;
      }
      textarea {
        width: 1px !important;
        display: block;
        position: absolute;
        padding: 0 !important;
        height: 0px !important;
        overflow: hidden;
        opacity: 0;
        top: -220px;
      }
    }
    .copied {
      position: relative;
      padding: 3px 10px;
      font-size: 0.7rem !important;
      height: 29.7px;
      left: 0px;
      color: white;
      top: 9px;
      p {
        position: absolute;
        max-width: 0px;
        border-left: 0.5px solid rgba(255, 255, 255, 0.3);
        opacity: 0;
        left: 0;
        white-space: nowrap;
        overflow: hidden;
        transition: all 1s ease;
        padding: 5px 10px;
      }
      &.active {
        p {
          opacity: 1;
          max-width: 200px;
        }
      }
    }
  }
  .link {
    position: absolute;
    right: 20px;
    color: white;
    font-family: "Ubuntu";
    font-weight: 100;
    background-size: 14px !important;
    background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 84.3 103.9'%3E%3Cpath fill='%23fff' d='M79 83H0V5h47v4H4v70h71V36h4v47z'/%3E%3Cpath fill='%23fff' d='M53 0v4h24L38 43l3 3L80 7v24h4V0H53z'/%3E%3C/svg%3E")
      100% 5px no-repeat;
    padding-right: 25px;
  }
}
.navigation {
  background: rgba(255, 255, 255, 0.4);
  color: white;
  width: 30%;
  overflow: hidden;
  height: 50px;
  position: fixed;
  display: flex;
  align-items: stretch;
  bottom: 20px;
  right: 40px;
  border-radius: 10px;
  .arrow {
    background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 125'%3E%3Cswitch%3E%3Cg%3E%3Cpath fill='%23fff' d='M2.5 31.3c0-2.6 1-5.1 2.9-7.1a10 10 0 0114.2 0L50 54.5l30.4-30.4a10 10 0 0114.2 0 10 10 0 010 14.2L57.1 75.8c-1.9 1.9-4.4 2.9-7.1 2.9s-5.2-1.1-7.1-2.9L5.4 38.4c-1.9-2-2.9-4.6-2.9-7.1z'/%3E%3C/g%3E%3C/switch%3E%3C/svg%3E")
      no-repeat rgba(0, 0, 0, 0.3);
    width: 60px;
    background-size: 21px;
    background-position: center 63%;
    float: left;
    &.up {
      transform: rotate(180deg);
      border-right: 1px solid rgba(255, 255, 255, 0.19);
    }
    &:hover {
      cursor: pointer;
    }
    &:active {
      background-color: rgba(0, 0, 0, 0.4);
    }
  }
  .progress {
    width: 100%;
    position: relative;
    background: #ddd;
    display: flex;
    justify-content: center;
    align-items: center;
    .percentage {
      position: absolute;
      flex: 1;
      left: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
      background-color: #1bacc0;
      background-size: 30px 30px;
      background-image: linear-gradient(
        135deg,
        rgba($color: #fff, $alpha: 0.15) 25%,
        transparent 25%,
        transparent 50%,
        rgba($color: #fff, $alpha: 0.15) 50%,
        rgba($color: #fff, $alpha: 0.15) 75%,
        transparent 75%,
        transparent
      );
      animation: animate-stripes 3s linear infinite;
      transition: width 1s ease-out;
    }
    p {
      position: relative;
      font-weight: bold;
      color: rgba(0, 0, 0, 0.4);
      &.light {
        color: white;
      }
    }
  }
}

.splash {
  width: 80%;
  margin-top: 2rem;
  /deep/ h1 {
    font-size: 1.7rem !important;
    margin-bottom: 1.5rem;
    font-family: "Ubuntu";
    font-weight: bold;
    padding-bottom: 1rem;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  }
  /deep/ p {
    font-size: 1.4rem !important;
    margin-bottom: 1.5rem;
    font-weight: 100;
  }
}

.split {
  display: flex;
  flex-direction: row;
  height: 100vh;
  padding-top: 5rem;
  margin-bottom: 2rem;
  .question {
    width: 50%;
    padding: 1rem 0 0 0;
    height: 80%;
    border-right: 1px solid #ddd;
    h3 {
      font-size: 1.2rem;
      padding: 0 4rem;
      text-align: left;
    }
  }
  .answer {
    padding: 0.2rem 3rem;
    width: 50%;
    display: flex;
    height: 80%;
    flex-direction: column;
    justify-content: start;
    .box {
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: start;
      margin-bottom: 0rem !important;
      textarea {
        width: 100% !important;
        height: 70%;
        margin: 1rem 0 0 0 !important;
      }
      button {
        align-self: flex-start;
        margin: 1.4rem 0 0 0;
      }
    }
  }
}

.confirm {
  width: 87%;
  margin: 6rem auto 1.5rem;
  font-size: 1.5rem !important;
}

.submit {
  position: relative;
}
.success {
  position: absolute;
  left: 0;
  top: 100px;
  height: 100%;
  animation: fadein 0.3s ease forwards 0s;
  width: 100%;
  opacity: 0;
  display: flex;
  justify-content: center;
  flex-direction: column;
  h3 {
    animation: slideup 1.8s ease forwards 0.2s;
    transform: translateY(80px);
    opacity: 0;
    width: 50%;
    margin: 0 auto;
    line-height: 2.1rem;
  }
  .checkmark {
    width: 100px;
    height: 100px;
    margin: -200px auto 20px;
    transform: translateY(180px);
    opacity: 0;
    animation: slideup 1s ease forwards 0.1s;
  }
}

.circ {
  opacity: 0;
  stroke-dasharray: 130;
  stroke-dashoffset: 130;
  animation: checkmark 0.9s 0.3s ease-out forwards;
}
.tick {
  stroke-dasharray: 50;
  stroke-dashoffset: 50;
  animation: tick 1s 0.8s ease-out forwards;
}

button {
  background-color: #1bacc0;
  color: white;
  padding: 10px 30px !important;
  border-radius: 20px;
  font-weight: bold;
  &.submit {
    background-color: #00acc2;
    color: white;
    border: none;
    margin-top: 2rem;
  }
  &.next {
    &:active {
      background-color: #1aa4b8;
    }
  }
}
textarea {
  padding: 10px 14px !important;
  border-radius: 10px;
  background: white;
  font-size: 1.2rem !important;
  min-height: 10rem;
  width: 60% !important;
  margin: 2rem 0 !important;
}
input {
  padding: 10px 14px !important;
  border-radius: 10px;
  background: white;
  font-size: 1.4rem !important;
  margin: 2rem 0 !important;
  width: 100%;
}

@media (max-width: 500px) {
  .header .social,
  .home h1 {
    display: none;
  }
  .header {
    .home {
      background: url("data:image/svg+xml,%3Csvg viewBox='0 0 500 500' version='1' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill='white' d='M0 250a250 250 0 1 1 500 0 250 250 0 0 1-500 0zm250 183V250H67a183 183 0 1 1 183 183z' fill-rule='evenodd'/%3E%3C/svg%3E")
        no-repeat 15px center;
      background-size: 40px;
      justify-content: center;
      padding-left: 0px;
      width: 100vw;
      h1 {
        font-size: 1.75rem;
      }
    }
  }
  #fullpage {
    margin-top: 0px;
    .section {
      .container {
        width: 100%;
        padding: 0 !important;
        height: 78vh;
        display: block;
        text-align: center !important;
        overflow: scroll;
        .splash {
          text-align: center !important;
          margin: 6rem auto 0rem;
          width: 87%;
          /deep/ h1 {
            font-size: 1.5rem !important;
            letter-spacing: -1px;
          }
          /deep/ p {
            font-size: 1.3rem !important;
            letter-spacing: -0.3px;
          }
        }
        button {
          margin: 0px 0 30px;
        }
      }
      .entry {
        height: 100vh;

        .answer {
          margin-top: 0 !important;
        }
        input {
          width: 80%;
          margin: 1rem 0 1.5rem !important;
        }
        .question {
          margin-top: -2.5rem;
        }
        button {
          align-self: flex-start;
          margin: 0 auto;
        }
      }

      .split {
        overflow: scroll;
        width: 100%;
        padding: 60px 0 140px !important;
        display: block;
        .question {
          width: 100%;
          height: auto;
          padding: 0 0 1.5rem;
          border-right: none;
          margin-top: 2.5rem;
          h3 {
            font-size: 1.2rem;
            padding: 0 2rem;
            text-align: left;
          }
        }
        .answer {
          padding: 0rem 2rem !important;
          margin-bottom: 1rem;
          width: 100%;
          display: block;

          .box {
            flex-grow: 1;
            flex: 1;
            margin: 0rem !important;
            padding: 0;
            textarea {
              width: 100% !important;
              margin: 0 0 2rem 0 !important;
              border-radius: 0 !important;
            }
          }
        }
      }
    }
  }
  .navigation {
    background: rgba(255, 255, 255, 0.4);
    width: 100% !important;
    bottom: 70px;
    right: 0px;
    border-radius: 0px;
    .arrow {
      background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 125'%3E%3Cswitch%3E%3Cg%3E%3Cpath fill='%23fff' d='M2.5 31.3c0-2.6 1-5.1 2.9-7.1a10 10 0 0114.2 0L50 54.5l30.4-30.4a10 10 0 0114.2 0 10 10 0 010 14.2L57.1 75.8c-1.9 1.9-4.4 2.9-7.1 2.9s-5.2-1.1-7.1-2.9L5.4 38.4c-1.9-2-2.9-4.6-2.9-7.1z'/%3E%3C/g%3E%3C/switch%3E%3C/svg%3E")
        no-repeat;
      width: 60px;
      background-size: 21px;
      background-position: center 63%;
      float: left;
    }
  }
  .confirm {
    width: 87%;
    margin: -3rem auto 1.5rem;
    font-size: 1.2rem !important;
  }
  .success {
    top: 70px !important;
    h3 {
      width: 90% !important;
      font-size: 1.4rem;
    }
  }
}
</style>
