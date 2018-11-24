<template>
    <div id="demo">
        <div>
            <table>
                <thead>
                    <tr>
                        <th>姓名</th>
                        <th>地址</th>
                        <th>性别</th>
                        <th>年龄</th>
                        <th>出生日期</th>
                        <td>操作</td>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item,index) in users" :key="index">
                        <td>{{item.name}}</td>
                        <td>{{item.addr}}</td>
                        <td>{{item.sex}}</td>
                        <td>{{item.age}}</td>
                        <td>{{item.birth}}</td>
                        <td>
                            <button @click="deleteUser(item.id)">删除</button>
                            <button @click="putUser(item.id)">修改</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div>
            <button @click="addUser">增加</button>
        </div>
    </div>
</template>

<script>
import { http } from "../api/api.js";
export default {
  name: "HelloWorld",
  data() {
    return {
      users: []
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    addUser() {
      var params = { id: 3, name: "lily" };
      http
        .post("/user/postinfo", params)
        .then(data => {
          this.users = data.data;
          console.log(data);
        })
        .catch(error => {
          console.log(error);
        });
    },
    deleteUser(id) {
      console.log(id);
      var params = { id: id };
      http
        .delete("/user/postinfo", { data: params })
        .then(data => {
          this.users = data.data;
        })
        .catch(error => {
          console.log(error);
        });
    },
    putUser(id) {
      console.log(id);
      //   var params = { id: 2 };
      //   http
      //     .put("/user/postinfo", { data: params })
      //     .then(data => {
      //       this.users = data.data;
      //       console.log(data);
      //     })
      //     .catch(error => {
      //       console.log(error);
      //     });
    },
    getData() {
      http
        .get("/user/postinfo")
        .then(data => {
          this.users = data.data;
          console.log(data);
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
#demo {
  table {
    border-collapse: collapse;
  }
  th,
  td {
    border: 1px solid black;
  }
}
</style>
