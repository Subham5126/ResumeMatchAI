function PageContainer({ children, className = "" }) {
  return (
    <div className={`max-w-[1650px] mx-auto px-4 sm:px-8 lg:px-12 ${className}`}>
      {children}
    </div>
  );
}

export default PageContainer;