import { Container, Wrapper } from 'components/Layout'
import { Header } from 'components/Header'
import { Routes } from 'router'

function App() {
  return (
    <Wrapper>
      <Container>
        <Header />
        <Routes />
      </Container>
    </Wrapper>
  )
}

export default App
