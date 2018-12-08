<template>
  <div id="app">
    <div class="container-fluid" >
      <div v-if="errorMessage">
        <div class="alert alert-danger" role="alert">
          {{this.errorMessage}}
        </div>
      </div>

      <div class="bg-light">
        <h5 class="float-left">Github Search</h5>
      </div>

      <div class="card col-md-12 page-panel">
        <div class="card-body">
          <form v-on:submit.prevent="search">
            <div class="form-group">
              <input v-model="repoName" type="text" class="form-control" name="repoName" id="repoName" placeholder="Please enter repository name to search">
            </div>

            <div class="row">
              <div class="col-md-12">
                <span class="float-left"><b>{{totalResult}} repository result</b></span>
              </div>
            </div>
            <hr />

            <div class="row">
              <div class="col-md-12">
                <ul id="resultList">
                  <li v-for="item in items">
                    <div class="row">
                      <div class="card col-md-12">
                        <div class="card-body">
                          <div class="row">
                            <div class="col-md-4 text-primary text-left">
                              <b>{{item.full_name}}</b>
                            </div>

                            <div class="offset-md-5 col-md-2">
                              <span class="dot"></span> {{item.language}}
                            </div>
                            <div class="col-md-1">
                              <span class="fa fa-star"></span>{{item.stargazers_count}}
                            </div>
                          </div>

                          <div class="row">
                            <div class="col-md-12">
                              <p class="text-left">{{item.description}}</p>
                              <p class="text-left">Updated on {{item.updated_at | formatDate}}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

          </form>
        </div>
      </div>

      <paginate
          :page-count="pageCount"
          :page-range="4"
          :margin-pages="1"
          :click-handler="callNextPage"
          :prev-text="'Prev'"
          :next-text="'Next'"
          :container-class="'pagination'"
          :page-class="'page-item'"
          :next-class="'page-item'"
          :prev-class="'page-item'"
          prev-link-class="page-link"
          next-link-class="page-link"
          page-link-class="page-link">
      </paginate>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'app',
  components: {
  },
  data() {
    return {
      repoName: "",
      page: 1,
      pageCount: 0,
      totalResult: 0,
      items: {},
      errorMessage: ""
    }
  },
  methods: {
    callNextPage: function(page) {
      this.page = page;
      this.search();
    },
    search: function() {
      this.errorMessage = "";
      axios.get(`https://api.github.com/search/repositories?per_page=10&page=${this.page}&q=${this.repoName}`)
      .then((response)  =>  {
        this.totalResult = response.data.total_count;
        this.pageCount = Math.ceil(this.totalResult /10) * 10;
        this.items = response.data.items;

        if (this.totalResult == 0) {
          this.errorMessage = "No results."
        }
      }, (error)  =>  {
        this.errorMessage = error.response.data.message;
        window.scrollTo(0,0);
      })
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 10px;
}

.dot {
  height: 10px;
  width: 10px;
  background-color: black;
  border-radius: 50%;
  display: inline-block;
}
</style>
