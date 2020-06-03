import React, { Component, Fragment,useEffect } from "react";
import PropTypes from "prop-types";
import axios from 'axios';

class Autocomplete extends Component {
  static propTypes = {
    suggestions: PropTypes.instanceOf(Array)
  };

  static defaultProps = {
    suggestions: []
  };

  constructor(props) {
    super(props);

    this.state = {
      // The active selection's index
      activeSuggestion: 0,
      // The suggestions that match the user's input
      filteredSuggestions: [],
      // Whether or not the suggestion list is shown
      showSuggestions: false,
      // What the user has entered
      userInput: ""
    };
  }

  onChange = e => {
    const { suggestions } = this.props;
    const userInput = e.currentTarget.value;

    // Filter our suggestions that don't contain the user's input
    const filteredSuggestions = suggestions.filter(
      suggestion =>
        suggestion.toLowerCase().indexOf(userInput.toLowerCase()) > -1
    );

    this.setState({
      activeSuggestion: 0,
      filteredSuggestions,
      showSuggestions: true,
      userInput: e.currentTarget.value
    });
  };

  onClick = e => {
    this.setState({
      activeSuggestion: 0,
      filteredSuggestions: [],
      showSuggestions: false,
      userInput: e.currentTarget.innerText
    });
  };

  onKeyDown = e => {
    const { activeSuggestion, filteredSuggestions } = this.state;

    // User pressed the enter key
    if (e.keyCode === 13) {
      this.setState({
        activeSuggestion: 0,
        showSuggestions: false,
        userInput: filteredSuggestions[activeSuggestion]
      });
    }
    // User pressed the up arrow
    else if (e.keyCode === 38) {
      if (activeSuggestion === 0) {
        return;
      }

      this.setState({ activeSuggestion: activeSuggestion - 1 });
    }
    // User pressed the down arrow
    else if (e.keyCode === 40) {
      if (activeSuggestion - 1 === filteredSuggestions.length) {
        return;
      }

      this.setState({ activeSuggestion: activeSuggestion + 1 });
    }
  };
  myfunction(){
       
    var input=document.getElementById('input').value
    console.log(input)
    var result=document.getElementById('result')
    result.innerHTML=""
    result.innerHTML +=`
                   <table>
                   <tr>
                       <th>Medicine</th>
                       <th>Saltname</th> 
                       <th>Manufacturer</th>
                       <th>MRP</th>
                       <th>Packsize</th>
                   </tr>
               </table>
    `
    return axios
     .post('http://localhost:5000/api/data_merged/get_medicines',{input},{responseType: 'application/json'}, {
         headers: { "Content-type": "application/json" }
     })
     .then(res => {
        //console.log(res.data.var1.json())
        console.log(res.data)
        console.log(typeof(res.data))
        var t=JSON.parse(res.data.var1)
        console.log(t)
        console.log(t.length)
        
        for(var i=0;i<t.length;i++){
           result.innerHTML +=`<table>
           <tr>
       <td>`+t[i].medName+`</td>
       <td>`+t[i].salt+`</td>
       <td>`+t[i].manufacturer+`</td> 
       <td>`+t[i].onemg_price+`</td>
       <td>`+t[i].quantity_in_pack+`</td>
       
     </tr>
     </table>
           `
        }
        
     
       }
     )

  }

  render() {
    const {
      onChange,
      onClick,
      onKeyDown,
      state: {
        activeSuggestion,
        filteredSuggestions,
        showSuggestions,
        userInput
      }
    } = this;

    let suggestionsListComponent;

    if (showSuggestions && userInput) {
      if (filteredSuggestions.length) {
        suggestionsListComponent = (
          <ul class="suggestions">
            {filteredSuggestions.map((suggestion, index) => {
              let className;

              // Flag the active suggestion with a class
              if (index === activeSuggestion) {
                className = "suggestion-active";
              }

              return (
                <li className={className} key={suggestion} onClick={onClick}>
                  {suggestion}
                </li>
              );
            })}
          </ul>
        );
      } else {
        suggestionsListComponent = (
          <div class="no-suggestions">
            <em>No suggestions, you're on your own!</em>
          </div>
        );
      }
    }

    return (
      <Fragment>
        <input
          id="input"
          placeholder="Type a drug name (like Atorvastin,Sildenafil,etc)"
          type="text"
          onChange={onChange}
          onKeyDown={onKeyDown}
          value={userInput}
        />
        <button className="search" type="submit" onClick={this.myfunction}>FIND THE LOWEST PRICES</button>
        {suggestionsListComponent}
        <div id="result">
              <table>
                  <tr>
                      <th>Medicine</th>
                      <th>Saltname</th> 
                      <th>Manufacturer</th>
                      <th>MRP</th>
                      <th>Packsize</th>
                  </tr>
              </table>
          </div>
      </Fragment>
      
    );
  }
}

export default Autocomplete;
