export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-green-400">
      <h1>Layout </h1>
      
      {children}
    </div>
  );
}
