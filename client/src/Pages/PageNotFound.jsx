import React from 'react'
import { Link } from 'react-router-dom'

const PageNotFound = () => {
  return (
    <div>
      <h1>page Not Found :/</h1>
      <h3>Try this links: <Link to="/">Home Page</Link></h3>
    </div>
  )
}

export default PageNotFound
