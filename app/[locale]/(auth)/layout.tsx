const AuthLayout = ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) => {
  const { locale } = params;

  return (
    <div className="flex-center min-h-screen w-full">
      <p className="absolute top-4 right-4 text-sm text-gray-500">
        Locale: {locale}
      </p>
      {children}
    </div>
  );
};

export default AuthLayout;
