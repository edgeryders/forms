<template>
  <div class="form">
    <div class="form_container form_intro">
      <vue-headful
        :title="'Edgeryders | ' + form.config.title"
        :description="form.config.text"
      />
      <div class="introduction">
        <div class="logos" v-if="form.config.logos">
          <div class="logo" v-for="(item, index) in form.config.logos">
            <a
              href="https://edgeryders.eu"
              v-if="item.image == 'edgeryders'"
              target="_blank"
            >
              <svg viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M0 250a250 250 0 1 1 500 0 250 250 0 0 1-500 0zm97-103v106h42v-16h-26v-31h19v-16h-19v-27h26v-16zm80 91c6 0 8-4 8-11v-52c0-8-4-12-13-12h-4v75zm-25-91h23c19 0 27 10 27 29v48c0 20-8 29-26 29h-24zm63 25c0-17 9-27 25-27s24 9 24 27v10h-16v-11c0-8-3-11-8-11-6 0-9 3-9 11v59c0 7 3 11 9 11 5 0 8-4 8-11v-17h-10v-13h26v53h-8l-3-7c-4 7-9 10-16 10-14 0-22-11-22-30zm64-25h43v16h-26v27h18v16h-18v31h26v16h-43zM112 381H95V275h24c18 0 26 8 26 30 0 13-3 21-10 26l12 50h-17l-10-45h-8zm0-60v-31h6c8 0 10 3 10 15 0 11-2 16-10 16zm53-46l10 42h1l10-42h17l-19 62v44h-16v-42l-20-64zm69 90c6 0 9-4 9-11v-51c0-9-4-13-13-13h-4v75zm-24-90h23c18 0 27 9 27 29v47c0 20-8 30-26 30h-24zm136 46v-31h6c8 0 10 3 10 15 0 11-2 16-10 16zm-72-46h43v15h-26v28h19v15h-19v32h26v16h-43zm72 106h-16V275h24c17 0 25 8 25 30 0 13-3 21-10 26l12 50h-17l-10-45h-8zm57-30c1 11 4 16 11 16 6 0 10-4 10-10 0-9-6-14-15-23-12-12-20-21-20-35 0-15 11-26 25-26s24 10 25 26l-16 2c-1-9-3-13-9-13-5 0-9 4-9 10 0 9 7 16 17 25 11 11 18 19 18 34s-11 26-26 26-26-11-27-29zm-65-172v-42h-42a42 42 0 1 1 42 42z"
                  fill="orangered"
                  fill-rule="evenodd"
                ></path>
              </svg>
            </a>

            <a :href="item.url" v-else target="_blank">
              <img :src="item.image" />
            </a>
          </div>
        </div>

        <div v-else class="logos">
          <div class="logo">
            <a href="https://edgeryders.eu" target="_blank">
              <svg viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M0 250a250 250 0 1 1 500 0 250 250 0 0 1-500 0zm97-103v106h42v-16h-26v-31h19v-16h-19v-27h26v-16zm80 91c6 0 8-4 8-11v-52c0-8-4-12-13-12h-4v75zm-25-91h23c19 0 27 10 27 29v48c0 20-8 29-26 29h-24zm63 25c0-17 9-27 25-27s24 9 24 27v10h-16v-11c0-8-3-11-8-11-6 0-9 3-9 11v59c0 7 3 11 9 11 5 0 8-4 8-11v-17h-10v-13h26v53h-8l-3-7c-4 7-9 10-16 10-14 0-22-11-22-30zm64-25h43v16h-26v27h18v16h-18v31h26v16h-43zM112 381H95V275h24c18 0 26 8 26 30 0 13-3 21-10 26l12 50h-17l-10-45h-8zm0-60v-31h6c8 0 10 3 10 15 0 11-2 16-10 16zm53-46l10 42h1l10-42h17l-19 62v44h-16v-42l-20-64zm69 90c6 0 9-4 9-11v-51c0-9-4-13-13-13h-4v75zm-24-90h23c18 0 27 9 27 29v47c0 20-8 30-26 30h-24zm136 46v-31h6c8 0 10 3 10 15 0 11-2 16-10 16zm-72-46h43v15h-26v28h19v15h-19v32h26v16h-43zm72 106h-16V275h24c17 0 25 8 25 30 0 13-3 21-10 26l12 50h-17l-10-45h-8zm57-30c1 11 4 16 11 16 6 0 10-4 10-10 0-9-6-14-15-23-12-12-20-21-20-35 0-15 11-26 25-26s24 10 25 26l-16 2c-1-9-3-13-9-13-5 0-9 4-9 10 0 9 7 16 17 25 11 11 18 19 18 34s-11 26-26 26-26-11-27-29zm-65-172v-42h-42a42 42 0 1 1 42 42z"
                  fill="orangered"
                  fill-rule="evenodd"
                ></path>
              </svg>
            </a>
          </div>
        </div>

        <h2 class="form_title">{{ form.config.title }}</h2>
        <div class="form_meta" v-if="article">
          <p>{{ article.created_at | formatDate }}</p>
          <p>{{ article.word_count | readTime }}</p>
          <a
            class="comment"
            href="#comment"
            v-smooth-scroll="{
              offset: -120,
              easingFunction: 'easeOutCirc',
              duration: 1500,
            }"
            >Share your views</a
          >
        </div>
        <div class="form_text" v-if="!success" v-html="form.config.text"></div>
      </div>
    </div>
    <div class="form_container" :class="{ article: article }" ref="myEl">
      <div class="form_content">
        <h1 v-if="article">Share your views</h1>
        <div
          class="logged_in"
          v-if="apikey && account && account.username && !success"
        >
          <p>
            You're logged in as
            <a
              :href="'https://edgeryders.eu/u/' + account.username"
              target="_blank"
              >@{{ account.username }}</a
            >
          </p>
        </div>
        <div class="account" id="comment" :class="{ hide: success }" v-else>
          <h2>
            {{ form.config.account.title }}
            <a :href="loginUrl" v-if="form.config.account.login">{{
              form.config.account.login
            }}</a
            ><a :href="loginUrl" v-else>Login to my account</a>
          </h2>
          <p v-html="form.config.account.text"></p>
          <div class="account_fields">
            <div class="field">
              <h3>Your Email</h3>
              <input
                @keydown.space.prevent
                @keyup="validateEmail()"
                :class="{
                  valid: valid.email,
                  error: valid.email == false || valid.errors.includes('email'),
                }"
                v-model="response.account.email"
                placeholder="email"
              />
            </div>
            <div class="field">
              <h3>Desired Username</h3>
              <input
                v-model="response.account.username"
                :class="{
                  valid: valid.username,
                  error:
                    valid.username == false ||
                    valid.errors.includes('username'),
                }"
                @keydown.space.prevent
                @keyup="validateUsername()"
                placeholder="username"
              />
            </div>
          </div>
        </div>
        <div class="fields" :class="{ hide: success }">
          <div class="field" v-for="(field, index) in form.fields" :key="index">
            <h3 v-if="field.title">{{ field.title }}</h3>
            <p
              v-if="
                field.text &&
                  field.type !== 'checkbox' &&
                  field.type !== 'consent'
              "
            >
              {{ field.text }}
            </p>
            <input
              class="text"
              v-if="field.type == 'input'"
              :placeholder="placeholder(field)"
              v-model="response.fields[index]['answer']"
            />
            <textarea
              :class="{ error: valid.questions.includes(index) }"
              v-if="field.type == 'textarea'"
              :placeholder="placeholder(field)"
              v-model="response.fields[index]['answer']"
            ></textarea>
            <select
              class="select-css"
              v-if="field.type == 'select'"
              v-model="response.fields[index]['answer']"
            >
              <option
                v-for="(option, option_index) in field.options"
                :key="option_index"
                :value="option"
                >{{ option }}</option
              >
            </select>
            <div class="radio" v-if="field.type == 'radio'">
              <div
                v-for="(option, option_index) in field.options"
                class="radio_field"
                :key="option_index"
              >
                <input
                  type="radio"
                  :id="option_index"
                  :value="option"
                  v-model="response.fields[index]['answer']"
                />
                <label :for="option_index">{{ option }}</label>
              </div>
            </div>
            <div class="checkbox_field" v-if="field.type == 'checkbox'">
              <input
                class="inp-cbx"
                id="cbx"
                type="checkbox"
                v-model="response.fields[index]['answer']"
                style="display: none;"
              />
              <label class="cbx" for="cbx"
                ><span>
                  <svg width="12px" height="9px" viewbox="0 0 12 9">
                    <polyline points="1 5 4 8 11 1"></polyline></svg></span
                ><span>{{ field.text }}</span>
              </label>
            </div>

            <div class="consent_field" v-if="field.type == 'consent'">
              <h3>Research Consent Agreement</h3>
              <p v-html="field.text"></p>
              <input
                class="inp-cbx"
                id="cbx"
                type="checkbox"
                v-model="response.fields[index]['answer']"
                style="display: none;"
              />
              <label class="cbx" for="cbx"
                ><span>
                  <svg width="12px" height="9px" viewbox="0 0 12 9">
                    <polyline points="1 5 4 8 11 1"></polyline></svg></span
                ><span>{{ field.label }}</span>
              </label>
            </div>
          </div>
        </div>

        <div
          class="errors"
          v-if="
            (valid.errors.length && !apikey) ||
              (valid.questions.length && !apikey)
          "
        >
          <p v-if="valid.errors.length">
            Please enter a valid
            <span v-for="(error, index) in valid.errors" :key="index">
              <span style="font-weight: bold">{{ error }}</span>
              <span
                v-if="
                  valid.errors.length > 1 && index == valid.errors.length - 2
                "
              >
                and
              </span>
              <span
                v-if="
                  valid.errors.length > 2 && index < valid.errors.length - 2
                "
                >,
              </span>
            </span>
          </p>
          <p v-if="valid.questions.length">
            Please answer
            <span style="font-weight: bold"
              >question<span v-if="valid.questions.length > 1">s</span>
              <span v-for="(error, index) in valid.questions" :key="index"
                ><span v-if="index != 0 && index != valid.questions.length">
                  &
                </span>
                {{ error + 1 }}</span
              ></span
            >
          </p>
        </div>

        <div class="errors account_error" v-if="account_errors">
          <p v-for="(error, index) in account_errors" :key="index">
            {{ error }}
          </p>
        </div>

        <div class="confirmation" v-if="success">
          <h2>{{ form.config.confirmation.title }}</h2>
          <p v-html="form.config.confirmation.text" v-if="!apikey"></p>
          <p v-else>
            Thanks for your submission
            <a
              :href="'https://edgeryders.eu/u/' + account.username"
              target="_blank"
              >@{{ account.username }}</a
            >! Your answer is <a :href="post_url" target="_blank">here</a>, be
            sure to check in to see comments from other Edgeryders.
          </p>
        </div>

        <button v-if="!success" @click="sendForm">{{ submit }}</button>
      </div>

      <div class="partners" v-if="form.config.partners">
        <h2 v-if="form.config.partners.title">
          {{ form.config.partners.title }}
        </h2>
        <h2 v-else>In partnership with:</h2>
        <div class="logos">
          <div class="item" v-for="(item, index) in form.config.partners.logos">
            <a :href="item.url" target="_blank">
              <img :src="item.image" />
            </a>
          </div>
        </div>
      </div>
    </div>

    <Footer />
  </div>
