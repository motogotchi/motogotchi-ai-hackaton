// Loading
const Loading = ({ message = "Loading..." }: { message?: string }) => (
  <div className="m-auto text-center">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-2"></div>
    <p>{message}</p>
  </div>
);

export default Loading;
