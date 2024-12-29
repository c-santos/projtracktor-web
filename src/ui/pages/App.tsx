import { useProjects } from '../../hooks/useProjects'
import './App.css'

function App() {
  const { error, isLoading, isSuccess, data: projects } = useProjects();

  if (isLoading) {
    return <p>Loading...</p>
  }

  else if (error) {
    return (
      <>
        <p>error</p>
        <p>{error.stack}</p>
      </>
    )
  }

  if (isSuccess) {
    return (
      <>
        <h1>Projects</h1>
        {
          projects.map(p => (<p>{p.updatedAt}</p>))
        }
      </>
    )
  }

  return null
}

export default App
