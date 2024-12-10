body{
  font-family: arial, sans-serif;
  display: grid;
  justify-content: center;
  align-items: center;
  height: 100vh;
  margin: 0;
  background: url(../src/assets/2.jpg);
  background-size: cover;
}


.app{
  padding: 20px;
  background: rgba(255,255,255,0.2);
  box-shadow: 0 8px 32px 0 rgba(31,38,135,0.37);
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px);
  border-radius: 10px;
  border: 1px solid rgba(196, 240, 232, 0.18);
}
h1{
  margin-top: 0;
}
.input-wrapper{
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.done {
  text-decoration: line-through;
  color: #888;
}

input{
  padding: 10px;
  flex: 1;
  border: 1px solid #ccc;
  border-radius: 5px;
}
button{
  padding: 10px;
  border: none;
  background-color: #007bff;
  color:white;
  border-radius:5px;
  cursor:pointer;
}

button:hover{
  background-color: #0056b3;
}

ul{
  list-style-type: none;
  padding: 0;
}
li{
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2px;
  background-color: #f9f9f9;
  border-radius: 5px;
  margin-bottom: 10px;
}

li div button{
  background-color: #e41126;
}

li div button:hover{
  background-color: #e61126;
}

li div button:first-child{
  margin-right: 10px;
  background-color: #ffc107;
}

li div button:first-child:hover{
  background-color: #e0a800;
}

.manage-btns{
  margin-left: 20px;
  margin-right: 5px;
  display: flex;
  justify-content: space-evenly;
}