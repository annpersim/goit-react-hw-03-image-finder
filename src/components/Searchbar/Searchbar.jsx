import { Component } from 'react';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import { fetchImages } from 'services/api';
import {
  SearchButton,
  SearchForm,
  SearchInput,
  Header,
  SearchLabel,
} from './Searchbar.styled';

export class Searchbar extends Component {
  state = {
    query: '',
  };

  PropTypes = {
    handleFormSubmit: PropTypes.func.isRequired,
  };

  handleInputChange = e => {
    this.setState({ query: e.currentTarget.value.toLowerCase() });
  };

  handleSubmit = async e => {
    e.preventDefault();

    const searchQuery = this.state.query.trim();

    if (searchQuery === '') {
      return toast.warning('Enter data!');
    }

    try {
      const data = await fetchImages(searchQuery, 1);
      if (data.hits.length === 0) {
        return toast.warning('No images!');
      }
      this.props.handleFormSubmit(data.hits, searchQuery, data.totalHits);
      this.setState({ query: '' });
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <Header>
        <SearchForm onSubmit={this.handleSubmit}>
          <SearchButton type="submit">
            <SearchLabel>Search</SearchLabel>
          </SearchButton>

          <SearchInput
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.handleInputChange}
          />
        </SearchForm>
      </Header>
    );
  }
}
