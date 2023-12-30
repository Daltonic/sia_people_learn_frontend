import { useEffect } from "react";
import { useRouter } from "next/router";
import { NextPageContext } from "next";

interface ErrorProps {
  statusCode: number;
}

const Error = ({ statusCode }: ErrorProps) => {
  const router = useRouter();

  useEffect(() => {
    if (statusCode === 404) {
      router.replace("/not-found");
    }
  }, [statusCode, router]);

  return (
    <p>
      {statusCode
        ? `An error ${statusCode} occurred on server`
        : "An error occurred on client"}
    </p>
  );
};

Error.getInitialProps = ({ res, err }: NextPageContext) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
