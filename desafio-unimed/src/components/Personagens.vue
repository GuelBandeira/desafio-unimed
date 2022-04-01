<script setup>
import axios from "axios";
import { chave_publica, hash, ts } from "../keys";
</script>

<style>
img {
  float: left;
  border-radius: 50%;
  position: absolute;
  z-index: 10;
  width: 30px;
  height: auto;
  margin-top: 8px;
  border: 1px solid red;
  /* align-items: center;
  border-radius: 50%;
  display: inline-flex;
  justify-content: center;
  line-height: normal;
  position: relative;
  text-align: center;
  vertical-align: middle;
  overflow: hidden; */
}

h2,
.accordion-collapse {
  padding-left: 1.2em;
}
</style>

<template>
  <div id="personagens">
    <div class="accordion" id="accordionExample">
      <div class="container">
        <div class="row">
          <div class="accordion-item" v-for="personagem in personagens">
            <img
              :src="`${personagem.thumbnail.path}/standard_large.jpg`"
              class="img-fluid ${3|rounded-top,rounded-right,rounded-bottom,rounded-left,rounded-circle,|}"
              alt=""
            />
            <h2 class="accordion-header" v-bind:id="`#id-${personagem.id}`">
              <button
                class="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                v-bind:data-bs-target="`#id-${personagem.id}`"
                aria-expanded="false"
                v-bind:aria-controls="`id-${personagem.id}`"
              >
                {{ personagem.name }}
              </button>
            </h2>

            <div
              v-bind:id="`id-${personagem.id}`"
              class="accordion-collapse collapse"
              v-bind:aria-labelledby="`#id-${personagem.id}`"
              data-bs-parent="#accordionExample"
            >
              <div class="accordion-body">
                {{ personagem.description }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Personagens",

  data() {
    return {
      personagens: [],
      url: [],
      size: "standard_large.jpg",
    };
  },

  mounted() {
    this.getPersonagens();
  },
  methods: {
    getPersonagens: function () {
      axios
        .get(
          `http://gateway.marvel.com/v1/public/characters?ts=${ts}&apikey=${chave_publica}&hash=${hash}`
        )
        .then((resultado) => {
          resultado.data.data.results.forEach((element) => {
            this.personagens.push(element);
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
