<script setup>
import axios from "axios";
import { chave_publica, hash, ts } from "../keys";
import "../assets/personagens.css";
</script>

<template>
  <div id="personagens-marvel">
    <div class="container">
      <div class="row">
        <!-- Replicar codigo abaixo para todos os elementos do vetor -->
        <div
          class="col-md-4"
          v-for="personagem in personagens"
          :key="personagem.id"
        >
          <div class="card-box m-5">
            <!-- Definindo imagem do personagem como background -->
            <div
              class="card"
              v-bind:style="{
                'background-image': `url(${personagem.thumbnail.path}/portrait_incredible.jpg)`,
              }"
            >
              <div class="layer"></div>
              <div class="content">
                <!-- Passando o nome do personagem -->
                <h3>{{ personagem.name }}</h3>

                <!-- Verificando se o personagem tem descrição -->
                <p v-if="personagem.description == ''">
                  O personagem não possui informação.
                </p>

                <!-- Passando sua descrição caso existir -->
                <p v-else>
                  {{ personagem.description }}
                </p>
              </div>
              <!-- Botao Favorito -->
              <button
                @click="favoritar(personagem)"
                class="btn btn-danger btn-lg my-2 px-5"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-heart-fill m-1 mx-2"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill-rule="evenodd"
                    d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"
                  />
                </svg>
                <!-- Quantidade de Favoritos -->
                {{ personagem.numFavoritos }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "personagens-marvel",

  data() {
    //Definindo variavel
    return {
      personagens: [],
    };
  },

  mounted() {
    //Chamando a função da API
    this.getPersonagens();
  },
  methods: {
    favoritar: function (element) {
      //Adicionando no contador de favoritos
      element.numFavoritos += 1;

      //Ordenando elementos baseado no numero de favoritos
      this.personagens.sort((a, b) =>
        a.numFavoritos > b.numFavoritos ? -1 : 1
      );
    },

    getPersonagens: function () {
      axios
        .get(
          //Passando os parametros para a API
          `https://gateway.marvel.com/v1/public/characters?ts=${ts}&apikey=${chave_publica}&hash=${hash}`
        )
        .then((resultado) => {
          //Pegando as informações de cada personagem
          resultado.data.data.results.forEach((element) => {
            //Adicionando no vetor 'personagens'
            this.personagens.push(element);

            //Adicionando o atributo 'numero de favoritos' para todos os elementos
            Object.assign(element, { numFavoritos: 0 });
          });
        });
    },
  },
};
</script>
