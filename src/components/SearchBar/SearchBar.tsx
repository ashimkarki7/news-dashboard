
import React, {useState, useCallback, useEffect} from 'react'
import {useAppDispatch, useAppSelector} from '@/store/reduxHook.ts';
import { debounce } from '@/Utility/debounce';
import {getNews} from '@pages/HomePage/slice/slice.ts';
import type {NewsQueryParams} from '@pages/HomePage/types/new.ts';


interface SearchBarProps {
  selectedChannel: string | null;
  setSelectedChannel: (id: string) => void;

}

const SearchBar: React.FC<SearchBarProps> = (props) => {
  const {selectedChannel,setSelectedChannel} = props;
  const dispatch = useAppDispatch();
  const loading = useAppSelector((state) => state.newsData.loading);
  const [query, setQuery] = useState('');

  const debouncedSearch = useCallback(
      debounce((value: string) => {
        const payload: NewsQueryParams = value ? { q: value,searchIn: 'title,description', sources: selectedChannel ?? '' } : {};
        dispatch(getNews(payload));
      }, 500),
      [dispatch]
  );

  useEffect(() => {
    debouncedSearch(query.trim());
  }, [query, debouncedSearch]);

  const handleClear = () => {
    setQuery('');
    setSelectedChannel('');
    dispatch(getNews({}));
  };

  return (
      <div className="text-center">
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="row justify-content-center">
            <div className="col-md-8 col-lg-6">
              <div className="input-group input-group-lg">
                <input
                    type="text"
                    className="form-control bg-dark bg-opacity-25 border-light border-opacity-25 text-white"
                    placeholder="Search breaking news, trending topics, or specific stories..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    disabled={loading}
                    style={{
                      borderRadius: '50px 0 0 50px',
                      paddingLeft: '25px',
                    }}
                />
                <button
                    type="button"
                    className="btn btn-primary"
                    disabled={loading}
                    style={{ borderRadius: '0 50px 50px 0' }}
                >
                  <i className="fas fa-search"></i>
                </button>
              </div>
            </div>
          </div>
        </form>

        {query && (
            <div className="text-center mt-3">
          <span className="badge bg-light text-dark me-2">
            {`Showing results for: "${query}"`}
          </span>
              <button
                  className="btn btn-sm btn-outline-light"
                  onClick={handleClear}
                  disabled={loading}
              >
                <i className="fas fa-times me-1"></i>Clear
              </button>

            </div>
        )}
        {selectedChannel && (
        <div className="text-center mt-3">
                  <span className="badge bg-light text-dark me-2">
        from source: {selectedChannel}

          </span>
              <button
                  className="btn btn-sm btn-outline-light"
                  onClick={handleClear}
                  disabled={loading}
              >
                <i className="fas fa-times me-1"></i>Clear
              </button>
            </div>
            )}

      </div>
  );
};

export default React.memo(SearchBar)