</template>

<script>
import forge from "node-forge";

import submit from "./helpers/discourse";
import Footer from "@/components/Footer.vue";

import moment from "moment";

export default {
  name: "edgeryders-form",
  data: () => ({
    form: null,
    article: false,
    formId: "14202",
    account_errors: null,
    valid: {
      email: null,
      username: null,
      questions: [],
      errors: [],
    },
    response: {
      account: {
        email: "",
        password: "",
        username: "",
      },
      fields: null,
    },
    errors: null,
    submit: "Submit",
    success: false,
    post_url: null,
    code: "",
    loginUrl: null,
    apikey: null,
    keyPair: null,
    forgeKeypair: null,
    user: null,
    pubkey1: null,
    privateKey: null,
    pathname: "1",
    account: null,
  }),
  components: {
    Footer,
  },
  methods: {
    createLogin() {
      var applicationName = process.env.VUE_APP_NAME;
      var redirectUrl = process.env.VUE_APP_REDIRECT_URL;

      var scopes = "read,write";

      var ClientId_raw = crypto.getRandomValues(new Uint8Array(30));
      var randomClientId = toBase64URL(btoa(ab2str(ClientId_raw)));

      function ab2str(buf) {
        return String.fromCharCode.apply(null, new Uint8Array(buf));
      }
      function toBase64URL(base64) {
        return base64
          .replace(/=/g, "")
          .replace(/\+/g, "-")
          .replace(/\//g, "_");
      }
      // var forgeKeypair = forge.pki.rsa.generateKeyPair({bits: 2048, e: 0x10001});

      var pem = process.env.VUE_APP_PRIVATE_KEY;

      var privKey = forge.pki.privateKeyFromPem(pem);
      this.privateKey = privKey;
      var pubKey = forge.pki.rsa.setPublicKey(privKey.n, privKey.e);
      this.pubkey1 = forge.pki.publicKeyToPem(pubKey).replace(/\r/g, "");

      const url = new URL("https://" + process.env.VUE_APP_DISCOURSE_DOMAIN);
      url.pathname = "/user-api-key/new";
      url.searchParams.set("auth_redirect", redirectUrl);
      url.searchParams.set("application_name", applicationName);
      url.searchParams.set("client_id", randomClientId);
      url.searchParams.set("scopes", scopes);
      url.searchParams.set("public_key", this.pubkey1);
      url.searchParams.set("nonce", this.formId);

      this.loginUrl = url.href;
    },
    postTopic() {
      var payload = {
        title:
          this.form.config.title + " - response by @" + this.account.username,
        raw: this.markdownResponse(),
      };

      if (this.form.config.publish.category) {
        payload["category"] = this.form.config.publish.category;
      }

      if (this.form.config.publish.topic) {
        payload["topic_id"] = this.form.config.publish.topic;
      }

      var payload_json = JSON.stringify(payload);

      fetch("https://edgeryders.eu/posts.json", {
        method: "post",
        headers: {
          "User-Api-Key": this.apikey.key,
          "Content-Type": "application/json",
        },
        body: payload_json,
      })
        .then((response) => response.json())
        .then((data) => {
          if (this.form.config.publish.topic) {
            this.post_url =
              "https://edgeryders.eu/t/" +
              data.topic_id +
              "/" +
              data.post_number;
          }
          if (this.form.config.publish.category) {
            this.post_url = "https://edgeryders.eu/t/" + data.topic_id;
          }
          this.proceed();
        });
    },
    getUser() {
      var self = this;
      fetch("https://edgeryders.eu/session/current.json", {
        method: "get",
        headers: {
          "User-Api-Key": this.apikey.key,
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          self.account = data.current_user;
        });
    },
    decrypt(payload) {
      var pem = process.env.VUE_APP_PRIVATE_KEY;

      var privKey = forge.pki.privateKeyFromPem(pem);
      this.privateKey = privKey;

      const cleanPayload = payload.replace(/ /g, "");
      const cypherCode = atob(cleanPayload);
      const decryptCode = this.privateKey.decrypt(
        cypherCode,
        "RSAES-PKCS1-V1_5"
      );
      const result = JSON.parse(decryptCode);
      this.apikey = result;
      this.formId = result.nonce;
      this.getUser();
    },
    getFormRemote(id) {
      var self = this;
      fetch("https://edgeryders.eu/raw/" + id + ".json")
        .then((response) => {
          response.text().then(function(text) {
            var form = self.parseJson(text);
            self.submit = self.submitText(form.fields);
            self.form = form;
            var fields = form.fields.filter((x) => x.type !== "submit");
            if (!isNaN(self.form.config.text)) {
              self.getFormText(form.config.text);
            }
            self.response.fields = fields.map((x) => self.createEntry(x));
            self.form.fields = fields;
          });
        })
        .catch((error) => console.error(error));
    },
    getFormText(id) {
      var self = this;
      this.article = true;
      fetch("https://edgeryders.eu/raw/" + id + ".json")
        .then((response) => {
          response.text().then(function(text) {
            console.log(text);
            self.form.config.text = md.render(text);
          });
        })
        .catch((error) => console.error(error));

      fetch("https://edgeryders.eu/t/" + id + ".json")
        .then((response) => response.json())
        .then((data) => {
          this.article = data;
        })
        .catch((error) => console.error(error));
    },
    getFormLocal() {
      this.response.fields = this.form.fields
        .filter((x) => x.type !== "submit")
        .map((x) => this.createEntry(x));
    },
    parseJson(value) {
      var code = value.match(/```([^`]*)```/);
      if (code) {
        return JSON.parse(code[1]);
      } else {
        return false;
      }
    },
    createEntry(field) {
      var obj = {
        question: field.title,
        answer: "",
        required: field.required || false,
      };
      return obj;
    },
    markdownResponse() {
      return this.response.fields
        .map(
          (field) => `**${field.question}** <br /> ${field.answer} <br /><br />`
        )
        .join(" ");
    },
    validateForm() {
      var errors = [];
      var required = [];
      if (this.response.account.email == "" || this.valid.email == false) {
        errors.push("email");
      }
      if (
        this.response.account.username == "" ||
        this.response.account.username == null ||
        this.valid.username == false
      ) {
        errors.push("username");
      }

      for (var i = this.response.fields.length - 1; i >= 0; i--) {
        if (
          this.response.fields[i].required == true &&
          this.response.fields[i].answer == ""
        ) {
          required.push(i);
        }
      }

      this.valid.errors = errors;
      this.valid.questions = required;
    },
    sendForm() {
      this.validateForm();
      if (this.apikey !== null) {
        if (this.valid.questions.length == 0) {
          this.postTopic();
        }
      } else {
        if (this.valid.errors.length == 0 && this.valid.questions.length == 0) {
          submit(
            this.response,
            this.markdownResponse(),
            this.form.messages,
            this.form.config
          ).then(this.proceed, this.fail);
        }
      }
    },
    validateEmail() {
      var email = this.response.account.email.trim();
      const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (email == "") {
        this.valid.email = null;
      } else {
        this.valid.email = re.test(email);
      }
    },
    validateUsername() {
      var username = this.response.account.username.trim();

      var self = this;
      if (username == "") {
        self.valid.username = null;
      }
      if (username.length < 3 && username.length > 0) {
        self.valid.username = false;
      }
      if (username.length > 2) {
        fetch("https://edgeryders.eu/u/" + username + ".json")
          .then((response) => response.json())
          .then((data) => {
            if (data.user) {
              self.valid.username = false;
            } else {
              self.valid.username = true;
            }
          })
          .catch((error) => {
            self.valid.username = true;
          });
      }
    },
    submitText(fields) {
      var field = fields.filter((x) => x.type == "submit");
      if (field && field[0] && field[0].text) {
        return field[0].text;
      } else {
        return "Submit";
      }
    },
    getAvatar(template) {
      return "https://edgeryders.eu" + template.replace("{size}", 200);
    },
    proceed() {
      this.success = true;
    },
    fail(errors) {
      this.account_errors = errors;
    },
    scroll() {

  this.$smoothScroll({
   scrollTo: this.$refs.myEl,
  duration: 600,
  offset: 0,
})

    },
    placeholder(field) {
      if (field.placeholder) {
        return field.placeholder;
      } else {
        return field.title;
      }
    },
  },
  created() {
    var pathname = window.location.pathname.substring(1).replace("/", "");
    this.pathname = pathname;
    if (pathname == "") {
      this.getFormRemote(this.formId);
      this.createLogin();
    }
    if (pathname == "auth_redirect") {
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      const payloadParam = urlParams.get("payload");
      const payload = decodeURIComponent(payloadParam);
      this.decrypt(payload);
      this.getFormRemote(this.formId);
     setTimeout(() =>  this.scroll(), 500);
    }
    if (pathname !== "" && !isNaN(pathname)) {
      this.formId = pathname;
      this.getFormRemote(this.formId);
      this.createLogin();
    }
  },
  filters: {
    formatDate: function(value) {
      return moment(String(value)).format("dddd, MMMM Do YYYY");
    },
    readTime: function(value) {
      return Math.round(value / 265) + " min read";
    },
  },
};
</script>

<style lang="scss">
body {
  padding: 0 !important;
  margin: 0 !important;
}
.form {
  height: 100vh;
}
.hide {
  display: none !important;
}
.form_title {
  border-bottom: 1px solid #ddd;
  padding-bottom: 1rem;
  font-size: 1.75rem;
}
.form_meta {
  margin-bottom: 2.5rem;
  display: flex;
  align-items: center;
  width: 100%;
  p {
    float: left;
    font-weight: bold !important;

    padding-right: 1rem;
    margin: 0 1rem 0 0 !important;
    border-right: 1px solid #ddd;
    &:last-child {
      border-right: none;
    }
  }
  a.comment {
    color: orangered;
    margin: 0 !important;
    text-decoration: underline;
    font-weight: bold !important;
    &:hover {
      cursor: pointer;
    }
  }
}

.form_text {
  line-height: 1.75rem;
  font-size: 1.1rem;
  margin: 0 0 1rem;
  font-weight: 400;
}
.form_text h2 {
  margin-top: 3rem !important;
}
.partners {
  width: 100% !important;
  font-family: "Helvetica";
  max-width: 1180px;
  margin: 0 0 3rem;
  h2 {
    font-size: 1.45rem;
    color: rgba(0, 0, 0, 1);
    border-bottom: 1px solid #ddd;
    width: 30%;
    padding-bottom: 1rem;
  }
  .logos {
    display: flex;
    .item {
      margin-top: 1rem;
      img {
        height: 60px;
      }
    }
  }
}
@keyframes slideUp {
  0% {
    opacity: 0;
    transform: translateY(10px);
  }
  100% {
    opacity: 1;
    transform: translateY(0px);
  }
}

.form_intro {
  margin: 100px auto 0;
}

.form_content {
  width: 700px;
  margin: 0rem auto 50px;
  h1 {
  color: orangered;
  padding-left: 4rem;
  letter-spacing: 0px;
  padding: 0.5rem 0 0.5rem 3.75rem;
  background-size: 2.95rem  !important;
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 125'%3E%3Cstyle%3E%3C/style%3E%3Cpath fill='orangered' stroke-width='1' stroke='orangered' d='M67 33H33c-1.7 0-3 1.3-3 3s1.3 3 3 3h34c1.7 0 3-1.3 3-3s-1.3-3-3-3zM67 44H33c-1.7 0-3 1.3-3 3s1.3 3 3 3h34c1.7 0 3-1.3 3-3s-1.3-3-3-3zM67 55H33c-1.7 0-3 1.3-3 3s1.3 3 3 3h34c1.7 0 3-1.3 3-3s-1.3-3-3-3z'/%3E%3Cpath stroke='orangered' stroke-width='2' fill='orangered' d='M55.9 9H44.1a37 37 0 00-37 37v41c0 2.4 1.3 3.4 2.1 3.7.5.2.9.3 1.4.3 1.7 0 3.1-1.3 4.8-2.9 2.2-2 5.6-5.1 8.7-5.1h31.8a37 37 0 000-74zm0 68H24.1c-4.4 0-8.2 2.7-11 5.2V46a31 31 0 0131-31h11.8a31 31 0 010 62z'/%3E%3C/svg%3E") 0 5px no-repeat;
}
}
.form_container.article {
  background: #fafafa;
  width: 100%;
  padding: 2rem 0 0 0;
  margin: 3rem 0 0;
  .account {
    border: 1px solid #ddd;
    background: white;
    border-radius: 5px;
    margin: 2rem 0;
  }
  .logged_in {
  background: #fff;
  width: auto;
  display: inline-flex;
}
}

.form_container {
  display: flex;
  width: 700px;
  margin: 0rem auto 0;
  flex-direction: column;
  font-family: Helvetica, sans-serif;
  &.form_intro {
    margin: 5rem auto 0;
  }
  .introduction {
    .logos {
      display: flex;
      align-items: center;
      font-size: 1.2rem;
      margin-bottom: 2rem;
      .logo {
        img {
          height: 55px;
          margin-right: 1rem;
          border-left: 1px solid #efefef;
          padding-left: 1.2rem;
          margin-left: 0.6rem;
        }
        svg {
          height: 55px;
          margin-right: 0.65rem;
        }
      }
    }
    h2 {
      margin: 0 0 1rem;
    }
    p {
      line-height: 1.75rem;
      font-size: 1.1rem;
      margin: 0 0 1rem;
      font-weight: 400;
    }
  }
  .confirmation {
    opacity: 0;
    animation: slideUp 1s ease forwards;
  }
  .logged_in {
    padding: 1.3rem 1.5rem;
    margin: 1rem 0;
    border-left: 4px solid #fe5a35;
    background: #fafafa;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    p {
      line-height: 1.7rem !important;
      font-size: 1.1rem;
      margin: 0;
      a {
        color: black;
        font-weight: bold;
        text-decoration: none;
        &:hover {
          color: orangered;
        }
      }
    }
  }
  .account {
  margin-bottom: 2rem !important;
    h2 {
      font-size: 1.4rem;
      display: inline-block;
      margin-bottom: 1.5rem !important;
      color: black;
      a {
        color: black;
        border-left: 1px solid #ddd;
        padding: 0.55rem 0.5rem 0.55rem 1.3rem;
        margin-left: 1rem;
        text-decoration: underline;
        &:hover {
          color: orangered;
          cursor: pointer;
        }
      }
    }
  }
  .account,
  .confirmation {
    display: flex;
    padding: 2rem 2.5rem;
    margin: 1rem 0;
    border-left: 4px solid #fe5a35;
    background: #fafafa;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    h2 {
      margin: 0 0 1rem 0;
    }
    .account_fields {
      display: flex;
      justify-content: space-between;
      width: 100%;
      .field {
        width: 48%;
        &:first-child {
          margin-right: 1% !important;
        }
        input {
          width: 90% !important;
        }
      }
    }
    input {
      padding: 0.7rem 0.75rem;
      border: 3px solid #efefef;
      transition: border 0.35s ease;
      border-radius: 3px;
      font-size: 0.85rem;
      width: 100%;
      font-weight: 400;
      background-color: white;
      &.error {
        border: 3px solid rgba(255, 66, 40, 0.9);
      }
      &.valid {
        background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 256 320'%3E%3Cpath fill='%23329C4E' d='M226 97c-4-4-7-11-7-17V57c0-11-9-20-20-20h-23c-6 0-13-3-17-7l-17-17c-8-8-20-8-28 0L97 30c-4 4-11 7-17 7H57c-11 0-20 9-20 20v23c0 6-3 14-7 17l-17 17c-8 8-8 21 0 28l17 17c4 4 7 11 7 17v23c0 11 9 20 20 20h23c6 0 14 4 17 8l17 16c8 8 21 8 28 0l17-16c4-4 11-8 17-8h23c11 0 20-9 20-20v-23c0-5 4-13 8-17l16-17c8-7 8-20 0-28l-17-17zm-108 63l-33-34 10-10 24 23 42-43 11 11-54 53z'/%3E%3C/svg%3E")
          96% 8px no-repeat;
        background-size: 23px;
      }
      &:focus {
        border: 3px solid rgba(0, 0, 0, 0.3);
        outline: none;
      }
    }
    p {
      line-height: 1.7rem !important;
      font-size: 1rem;
      margin: 0;
    }
    .field {
      margin: 0 0 2rem h3 {
        margin: 0;
      }
      input {
        margin: 0;
      }
    }
  }
  .fields {
    margin-top: 1.4rem;
    .field {
      margin-top: 0;
      margin-bottom: 2rem;
      h3 {
        line-height: 1.7rem;
        font-weight: 600;
        font-size: 1.3rem;
        margin: 0 0 0.65rem;
      }
      p {
        font-weight: 400;
        font-size: 1.1rem;
        line-height: 1.8rem;
        margin: 0 0 1.5rem;
      }
    }
  }
  input.text {
    padding: 0.7rem 0.75rem;
    border: 3px solid #efefef;
    transition: border 0.35s ease;
    border-radius: 3px;
    font-size: 1.1rem;
    width: 100%;
    margin: 0;
    font-weight: 400;
    background-color: white;
    &:focus {
      border: 3px solid rgba(0, 0, 0, 0.3);
      outline: none;
    }
  }
  textarea {
    width: 100%;
    height: 300px;
    border: 3px solid #efefef;
    font-size: 1.1rem;
    line-height: 1.8rem;
    padding: 1rem;
    border-radius: 5px;
    transition: border 0.35s ease;
    &:focus {
      border: 3px solid rgba(0, 0, 0, 0.3);
      outline: none;
    }
    &.error {
      border: 3px solid rgba(255, 66, 40, 0.9);
    }
  }
  .errors {
    padding: 1rem 1rem;
    margin: 1.5rem 0 0.5rem;
    color: white;
    background: rgba(255, 66, 40, 0.9);
    border: 3px solid rgba(0, 0, 0, 0.06);
    p {
      margin-top: 0;
      margin-bottom: 0.5rem;
      &:last-child {
        margin: 0;
      }
    }
  }
  button {
    padding: 1rem 3rem;
    background: white;
    margin: 0rem 0 0;
    width: auto !important;
    align-self: start;
    background: #fe5a35;
    color: white;
    font-size: 1rem;
    font-weight: bold;
    border: none;
    border-radius: 10px;
    &:hover {
      cursor: pointer;
      background: #ea5128;
    }
  }
  .radio_field {
    margin-bottom: 1rem;
    border-bottom: 1px solid #ddd;
    width: 50%;
    padding-bottom: 1rem;
    font-weight: bold;

    &:last-child {
      border: none;
    }
    &:hover [type="radio"]:not(:checked) + label {
      color: orangered;
    }

    [type="radio"]:checked,
    [type="radio"]:not(:checked) {
      position: absolute;
      left: -9999px;
    }
    [type="radio"]:checked + label,
    [type="radio"]:not(:checked) + label {
      position: relative;
      padding-left: 34px;
      cursor: pointer;
      line-height: 20px;
      display: inline-block;
      color: rgba(0, 0, 0, 1);
    }
    [type="radio"]:checked + label:before,
    [type="radio"]:not(:checked) + label:before {
      content: "";
      position: absolute;
      left: 0;
      top: 0;
      width: 18px;
      height: 18px;
      border: 2px solid #ddd;
      border-radius: 100%;
      background: #fff;
    }
    [type="radio"]:checked + label:after,
    [type="radio"]:not(:checked) + label:after {
      content: "";
      width: 14px;
      height: 14px;
      background: #fe5a35;
      position: absolute;
      top: 4px;
      left: 4px;
      border-radius: 100%;
      -webkit-transition: all 0.2s ease;
      transition: all 0.2s ease;
    }
    [type="radio"]:not(:checked) + label:after {
      opacity: 0;
      -webkit-transform: scale(0);
      transform: scale(0);
    }
    [type="radio"]:checked + label:after {
      opacity: 1;
      -webkit-transform: scale(1);
      transform: scale(1);
    }
    [type="radio"]:checked + label {
      color: #fe5a35;
      font-weight: bold;
    }
  }
  .checkbox_field {
    display: flex;
  }
}

.menu {
  position: absolute;
  top: 0;
  left: 0;
  height: 60px;
  width: 100%;
  background: #fafafa;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  .profile {
    display: flex;
    align-items: center;
    margin-right: 2rem;

    img {
      width: 25px;
      height: 25px;
      border-radius: 4px;
      margin-right: 10px;
    }
    p {
      font-weight: bold;
      font-size: 1rem;
    }
  }
}

@media only screen and (max-width: 600px) {
  .form {
    .form_container {
      width: 100%;
      .logos {
        display: flex;
      }
      .introduction {
      .logos {
      display: flex;
    }
    }
      .form_meta {
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        p {
          border-right: none;
        }
        a.comment {
          margin-top: 1rem !important;
          font-size: 1.2rem;
        }
      }
    }

    .form_content {
      width: 85%;
      h1 {
        font-size: 1.75rem;
        color: orangered;
        padding-left: 0rem;
        padding-top: 3.5rem;
        background-size: 2.5rem !important;
      }
      .account {
        background: none !important;
        padding: 0rem;
        border: none;
        margin-bottom: 2rem;
        p {
          font-weight: 400;
          font-size: 1.1rem;
          line-height: 1.8rem;
          margin: 0 0 1.5rem;
        }
      }
    }
    .introduction {
      width: 85%;
      margin: 0 auto;
      p {
        line-height: 1.75rem;
        font-size: 1.1rem;
      }
      .logos {
        h2 {
          font-size: 1.5rem;
        }
      }
    }
    width: 100%;
    margin: 30px auto;
    .introduction {
      padding: 0;
      .logos {
        display: block;
      }
    }
    .account {
      border: none;
      background: #ddd !important;
      padding: 1.5rem 7%;
      h2 {
        margin-bottom: 0.5rem !important;
        a {
          display: block;
          padding: 1rem 0 0 0;
          border: none;
          margin: 1rem 0;
          border-top: 1px solid #ddd;
        }
      }
      .account_fields {
        flex-direction: column;
        .field {
          width: 100%;
          h3 {
            line-height: 1.7rem;
            font-weight: 600;
            font-size: 1.3rem;
          }
        }
      }
    }
    .fields {
      width: 100%;
      margin: 1rem auto 0;
      textarea,
      input {
        width: 90%;
      }
      .select-css {
        width: 100%;
      }
      .radio_field {
        width: 100%;
      }
    }
    button {
      width: 75% !important;
      margin: 0 0 1rem 0rem !important;
    }
  }
  .footer {
    .wrapper {
      flex-direction: column;
      .terms {
        padding: 0;
      }
    }
  }
  .partners {
    h2 {
      width: 100%;
    }
  }
}

/* class applies to select element itself, not a wrapper element */
.select-css {
  display: block;
  font-size: 16px;
  font-family: sans-serif;
  font-weight: 700;
  color: #444;
  line-height: 1.3;
  padding: 0.6em 1.4em 0.5em 0.8em;
  width: 50%;
  max-width: 100%; /* useful when width is set to anything other than 100% */
  box-sizing: border-box;
  margin: 0;
  border: 1px solid #ddd;
  border-radius: 0.5em;
  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;
  background-color: #fff;
  /* note: bg image below uses 2 urls. The first is an svg data uri for the arrow icon, and the second is the gradient. 
        for the icon, if you want to change the color, be sure to use `%23` instead of `#`, since it's a url. You can also swap in a different svg icon or an external image reference
        
    */
  background-image: url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23888%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E"),
    linear-gradient(to bottom, #ffffff 0%, #e5e5e5 100%);
  background-repeat: no-repeat, repeat;
  /* arrow icon position (1em from the right, 50% vertical) , then gradient position*/
  background-position: right 0.7em top 50%, 0 0;
  /* icon size, then gradient */
  background-size: 0.65em auto, 100%;
}
/* Hide arrow icon in IE browsers */
.select-css::-ms-expand {
  display: none;
}
/* Hover style */
.select-css:hover {
  border-color: #888;
  background-image: url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23FE5A35%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E"),
    linear-gradient(to bottom, #ffffff 0%, #e5e5e5 100%);
}
/* Focus style */
.select-css:focus {
  border: 1px solid #ddd;
  color: #222;
  outline: none !important;
  background-image: url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23FE5A35%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E"),
    linear-gradient(to bottom, #ffffff 0%, #e5e5e5 100%);
}

/* Set options to normal weight */
.select-css option {
  font-weight: normal;
}

/* Support for rtl text, explicit support for Arabic and Hebrew */
*[dir="rtl"] .select-css,
:root:lang(ar) .select-css,
:root:lang(iw) .select-css {
  background-position: left 0.7em top 50%, 0 0;
  padding: 0.6em 0.8em 0.5em 1.4em;
}

/* Disabled styles */
.select-css:disabled,
.select-css[aria-disabled="true"] {
  color: graytext;
  background-image: url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22graytext%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E"),
    linear-gradient(to bottom, #ffffff 0%, #e5e5e5 100%);
}

.select-css:disabled:hover,
.select-css[aria-disabled="true"] {
  border-color: #aaa;
}

.cbx {
  -webkit-user-select: none;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
  cursor: pointer;
  margin-top: 0.75rem;
  font-weight: bold;
  color: rgba(0, 0, 0, 1);
}
.cbx span {
  display: inline-block;
  vertical-align: middle;
  transform: translate3d(0, 0, 0);
}
.cbx span:first-child {
  position: relative;
  width: 23px;
  height: 23px;
  border-radius: 50%;
  transform: scale(1);
  vertical-align: middle;
  border: 2px solid #ddd;
  margin-left: 1px;
  transition: all 0.2s ease;
}
.cbx span:first-child svg {
  position: absolute;
  z-index: 1;
  top: 7.5px;
  left: 5px;
  fill: none;
  stroke: white;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-dasharray: 16px;
  stroke-dashoffset: 16px;
  transition: all 0.3s ease;
  transition-delay: 0.1s;
  transform: translate3d(0, 0, 0);
}
.cbx span:first-child:before {
  content: "";
  width: 100%;
  height: 100%;
  background: #fe5a35;
  display: block;
  transform: scale(0);
  opacity: 1;
  border-radius: 50%;
  transition-delay: 0.2s;
}
.cbx span:last-child {
  margin-left: 11px;
}

.cbx:hover span:first-child {
  border-color: #fe5a35;
}

.inp-cbx:checked + .cbx span:first-child {
  border-color: #fe5a35;
  background: #fe5a35;
  animation: check 0.6s ease;
}
.inp-cbx:checked + .cbx span:first-child svg {
  stroke-dashoffset: 0;
}
.inp-cbx:checked + .cbx span:first-child:before {
  transform: scale(2.2);
  opacity: 0;
  transition: all 0.6s ease;
}

@keyframes check {
  50% {
    transform: scale(1.2);
  }
}
</style>
