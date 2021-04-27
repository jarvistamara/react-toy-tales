import React from 'react';
import ToyCard from './ToyCard'

const ToyContainer = (props) => {
  const toyCards = props.toys.map(toy => <ToyCard name={toy.name} image={toy.image} likes={toy.likes} /> )
  return(
    <div id="toy-collection">
      {toyCards}
    </div>
  );
}

export default ToyContainer;
