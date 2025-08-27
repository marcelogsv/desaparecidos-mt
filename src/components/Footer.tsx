// src/components/Footer.tsx

/**
 * Componente de rodapé reutilizável para a aplicação.
 */
export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-800 text-slate-300 py-6">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p>&copy; {currentYear} Pessoas Desaparecidas MT. Todos os direitos reservados.</p>
        <p className="text-sm text-slate-400 mt-1">
          Desenvolvido para o projeto prático DESENVOLVE MT.
        </p>
      </div>
    </footer>
  );
}
