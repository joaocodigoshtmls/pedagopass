const Footer = () => {
  return (
    <footer className="bg-white text-gray-700 border-t">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <div>
            <p className="text-gray-900 font-semibold">PedagoPass</p>
            <p className="text-gray-500 text-sm">Viagens e formação para professores</p>
          </div>

          <div className="text-sm text-gray-600">
            <p>© 2025 PedagoPass. Todos os direitos reservados.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
