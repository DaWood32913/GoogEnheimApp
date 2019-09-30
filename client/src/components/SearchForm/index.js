import React, {Component} from "react";
import Axios from "axios";
// import { Link } from "react-router-dom";
import { List, ListItem } from "../List";
import ImageCard from "../ImageCard";
import { NavBar } from "../NavBar";
import { Logo } from "../Logo";
import "./style.css";
import _ from "lodash";

class SearchForm extends Component {

  constructor (props) {
    super(props)
    this.state = {
      name: "",
      serverResponse: []
    }
    this.handleArtistSubmit.bind(this);
  }

  handleInputChange = (event) => {
    const { name, value } = event.target;

    // Set the state for the appropriate input field
    this.setState({
      [name]: value
    });

  }
  
  handleArtistSubmit = (event) => {
    event.preventDefault();
    console.log("inside handleArtistSubmit")
    Axios.get("/api/artists/", {
      params: {
        name: this.state.name
      }
    })
    .then(res => {
      console.log('handleArtistSubmit: res: ', res);
    this.setState({serverResponse: res.data});
    })
  }

  handleSaveArtist = (event) => {
    event.preventDefault();
    debugger;

    let selectedArtwork = _.find(this.state.serverResponse, { '_id': event.target.dataset.id});
    Axios.post("/saved", selectedArtwork);
  }
  
  render() {
    return (
      <div className="searchForm">
        <div className="header">
            <Logo />
            <NavBar />
            <div className="container">
                <form className="form-group" action="/" method="GET">
                  <input 
                    name="name"
                    type="text" 
                    className="form-control" 
                    placeholder="Search for artist" 
                    onChange={this.handleInputChange} />
                  <button 
                    type="submit" 
                    className="btn-search" 
                    onClick={this.handleArtistSubmit}>
                      Search
                  </button>
                </form>
            </div>
        </div>
        <div>
          <div>
            {this.state.serverResponse.length ? (
              <List>
                {this.state.serverResponse.map(card => (
                  <ListItem 
                    key={card._id}
                    alt={card.Artist} 
                    image={card.ThumbnailURL}>
                    <ImageCard 
                    thumbnail={card.ThumbnailURL} 
                    cardId={card._id}
                    title={card.Title} 
                    date={card.Date} 
                    medium={card.Medium}
                    name={card.Artist} 
                    nationality={card.Nationality}
                    handleSaveArtist={this.handleSaveArtist} 
                    /> 
                  </ListItem>
                ))}
            </List>
            ) : (
              <h3>No Results to Display</h3>
            )}
          </div>
          {/* TESTING PURPOSEs */}
          <pre>{JSON.stringify(this.state, null, 2)}</pre>
        </div>
      </div>
    );
  }
}
export default SearchForm;