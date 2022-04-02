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
          <button @click="ordenar()" class="btn btn-default">Ordenar</button>
          <div
            class="accordion-item"
            v-for="personagem in personagens"
            :key="personagem.id"
          >
            <img
              :src="`${personagem.thumbnail.path}/standard_large.jpg`"
              class="img-fluid ${3|rounded-top,rounded-right,rounded-bottom,rounded-left,rounded-circle,|}"
              alt=""
            />
            <h2 class="accordion-header" v-bind:id="`#id-${personagem.id}`">
              <button @click="addQty(personagem)" class="btn btn-danger btn-sm">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-heart"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"
                  />
                </svg>
                {{ personagem.qty }}
              </button>
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
              <div class="accordion-body" v-if="personagem.description == ''">
                O personagem não possui informação.
              </div>
              <div class="accordion-body" v-else>
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
    };
  },

  mounted() {
    this.getPersonagens();
  },
  methods: {
    ordenar: function () {
      this.personagens.sort((a, b) => (a.qty > b.qty ? -1 : 1));
    },

    addQty: function (item) {
      item.qty += 1;
    },

    getPersonagens: function () {
      axios
        .get(
          `http://gateway.marvel.com/v1/public/characters?ts=${ts}&apikey=${chave_publica}&hash=${hash}`
        )
        .then((resultado) => {
          resultado.data.data.results.forEach((element) => {
            this.personagens.push(element);
            Object.assign(element, { qty: 0 });
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
