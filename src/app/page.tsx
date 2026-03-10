export default function Home() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container">
          <a className="navbar-brand" href="#">Terengganu Tourism</a>
        </div>
      </nav>

      <header className="bg-light py-5 text-center">
        <h1>Explore Terengganu</h1>
        <p>Discover beautiful islands and rich culture.</p>
      </header>

      <main className="container mt-5">
        <div className="row">
          <div className="col-md-4">
            <div className="card">
              <div className="card-body">
                <h5>Pulau Redang</h5>
                <p>Crystal clear waters.</p>
              </div>
            </div>
          </div>
          {/* Add more cards here */}
        </div>
      </main>
    </div>
  );
}