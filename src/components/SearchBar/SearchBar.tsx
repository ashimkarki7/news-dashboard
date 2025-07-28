
import React, { useEffect, type Dispatch, type SetStateAction, useRef} from 'react'
import {useAppDispatch, useAppSelector} from '@/store/reduxHook.ts';
import { debounce } from '@/Utility/debounce';
import {getNews} from '@pages/HomePage/slice/slice.ts';
import type {NewsFilters, NewsQueryParams} from '@pages/HomePage/types/new.ts';


interface SearchBarProps {
    filters: NewsFilters;
    setFilters: Dispatch<SetStateAction<NewsFilters>>;

}

const SearchBar: React.FC<SearchBarProps> = (props) => {
    const inputRef = useRef<HTMLInputElement>(null);

    const isFirstRender = useRef(true);
    const {filters,setFilters} = props;
  const dispatch = useAppDispatch();
  const loading = useAppSelector((state) => state.newsData.loading);

    const debouncedSearch = useRef(
        debounce((value: string, selectedChannel: string | null) => {
            const payload: NewsQueryParams = value
                ? {
                    q: value,
                    searchIn: 'title,description',
                    sources: selectedChannel ?? '',
                    page: 1,
                    pageSize: 20,
                }
                : { page: 1, pageSize: 20 };
            dispatch(getNews(payload));
        }, 500)
    ).current;

  useEffect(() => {
      if (isFirstRender.current) {
          isFirstRender.current = false;
          return;
      }
      debouncedSearch(filters.query.trim(), filters.selectedChannel);
  }, [filters?.query]);

  const handleClear = () => {
      setFilters((prev) => ({
          ...prev,
          query: '',
          category:'',
          selectedChannel: '',
          page: 1,
          pageSize: 20,
      }));
    dispatch(getNews({ page: 1, pageSize: 20}) )
        .then(() => {
            console.log('in')
            inputRef.current?.focus();
        })
        .catch((err) => {
            console.error('API call failed:', err);
        });
  };

  return (
      <div className="text-center">
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="row justify-content-center">
            <div className="col-md-8 col-lg-6">
              <div className="input-group input-group-lg">
                <input
                    ref={inputRef}
                    type="text"
                    className="form-control bg-dark bg-opacity-25 border-light border-opacity-25 text-white"
                    placeholder="Search breaking news, trending topics, or specific stories..."
                    value={filters?.query}
                    onChange={(e) =>
                        setFilters((prev) => ({
                            ...prev,
                            query: e.target.value,
                            category:'',
                            selectedChannel: '',
                            page: 1,
                            pageSize: 20,
                        }))
                       }
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

        {filters?.query && (
            <div className="text-center mt-3">
          <span className="badge bg-light text-dark me-2">
            {`Showing results for: "${filters?.query}"`}
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
        {filters?.selectedChannel && (
        <div className="text-center mt-3">
                  <span className="badge bg-light text-dark me-2">
        from source: {filters?.selectedChannel}

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
