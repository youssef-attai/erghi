import { Link, Outlet, redirect } from 'react-router-dom'
import { LogoutFunction, useAuth } from './contexts/AuthContext'

export const logoutAction = ({ logout }: { logout: LogoutFunction }) => async () => {
  if ( await logout() ) redirect('/login')
  else return false
}


const Root = () => {
  const { currentUser, refreshAccessToken } = useAuth()
  return (
    <>
      <div className={"top-bar"}>
        <Link to={"/"}>
          <img src="erghi.svg" alt="erghi's Logo" />
        </Link>
        <a target={'_blank'} href={"https://github.com/youssef-attai/erghi"}>
          <img width={52} src="github.svg" alt="GitHub's Logo" />
        </a>
      </div>
      <div className="container">
        <Outlet />
      </div>
    </>
  )
}

export default Root