import logo from './logo.svg';
import './App.css';
import { Component } from 'react';
import List from './List';

//jsx adalah extensi dari javascript yang bertujuan agar kita melakukan banyak hal seperti expresi
// jsx juga extensi dari java script dimana elemen dari html bisa msuk ke dalam java script
// komponen dan properti(props)
// contoh komponen menggunakan function
// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//            Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// function  Biodata(props) {
//   return <span>Umur {props.age}</span>
// }

// function Greeting(props) {
//   return <h2>hallo {props.name} <Biodata age={props.age}/></h2>
// }

// class App extends Component{
//   render(){
//     return(
//       <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//            Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <Greeting name="ilham" age="24"/>
//       </header>
//     </div>
//     );
//   }
// }
// export default App;


// lat1 =  component pada react
function Data(props) {
  return <p> {props.nama} </p> 
          
}

function Devisi(props) {
  return <p> {props.bagian}</p>
    
}

// lat2 state mirip dengan prop , untuk oper nilai
class Timer extends Component  {
  // tidak boleh ada 2 consturtor pada class
  // super membuat turunan dari parent consturtor dan harus dipanggil dahulu sebelum membuat kata kunci this
  // jikka tidak dia akan error
  constructor(props){
    super(props)
    this.state = {
      time : props.start
    }
  }

  //lifecycle
  // akan berjalan setelah semuanya selesai
  componentDidMount(){
    // fungsi yang otomatis jalan
    this.addInterval = setInterval( () => this.increase(), 1000);
  }

  //untuk stop setinterval yang berjalan terus menerus
  componentWillUnmount(){
    clearInterval(this.addInterval)
  }

  increase(){
    // update state setiap detik
    this.setState((state, props) => ({
      time: parseInt(state.time) + 1
    }))
  }

  render(){
    return(
      <div> {this.state.time} detik </div>
    );
  }
}

// lat3 handle event
// handle event pada react menggunalan function
function Clicker(){
  function handleClick(e){
    alert('berhasil di kilk');

    //prefenDefault method yang berfungsi untuk mencegah terjadinya event bawaan dari sebuah DOM untuk mencegah reload halaman yang dilink kan 
    // merubah sifat aslinya yaitu reload
    e.preventDefault()
  }

  return (
    <a href="#" onClick={handleClick}> Klik disini! </a>
  );

}

//handle event menggunakan class
class Toggle extends Component{
  constructor(props){
    super(props)
    this.state = {
      toggleStatus : true
    }

    this.handleClick = this.handleClick.bind(this)
  }
  handleClick (){
    this.setState(state => ({
      toggleStatus : !state.toggleStatus
    }))
  }

  render(){
    return (
      <button onClick={this.handleClick}>
        {this.state.toggleStatus ? 'on' : 'off'}
        <p>Kondisi sekarang {this.state.toggleStatus ? 'nyala' : 'mati'}</p>
      </button>
    )
  }
}

// mutable =  mengubah objek aslinya 
// immutable = menhcopy objek sebelumnya lalu copyannya diubah yang original tidak terganggu


class Api extends Component{
  constructor(props){
    super(props)
    this.state ={
      item : []
    }
  }

  // component did mount yang akan otomatis diajalankan
  componentDidMount(){
      // fecth fungsi native pada js untuk mengambil data api
      fetch("https://jsonplaceholder.typicode.com/users")
      .then(response => response.json())
      .then(data => this.setState({item : data}))
  }

  render(){
    const {item} = this.state
    return(
      <div>
        <ul>
          {item.map((item, index) => <li key={index}>{item.email}</li>)}
        </ul>
      </div>
    )
  }
}


class App extends Component{

// lat4 todolist 
// input yang diketim oleh user dan tombol untuk menambahkan datanya
  constructor(props){
    super(props)
    this.state = {
      todoItem : '',
      item : []
    }
  }

  handaleSubmit = (event) => {
    event.preventDefault()
    this.setState({
      // concat unutk menggabungkan array dengan string 
      item     : [...this.state.item, this.state.todoItem],
      todoItem : ''
    })
  }

  handleChange = (event) =>{
    this.setState({
      todoItem : event.target.value
    })
  }   

  render(){
    return(
      <div>
        <div className="App">
          <header className="App-header">
            <Api />

            <Toggle />
            <form onSubmit={this.handaleSubmit}>
                <input value={this.state.todoItem} onChange={this.handleChange} />
                <button>add</button>
            </form>
            <List item={this.state.item}/>

            <Timer start="0"/>
            <Timer start="10"/>
            <ul>
            <li>
            <Devisi  bagian="IT Developer"/>
            </li>
            <li>
              <Data  nama="Ilham Maarif"/>
            </li>
            </ul>
            <Clicker/>
          </header>
          
          
        </div>
      </div>
          
    );
  }
}


export default App;

