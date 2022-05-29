import { GetServerSideProps, GetServerSidePropsContext } from 'next/types';
import styled from 'styled-components'

type ErrorPagePropsType = { statusCode?: number };
export const getServerSideProps: GetServerSideProps<ErrorPagePropsType> = async ({
  req,
  res,
  err,
}: GetServerSidePropsContext & { err?: { statusCode?: number } }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return {
    props: {
      statusCode
    },
  };
};

function ErrorPage({ statusCode }: ErrorPagePropsType) {
  return (
    <StyledPageContent>
      <PageHeader>
        {statusCode ? `An error ${statusCode} occurred on server` : 'An error occurred on client'}
      </PageHeader>
    </StyledPageContent>
  );
}

const PageHeader = styled.h1`
  margin-bottom: 5em;
  margin-top: 3em;
  text-align: center;
`;

const StyledPageContent = styled.div`
  padding-left: 20px;
  padding-right: 20px;
  width: 100%;
  margin: 0 auto;
  min-height: 92vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  align-items: center;
`;

export default ErrorPage;