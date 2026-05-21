import Link from "next/link";

export default function HomePage() {
  return (
    <main className="home">
      <section className="hero">
        <h1>¿Y si sí me lo gané?</h1>
        <p>
          Guarda tus boletas, rifas, loterías y sorteos en un solo lugar para no
          volver a perder una oportunidad.
        </p>

        <div className="actions">
          <Link href="/login" className="btn primary">
            Iniciar sesión
          </Link>
          <Link href="/register" className="btn secondary">
            Crear cuenta
          </Link>
        </div>
      </section>
    </main>
  );
}