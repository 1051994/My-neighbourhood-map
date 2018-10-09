import Draggable from 'react-draggable';
import React from 'react';


class About_LocScreen extends React.Component {
    // render sidebar contain header , function return  square of search ,list of places 
    render() {
      const { Loc } = this.props;
  
      return (
      <Draggable>
        <article className='show' >
          <h1 className='Place_Info' >Place Info</h1>
          <h2 className='PlaceName'>{Loc.name}</h2>
          <p className='Close_Show' onClick={() => {this.props.Exit_win()}} > X </p>
          <p className='Address'> Address: {Loc.location.address}, {Loc.location.city}</p>
          <p className='Set'>TypeOfPlace: {Loc.categories[0].name}</p>        
        </article>
      </Draggable>
      )
    }
  }

  export default About_LocScreen;


  