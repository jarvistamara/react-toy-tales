import React from 'react';
import './App.css';

import Header from './components/Header'
import ToyForm from './components/ToyForm'
import ToyContainer from './components/ToyContainer'


class App extends React.Component{
 
  state = {
    display: false,
    toys: []
  }

  componentDidMount() {
    fetch('http://localhost:3001/toys') 
    .then(response => response.json())
    .then(data =>{
      this.setState({
        ...this.state,
        toys: data
      })
    })
  }

  handleClick = () => {
    let newBoolean = !this.state.display
    this.setState({
      display: newBoolean
    })
  }

    addToy = (toy) => {
      let newToy = {
        name: toy.name,
        image: toy.image,
        likes: 0
      }
    
      let fetchHeader = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(newToy)
      }

      fetch('http://localhost:3001/toys', fetchHeader)
      .then(response => response.json())
      .then(toy => {
        this.setState({
          toys: [...this.state.toys, toy],
        })
        let newBoolean = ! this.state.display
        this.setState({
          display: newBoolean
        })
      })
    }

    donateToy = (toyId) => {
      let fetchHeader = {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'},
      }

      fetch('http://localhost:3001/toys', fetchHeader)
      .then(response => response.json())
      .then(() => {
        this.setState({
          toys: this.state.toys.filter(toy => toy.id !== toyId)
        })
      })
    }


  likeToy = (toyID, prevLikes) => {
    let newLikes = {
      likes: prevLikes + 1,
    }

    let fetchHeader = {
      method: 'PATCH',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(newLikes)
    }
    fetch(`http://localhost:3001/toys/${toyID}`, fetchHeader)
    .then(response => response.json())
    .then(toy => {
      let newToys = this.state.toys
      newToys.map(toy => {
        if (toy.id === toyID) {
          toy.likes = toy.likes + 1
          return toy
        } else {
          return toy
        }
      })
      this.setState({
        toys: newToys
      })
    })
  }

  render(){
    return (
      <>
        <Header/>
        { this.state.display
            ?
          <ToyForm addToy={this.addToy} />
            :
          null
        }
        <div className="buttonContainer">
          <button onClick={this.handleClick}> Add a Toy </button>
        </div>
        <ToyContainer toys={this.state.toys}  likeToy={this.likeToy} 
        donateToy={this.donateToy} />
      </>
    )
  }
}
export default App;
