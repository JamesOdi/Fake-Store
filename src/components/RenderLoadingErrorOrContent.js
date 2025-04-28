import Loading from './Loading';
import Error from './Error';

export default function RenderLoadingErrorOrContent({
  isLoading,
  loadingSpinnerSize = 'large',
  loadingText = 'Loading...',
  error,
  children,
}) {
  return (
    <>
      {isLoading ? (
        <Loading
          loadingSpinnerSize={loadingSpinnerSize}
          loadingText={loadingText}
        />
      ) : error ? (
        <Error message={error} />
      ) : (
        children
      )}
    </>
  );
}
