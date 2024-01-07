import './index.css';
import React from "react";
import ReactDOM from "react-dom";
import axios from 'axios';

class DogPic extends React.Component {
    constructor(props){
        super(props)
      
        this.state = { image: "https://pdtxar.com/wp-content/uploads/2019/04/person-placeholder.jpg",
        breed:'random',
      }
    }
    
    async handleClick(){
       this.fetchData(this.state.breed);
        
    }
    async fetchData(breed){
      let url;
      if(breed==='random'){
         url =`https://dog.ceo/api/breeds/image/random`;
      }else{
        url =`https://dog.ceo/api/breed/${breed}/images/random`;

      }
      try{
        const res = await axios.get(url);
        if(res.status===200 && res.data.status==='success'){
            this.setState({...this.state,image:res.data.message});
        }
        else{
          throw new Error('Error getting Data');
        }

      }
      catch(e){
        alert("Something went wrong");
      }
    
    }
  componentDidUpdate(prevP,prevS){
    if(prevS.breed!==this.state.breed){
      this.fetchData(this.state.breed);

    }
  }
  componentDidMount(){
    this.fetchData(this.state.breed);
  }
   handleChange(e){
    // console.log(this);
    this.setState(prev=>
        ({...prev,breed:e.target.value}));
    
  }

    render() {
      // console.log(this);
   const {image,breed} = this.state;
   const breed_list = ['Random','Beagle','Boxer','Dalmatian','Husky',]


    return (
        <div style={{maxWidth:'50vw'}}>
        <select value={breed} onChange={e=>this.handleChange(e)}>
          {breed_list.map(item=>(<option key ={item} value={item.toLowerCase()}>{item}</option>))}
          </select> 
          <img src={image} alt="person" />    
            
            <button onClick={()=>this.handleClick()}>next</button>
           
           
            
      </div>);
    }
  }
  class App extends React.Component{
    render(){
        return (
            <>
              <DogPic/>
            </>
        )
    }
  }

ReactDOM.render(<App/>, document.querySelector("#root"));
// ReactDOM.render(containerDivElement, document.querySelector("#root2"));

