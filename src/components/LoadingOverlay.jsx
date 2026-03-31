import logo from '../assets/CM-Tech1-1.png'

const LoadingOverlay = ({ show }) => {
  return (
    <div className={`page-loading ${show ? 'show' : ''}`}>
      <div className="page-loading-content">
        <img src={logo} alt="CM-Tech" />
        <span>Cargando...</span>
      </div>
    </div>
  )
}

export default LoadingOverlay
