import { useProjects } from '../../hooks/useProjects'
import ProjectCard from '../components/ProjectCard';

function HomePage() {
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
          projects.map(p => (
          <ProjectCard {...p}></ProjectCard>
          ))
        }
      </>
    )
  }

  return null
}

export default HomePage
