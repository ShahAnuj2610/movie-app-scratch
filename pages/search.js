import React from 'react';
import {
 MultiList, MultiDataList, RangeSlider, ReactiveList,
} from '@appbaseio/reactivesearch';
import {
 Content, Footer, Header, Container,
} from '../components/Layout';
import SearchBox from '../components/SearchBox';
import ProductCard from '../components/Product/ProductCard';

const SearchPage = () => (
  <Container title="Search">
    <Header />
    <Content>
      <SearchBox />
      <MultiList
        componentId="year-list"
        dataField="release_year"
        size={20}
        sortBy="desc"
        queryFormat="or"
        selectAllLabel="All"
        showCheckbox
        showSearch
        placeholder="Search for a Year"
        react={{
          and: ['SearchSensor', 'results', 'price', 'language-list'],
        }}
        showFilter
        showCount={false}
        filterLabel="Year"
        URLParams={false}
      />
      <MultiDataList
        componentId="language-list"
        dataField="original_language.keyword"
        size={100}
        sortBy="asc"
        queryFormat="or"
        selectAllLabel="All Languages"
        showCheckbox
        showSearch
        placeholder="Search for a language"
        react={{
          and: ['SearchSensor', 'results', 'price', 'year-list'],
        }}
        data={[
          {
            label: 'English',
            value: 'en',
          },
          {
            label: 'Chinese',
            value: 'cn',
          },
          {
            label: 'Turkish',
            value: 'tr',
          },
        ]}
        showFilter
        filterLabel="Language"
        URLParams={false}
      />
      <RangeSlider
        componentId="price"
        react={{
          and: ['SearchSensor', 'language-list', 'year-list'],
        }}
        dataField="price"
        range={{
          start: 0,
          end: 1500,
        }}
        showHistogram={false}
        rangeLabels={{
          start: '$0',
          end: '$1500',
        }}
      />
      <ReactiveList
        componentId="results"
        dataField="original_title"
        react={{
          and: [
            'SearchSensor',
            'price',
            'language-list',
            'year-list',
          ],
        }}
        pagination
        paginationAt="bottom"
        pages={5}
        size={4}
        Loader="Loading..."
        noResults="No results were found..."
        sortOptions={[
          {
            dataField: 'popularity',
            sortBy: 'desc',
            label: 'Sort by Popularity(High to Low)\u00A0 \u00A0',
          },
          {
            dataField: 'price',
            sortBy: 'asc',
            label: 'Sort by Price(Low to High) \u00A0',
          },
          {
            dataField: 'vote_average',
            sortBy: 'desc',
            label: 'Sort by Ratings(High to Low) \u00A0',
          },
          {
            dataField: 'original_title.keyword',
            sortBy: 'asc',
            label: 'Sort by Title(A-Z) \u00A0',
          },
        ]}
        renderItem={(res) => (
          <ProductCard
            id={res.id}
            posterPath={res.poster_path}
            originalTitle={res.original_title}
            releaseYear={res.release_year}
            genresData={res.genres_data}
            overview={res.overview}
            price={res.price}
            voteAverage={res.vote_average}
          />
        )}
      />
    </Content>
    <Footer />
  </Container>
);
export default SearchPage;
