const ErrorBanner = ({ message }: { message?: string }) => {
  if (!message) return null;

  return (
    <div
      role='alert'
      className='rounded-md border border-red-300 bg-red-100 p-2 text-center text-sm font-medium text-red-600'
    >
      {message}
    </div>
  );
};

export default ErrorBanner;
