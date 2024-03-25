export default function Skeleton({ times }) {
  const boxes = Array(times)
    .fill(0)
    .map((_, i) => {
      return (
        <div className="card" key={i}>
          <img
            className="header-img skeleton"
            src="https://source.unsplash.com/100x100/?nature"
          />
          <div className="header">
            <div className="title" data-title>
              <div className="skeleton skeleton-text"></div>
              <div className="skeleton skeleton-text"></div>
            </div>
            <div className="body">
              <div className="profile-card">
                <div className="">
                  <div className="img skeleton skeleton-text"></div>
                </div>

                <div className="intro">
                  <h5 className="skeleton skeleton-text"></h5>
                  <div className="skeleton skeleton-text"></div>
                </div>
              </div>

              <div className="likes-box">
                <p className="skeleton skeleton-text"></p>
              </div>
            </div>
          </div>
        </div>
      );
    });

  return boxes;
}
