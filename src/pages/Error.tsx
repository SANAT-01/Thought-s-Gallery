import { useRouteError } from "react-router-dom";
import Layout from "../layout/Layout";

interface RouteError {
  status: number;
  statusText: string;
  internal: boolean;
  data: string;
  error: Record<string, unknown>;
}

function ErrorPage() {
  const error = useRouteError() as RouteError;
  console.log(error);
  let title = "An error occurred!";
  let message = "Something went wrong!";

  if (error.status === 500) {
    message = error.data;
  }

  if (error.status === 404) {
    title = "Page not found!";
    message = "Could not find resource or page.";
  }

  return (
    <Layout>
      <h1>{title}</h1>
      <p>{message}</p>
    </Layout>
  );
}

export default ErrorPage;
