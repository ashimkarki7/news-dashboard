import HeaderStyles from '../Header/Header.module.css';

export const Header = () => {
  return (
    <header id="Header" className={`${HeaderStyles?.glass_navbar} sticky-top`}  >
      <div className="container-fluid">
        <nav className="navbar navbar-expand-lg">
          <div className="container-fluid">
            <a className="navbar-brand d-flex align-items-center" href="#">
              <i className="fas fa-newspaper me-3 fs-2 text-white"></i>
              <span className="gradient-text fs-2 fw-bold">NewsHub Pro</span>
            </a>

            <button
                className="navbar-toggler border-0"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNav"
                style={{ color: "white" }}
            >
              <i className="fas fa-bars text-white"></i>
            </button>

            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <a className="nav-link text-white fw-semibold px-3 active" href="#">
                    <i className="fas fa-home me-2"></i>Dashboard
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link text-white fw-semibold px-3" href="#">
                    <i className="fas fa-user me-2"></i>Profile
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};
