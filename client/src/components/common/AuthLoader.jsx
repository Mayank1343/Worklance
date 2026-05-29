const AuthLoader = () => {
  return (
    <div className="h-screen flex items-center justify-center">
      <div className="space-y-4 text-center">
        <div className="w-12 h-12 border-4 border-gray-300 border-t-black rounded-full animate-spin mx-auto" />

        <h2 className="text-lg font-medium">
          Restoring session...
        </h2>
      </div>
    </div>
  );
};

export default AuthLoader;