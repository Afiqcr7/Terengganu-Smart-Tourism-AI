import Link from 'next/link';

export default function ExploreDistricts() {
  const districts = ['Kuala Terengganu', 'Besut', 'Setiu', 'Marang', 'Dungun', 'Kemaman', 'Hulu Terengganu'];

  return (
    <div className="container py-5">
      <h1 className="text-center mb-5 fw-bold">Explore Terengganu by District</h1>
      <div className="row g-4">
        {districts.map((d) => (
          <div key={d} className="col-md-4">
            <Link href={`/districts/${d}`} className="text-decoration-none">
              <div className="card h-100 shadow-sm border-0 hover-effect p-4 text-center">
                <i className="bi bi-map text-primary" style={{ fontSize: '3rem' }}></i>
                <h4 className="mt-3">{d}</h4>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}