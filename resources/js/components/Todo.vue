<template>
    <div class="container">
        <div class="row justify-content-center m-5">
            <div class="col-md-8">
                <div class="card">
                    <div class="card-header">Todo</div>

                    <div class="card-body">
                        <div class="input-group">
                        <input type="text" placeholder="Write Here" class="form-control"
                        aria-label="todo" aria-describedby="todo" v-model="todo_input">
                        <div class="input-group-append">
                        <button v-if="!edit_todo_id" type="button" class="btn btn-primary text-white" @click="saveTodo()">Add</button>

                        <button v-else type="button" class="btn btn-primary text-white" @click="updateTodo()">Update</button>
                    </div>
                </div>
                <button type="button" class="btn btn-md text-danger float-right" @click="resetTodo()">Reset</button>
<table class="table table-bordered mt-4">
    <thead>
        <th>No</th>
        <th>Note</th>
        <th>Action</th>
    </thead>
    <tbody>
        <tr v-for="(todos,index) in todos" :key="index">
        <td>{{ ++index}}</td>
        <td>{{ todos.name }}</td>
        <td>
            <button type="button" class="btn btn-sm btn-danger" @click="deleteTodo(--index)">Delete</button>
            <button type="button" class="btn btn-sm btn-primary" @click="editTodo(--index)">Edit</button>

        </td>
    </tr>
    </tbody>
</table>
                </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
    export default {
        data(){
            return{
                todos:[],
                api:'http://127.0.0.1:8000/api/todos',
                todo_input:'',
                edit_todo_id: '',
                edit_index:''

            }
        },
        mounted() {
            axios.get(this.api).then((response) => {
            //console.log(response)
            this.todos=response.data;
})

},
methods:{
    saveTodo(){
        if(this.todo_input.length >0){
            let data={'name':this.todo_input};
            axios.post(this.api,data).then((response) => {
           // console.log(response);
           this.todos.push(response.data);
           this.todo_input ='';
            })}

    },

    deleteTodo(index){
        if(this.todos[index].id){
            axios.delete(this.api+'/'+this.todos[index].id).then((response) => {
           //console.log(response);
           this.todos.splice(index,1);
            })}
    },

    editTodo(index){
        if(this.todos[index].id){
         this.todo_input = this.todos[index].name;
         this.edit_todo_id = this.todos[index].id;
         this.edit_index = index;
            }
        },
        updateTodo(){
        if(this.todo_input.length >0){
            let data={'name':this.todo_input};
            axios.patch(this.api+'/'+this.todos[this.edit_index].id,data).then((response) => {
                //console.log(response);
           this.todos[this.edit_index].name = response.data.name;
           this.resetTodo();
            })}

    },

        resetTodo(){
            this.todo_input='';
            this.edit_index='';
            this.edit_todo_id=''
        }

}
    }
</script>
