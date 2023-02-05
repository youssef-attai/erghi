import React from 'react'
import { Link, Outlet } from 'react-router-dom'

const Root = () => {
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
      <Outlet />
    </>
  )
}

export default Root