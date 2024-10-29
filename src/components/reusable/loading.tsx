import { H4 } from "./typography";

const LoadingScreen: React.FC = () => {
  return (
    <>
      <main className="flex justify-center items-center h-screen w-screen flex-col">
        <div className="w-8 h-8 border-2 border-t-primary animate-spin rounded-full p-2"></div>
        <H4 className="mt-4">Checking Security </H4>
        <p>Please wait while we ensure your connection is secure.</p>
      </main>
    </>
  );
};

export default LoadingScreen;
