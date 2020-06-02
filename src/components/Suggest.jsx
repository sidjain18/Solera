import * as React from 'react';
import fetchJsonp from 'fetch-jsonp';
import styled from 'styled-components';


import { StateProvider, DebouncePropagator, AsyncResolver } from 'reenhance-components';


const Dropdown = styled.div`
  position: relative;
  font: normal .8em sans-serif;
`;

const Input = styled.input`
  margin: 0;
  border: 1px solid silver;
  border-radius: 3px;
  font-family: inherit;
  font-size: 100%;
  -webkit-appearance: searchfield;
`;

const SuggestsUl = styled.ul`
  position: absolute;
  z-index: 1;
  top: 5px;
  padding: 0;
  border: 1px solid silver;
  background-color: white;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  list-style: none;
`;

const SuggestsLi = styled.li`
  padding: 0 10px;
  cursor: pointer;
  &:hover {
    background-color:silver;
  }
`;


const queryToUrl =
  query => `http://localhost:5000/api/data_merged/get_medicines?medName=${query}`;

const asyncFetch =
  ({ query }) =>
    fetchJsonp(queryToUrl(query))
      .then(res => res.json());

      const SuggestAsyncResolver = AsyncResolver('query', []);

      const Suggests = ({ query }) => (
        <SuggestAsyncResolver query={query} subject={asyncFetch}>
          {props => (
            <ul>
              {props[1] && props[1].length > 0 ? props[1].map(str => (
                <li key={str}>{str}</li>
              )) : <li>No results</li>}
            </ul>
          )}
        </SuggestAsyncResolver>
      );

      const InputState = StateProvider('');
      const SuggestDebounce = DebouncePropagator({ query: '' });
      
      export const SuggestedInput = () => (
        <div className="inputsearch">
        <InputState>
          {({ state: query, setState: setQuery }) => (
            <div>
              <div class="inner-addon left-addon">
              <i class="glyphicon glyphicon-user"></i>
              <input type="search" placeholder="Type a drug name (like Atorvastin,Sildenafil,etc)" value={query} onChange={e => setQuery(e.target.value)} />
              <button className="search" type="submit">FIND THE LOWEST PRICES</button>
              </div>
              <SuggestDebounce
                time={200}
                query={query}
              >
                {({ query, state }) => (
                  <div>
                    {query && <Suggests query={query}/>}
                  </div>
                )}
              </SuggestDebounce>
            </div>
          )}
        </InputState>
       
        </div>
      );
      

  // const SEARCH_URI = 'http://localhost:5000/api/data_merged/get_medicines';

  //     export const AsyncExample = () => {
  //       const [isLoading, setIsLoading] = useState(false);
  //       const [options, setOptions] = useState([]);
      
  //       const handleSearch = useCallback((query) => {
  //         setIsLoading(true);
      
  //         fetch(`${SEARCH_URI}?q=${query}`)
  //           .then((resp) => resp.json())
  //           .then(({ items }) => {
  //             const options = items.map((i) => ({
  //               medName: i.medName,
  //               salt: i.salt,
  //               url: i.url,
  //             }));
      
  //             setOptions(options);
  //             setIsLoading(false);
  //           });
  //       });
      
  //       return (
  //         <AsyncTypeahead
  //           id="async-example"
  //           isLoading={isLoading}
  //           labelKey="medName"
  //           minLength={3}
  //           onSearch={handleSearch}
  //           options={options}
  //           placeholder="Type a drug name (like Atorvastin,Sildenafil,etc)"
  //           renderMenuItemChildren={(option, props) => (
  //             <div>
  //               <span>{option.medName}</span>
  //             </div>
  //           )}
  //         />
  //       );
  //     };
    
 
