import React, { Component } from 'react';
import Geocode from 'react-geocode';
import escapeRegExp from 'escape-string-regexp';
Geocode.setApiKey('AIzaSyBMsiraNHO17myp7iRIhMmn1ZLIjEFpuOA&&callback=initMAP');

class About_Loc extends Component {
  state = {
    Loc_List: [],
    q: ''
  }


  constructor(props) {
       super(props);
       this.Found = this.Found.bind(this);
       this.Search_Update = this.Search_Update.bind(this);
       this.Back_Places = this.Back_Places.bind(this);
       this.Filter_Locations = this.Filter_Locations.bind(this);
       this.Googleplex = this.Googleplex.bind(this);
     }


     Found() {
      const { q } = this.state;
  
      return <input className='filter' type='text' value={q} role="search" aria-label="searchbutton" 
        onChange={event => this.Search_Update(event.target.value)} placeholder='Filter Locations' />
    }


    Search_Update (q) {
      this.setState({ q }, () => {this.props.Mar_option(this.Filter_Locations());});
    }

    Back_Places (){
      return (
        <ol className='location' role='listbox' aria-label='Location _list'  >
          {this.Filter_Locations().map((t, num) =>
            <li
                tabIndex="0"  className='place' key={num}   role='option' onClick={() => {this.props.On_Loc(num)}}> {t.name}
            </li>
          )}
        </ol>
      )
    }

    // while search(query) empty return all loaction
    Filter_Locations() {
      const { q, Loc_List } = this.state;
  
      while(this.state ==='') {
        return Loc_List;
      }
      return Loc_List.filter(t => new RegExp(escapeRegExp(q), 'i').test(t.name));
    }
  
// design of location ,and aapearing location from categoryId
Googleplex(){
   Geocode.fromAddress("Googleplex").then(Res => {
        const { lat, lng } = Res.results[0].geometry.location;
        this.props.Four_Sq.venues.getVenues({
          'll': `${lat},${lng}`,
          'categoryId': '52f2ab2ebcbc57f1066b8b2e'
        }).then(s => {
          const v = s.response.venues;
          this.props.Mar_option(v);
          this.setState({ Loc_List: v });
        });
      }
    );
}

  componentDidMount() {
   this.Googleplex();
  }

  render() {
    return (
      <div>
        <div className='Nav'>
          <div className='heading' role='heading' >
            <h1 className='Tittle'>Locations</h1>
            {this.Found()}
          </div>
          <div className='Place_List' role='region'>
            {this.Back_Places()}
          </div>
        </div>
        
      </div>
    );
  }
}

  export default About_Loc;
