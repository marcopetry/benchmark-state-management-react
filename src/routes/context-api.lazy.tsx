import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/context-api')({
  component: About,
})

function About() {
  return <div className="p-2">Hello from About!</div>
}
