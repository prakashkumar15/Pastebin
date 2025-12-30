interface NavbarProps {
  title: string;
}

export default function Navbar({ title }: NavbarProps) {
  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-center">
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-semibold text-gray-900">{title}</h1>
          </div>
        </div>
      </div>
    </nav>
  );
}
