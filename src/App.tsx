import Layout from './layout/layout.tsx';
import Container from './components/container/Container.tsx';
import Widget from './components/widget/Widget.tsx';

export default function App() {
  return (
    <Layout>
      <Container>
        <div className={'justify-center w-full flex my-2 '}>
          <Widget symbol={'AAPL'} />
        </div>
      </Container>
    </Layout>
  );
}
