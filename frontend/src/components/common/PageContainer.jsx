function PageContainer({ children }) {
  return (
    <div className="max-w-6xl mx-auto px-5 py-8">
      {children}
    </div>
  );
}

export default PageContainer;