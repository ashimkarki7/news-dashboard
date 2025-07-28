import {type Dispatch, type FC, type SetStateAction,Fragment, memo, } from 'react';
import type {NewsFilters, NewsSource} from '@pages/HomePage/types/new.ts';


interface DashboardOverviewProps {
    filters: NewsFilters;
    setFilters: Dispatch<SetStateAction<NewsFilters>>;
    overViewChannels: NewsSource[];
    overViewLoading:boolean;
}

const DashboardOverview: FC<DashboardOverviewProps> = (props) => {
    const {overViewChannels,filters,setFilters,overViewLoading} = props;


    return (<div className="mb-5">
            <div className="d-flex  align-items-center mb-4 ">
                <h2 className="text-white fw-bold mb-0 ">
                    <i className="fas fa-chart-line me-3"></i>
                    {`Sources ${filters?.selectedChannel ? `from ${filters?.selectedChannel}` : ''}`}
                </h2>
            </div>

            <div className="d-flex flex-column flex-md-row align-items-center align-items-md-center gap-3">
                <button
                    className="btn btn-outline-light rounded-circle p-3 d-none d-md-flex align-items-center justify-content-center order-md-1"
                    type="button"
                    data-bs-target="#dashboardMetricsCarousel"
                    data-bs-slide="prev"
                    style={{width: '60px', height: '60px', flexShrink: 0}}
                >
                    <i className="fas fa-chevron-left"></i>
                </button>

                <div className="flex-grow-1 order-md-2">
                    <div
                        id="dashboardMetricsCarousel"
                        className="carousel slide mb-4"
                        data-bs-ride="carousel"
                        data-bs-interval="4000"
                    >
                        <div className="carousel-inner">
                            {overViewLoading ? (
                                <div className="carousel-item active">
                                    <div className="row g-3 g-md-4 justify-content-center">
                                        {Array.from({ length: 3 }).map((_, index) => (
                                            <div key={index} className="col-12 col-sm-6 col-lg-4">
                                                <div className="card bg-dark bg-opacity-25 border-light border-opacity-25 h-100">
                                                    <div className="card-body">
                                                        <div className="d-flex align-items-center justify-content-between mb-3">
                                                            <div
                                                                className="bg-secondary rounded-3 p-3 d-flex align-items-center justify-content-center shimmer"
                                                                style={{ width: "50px", height: "50px" }}
                                                            >
                                                                <div className="spinner-border spinner-border-sm text-light" role="status">
                                                                    <span className="visually-hidden">Loading...</span>
                                                                </div>
                                                            </div>
                                                            <div
                                                                className="bg-secondary rounded shimmer"
                                                                style={{ width: "40px", height: "20px" }}
                                                            ></div>
                                                        </div>

                                                        <div
                                                            className="bg-secondary rounded shimmer mb-1"
                                                            style={{ width: "80%", height: "40px" }}
                                                        ></div>
                                                        <div
                                                            className="bg-secondary rounded shimmer mb-2"
                                                            style={{ width: "60%", height: "20px" }}
                                                        ></div>
                                                        <div
                                                            className="bg-secondary rounded shimmer"
                                                            style={{ width: "90%", height: "16px" }}
                                                        ></div>

                                                        <div className="progress mt-3" style={{ height: "3px" }}>
                                                            <div className="progress-bar bg-secondary shimmer" style={{ width: "100%" }}></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                ) :(
                                    <Fragment>
                                        { Array?.from({length: Math.ceil(overViewChannels?.length / 3)})?.map((_, slideIndex) => (
                                            <div key={slideIndex} className={`carousel-item ${slideIndex === 0 ? 'active' : ''}`}>
                                                <div className="row g-3 g-md-4 justify-content-center">
                                                    {overViewChannels?.slice(slideIndex * 3, slideIndex * 3 + 3)?.map((metric, index) => (
                                                        <div key={slideIndex * 3 + index} className="col-12 col-sm-6 col-lg-4"
                                                        >
                                                            <div
                                                                onClick={() =>
                                                                    setFilters((prev) => ({
                                                                        ...prev,
                                                                        query:'',
                                                                        category:'*',
                                                                        selectedChannel: metric?.id,
                                                                        page: 1,
                                                                        pageSize: 20,
                                                                    }))}
                                                                style={{
                                                                    cursor: "pointer",
                                                                    backgroundColor:
                                                                        filters?.selectedChannel === metric?.id ? "rgba(13, 110, 253, 0.3)" : 'rgba(33, 37, 41, 0.25)',
                                                                }}
                                                                className={`card   bg-opacity-25 border-light border-opacity-25 h-100
                                                    ${
                                                                    filters?.selectedChannel === metric?.id ? "border-primary border-2" : "bg-dark"
                                                                }
                                                    `}>
                                                                <div className="card-body">
                                                                    <div
                                                                        className="d-flex align-items-center justify-content-between mb-3">
                                                                        <div
                                                                            className={`bg-primary rounded-3 p-3 d-flex align-items-center justify-content-center`}
                                                                            style={{width: '50px', height: '50px'}}
                                                                        >
                                                                            <i className={`fas fa-newspaper text-white`}></i>
                                                                        </div>
                                                                        <span
                                                                            className={`badge bg-success`}
                                                                        >
                               Language : {metric?.language?.toUpperCase()}
                              </span>
                                                                    </div>

                                                                    <div className="h2 text-white fw-bold mb-1">{metric.name}</div>
                                                                    <div
                                                                        className="text-white-50 fw-semibold mb-2">Country {metric?.country || '-'}</div>
                                                                    <div className="text-white-50 small">{metric.description}</div>
                                                                </div>
                                                            </div>
                                                        </div>))}
                                                </div>
                                            </div>))}
                                    </Fragment>
                            )}

                        </div>
                    </div>

                    <div className="text-center">
                        <div className="carousel-indicators position-static m-0 d-inline-flex">
                            {overViewChannels?.length > 0 && Array.from({length: Math.ceil(overViewChannels?.length / 3)}).map((_, index) => (
                                <button
                                    key={index}
                                    type="button"
                                    data-bs-target="#dashboardMetricsCarousel"
                                    data-bs-slide-to={index}
                                    className={index === 0 ? 'active' : ''}
                                    aria-current={index === 0 ? 'true' : 'false'}
                                    aria-label={`Slide ${index + 1}`}
                                    style={{
                                        width: '12px',
                                        height: '12px',
                                        borderRadius: '50%',
                                        backgroundColor: 'rgba(255,255,255,0.5)',
                                        border: '2px solid rgba(255,255,255,0.8)',
                                    }}
                                ></button>))}
                        </div>
                        <div className="d-md-none mt-3">
                            <small className="text-white-50">
                                <i className="fas fa-hand-paper me-2"></i>
                                Swipe to navigate
                            </small>
                        </div>
                    </div>
                </div>

                <button
                    className="btn btn-outline-light rounded-circle p-3 d-none d-md-flex align-items-center justify-content-center order-md-3"
                    type="button"
                    data-bs-target="#dashboardMetricsCarousel"
                    data-bs-slide="next"
                    style={{width: '60px', height: '60px', flexShrink: 0}}
                >
                    <i className="fas fa-chevron-right"></i>
                </button>
            </div>
        </div>)
}

export default memo(DashboardOverview)
