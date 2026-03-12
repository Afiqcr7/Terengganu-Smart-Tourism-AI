import Link from 'next/link';

export default function ExploreDistricts() {
  // 1. Put your data array HERE, inside the component function
  const districts = [
    { name: 'Kuala Terengganu', img: '/kt-image.jpg' },
    { name: 'Besut', img: '/besut-image.jpg' },
    { name: 'Setiu', img: '/setiu-image.jpg' },
    { name: 'Marang', img: '/marang-image.jpg' },
    { name: 'Dungun', img: '/dungun-image.jpg' },
    { name: 'Kemaman', img: '/kemaman-image.jpg' },
    { name: 'Hulu Terengganu', img: '/hulu-terengganu-image.jpg' },
  ];

  return (
    <div className="bg-light min-vh-100 pb-5">
      <div className="bg-primary text-white py-5 text-center mb-5">
        <h1 className="fw-bold">Explore Our Districts</h1>
      </div>

      <div className="container">
        <div className="row g-4">
          {/* 2. Map through the array of objects */}
          {districts.map((d) => (
            <div key={d.name} className="col-md-4 col-lg-3">
              <Link href={`/districts/${d.name}`} className="text-decoration-none">
                <div className="card h-100 border-0 shadow-sm hover-effect overflow-hidden rounded-4">
                  {/* Using the image from your array */}
                  <img src={d.img} alt={d.name} className="card-img-top" style={{ height: '180px', objectFit: 'cover' }} />
                  <div className="card-body p-3 text-center">
                    <h5 className="fw-bold text-dark">{d.name}</h5>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}