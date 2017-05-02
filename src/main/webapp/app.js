/**
 * Created by Adrián on 2017. 05. 01..
 */
Vue.use(VueRouter);

const Posts = {
    template: `
 <div>
    <div class="card mb-5 w-75 mx-auto" v-for="post in posts">
        <div class="card-header">
            <h4>{{post.title}}</h4>
        </div>
        <div class="card-block text-justify">
            <p class="card-text">{{post.content}}</p>
        </div>
        <div class="card-footer text-muted text-center">
            {{post.created}}
        </div>
    </div>
</div>
    `,
    data: () => ({
        posts: null
    }),
    created: function () {
        this.fetchData()
    },
    methods: {
        fetchData: function () {
            var xhr = new XMLHttpRequest()
            var self = this
            xhr.open('GET', '/blog/api/posts/all')
            xhr.onload = function () {
                self.posts = JSON.parse(xhr.responseText)
            }
            xhr.send()
        }
    }
}

const Admin = {
    template: `
<div class="w-75 mx-auto">
    <h3 class="text-center">Add new post</h3>
    <form class="pt-3" method="get">
      <div class="form-group">
        <label>Title</label>
        <input type="text" class="form-control" v-model="title" required>
      </div>
      
      <div class="form-group">
        <label for="exampleTextarea">Content</label>
        <textarea class="form-control" id="exampleTextarea" rows="3" v-model="content" required></textarea>
      </div>
    
      <button class="btn btn-primary w-100 mt-2" type="submit" v-on:click="sendData">Add</button>
    </form>
</div>
    `,
    data: () => ({
        title: '',
        content: ''
    }),
    methods: {
        sendData: function () {
            var self = this

            if (self.title == '' || self.content == '') {
                return;
            }

            var xhr = new XMLHttpRequest()
            var data = JSON.stringify({title: self.title, content: self.content})
            xhr.open('POST', '/blog/api/posts/', true)
            xhr.setRequestHeader('Content-Type', 'application/json')
            xhr.onload = function() {
                if(xhr.status != '200')
                {
                    alert("Error")
                }
                else
                {
                    self.title = ''
                    self.content = ''
                    alert("Success")
                }
            }
            xhr.send(data)
        }
    }
}

const Login = {
    template: `
<div class="w-75 mx-auto">
    <h3 class="text-center">Login</h3>
    <form class="pt-3" action="j_security_check" method="post">
      <div class="form-group">
        <label>Username</label>
        <input type="text" class="form-control" name="j_username" required>
      </div>
      
      <div class="form-group">
        <label>Password</label>
        <input type="password" class="form-control" name="j_password" required>
      </div>
    
      <button class="btn btn-primary w-100 mt-2" type="submit">Sign in</button>
    </form>
</div>
    `
}

const routes = [
    {path: '*', redirect: '/posts'},
    {path: '/posts', component: Posts},
    {path: '/admin', component: Admin},
    {path: '/login', component: Login}
]

const router = new VueRouter({
    routes
})

const app = new Vue({
    router
}).$mount('#app')
