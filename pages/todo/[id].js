import { useRouter } from 'next/router';
import useSWR from 'swr';
import { gql } from 'graphql-request';
import Layout from '../../components/layout';
import EditForm from '../../components/edit-form';
import { graphQLClient } from '../../utils/graphql-client';
import { getAuthCookie } from '../../utils/auth-cookies';

const Todo = ({ token }) => {
  const router = useRouter();
  const { id } = router.query;

  const fetcher = async (query) =>
    await graphQLClient(token).request(query, { id });

  const query = gql`
    query FindATodoByID($id: ID!) {
      findTodoByID(id: $id) {
        task
        completed
      }
    }
  `;

  const { data, error } = useSWR([query, id], fetcher);

  if (error) return <div>failed to load</div>;

  return (
    <Layout>
      <h1>Edit Todo</h1>

      {data ? (
        <EditForm defaultValues={data.findTodoByID} id={id} token={token} />
      ) : (
        <div>loading...</div>
      )}
    </Layout>
  );
};

export async function getServerSideProps(ctx) {
  const token = getAuthCookie(ctx.req);
  return { props: { token: token || null } };
}

export default Todo;
