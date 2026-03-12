import Link from 'next/link';

export default function DistrictsPage() {
  const districts = ['Kuala Terengganu', 'Besut', 'Setiu', 'Marang', 'Dungun', 'Kemaman', 'Hulu Terengganu'];

  return (
    <div className="container py-5 text-center">
      <h1 className="mb-5">Select a District</h1>
      <div className="row g-4">
        {districts.map((d) => (
          <div key={d} className="col-md-4">
            <Link href={`/districts/${d}`} className="btn btn-outline-primary btn-lg w-100 p-4">
              {d}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}