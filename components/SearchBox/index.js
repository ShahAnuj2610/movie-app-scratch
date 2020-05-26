import React from 'react';
import { DataSearch } from '@appbaseio/reactivesearch';

const SearchBox = () => (
        <DataSearch
          componentId="SearchSensor"
          dataField={['original_title']}
          queryFormat="and"
          autosuggest={false}
          filterLabel="search"
          URLParams
        />
      );


export default SearchBox;
