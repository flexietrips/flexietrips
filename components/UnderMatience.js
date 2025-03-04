import React from 'react';
import { Clock, Compass, Mail, MapPin } from 'lucide-react';

export default function UnderMaintenance() {
  return (
    <div
      className="d-flex align-items-center justify-content-center min-vh-100 text-white position-relative"
      style={{
        backgroundImage:
          'linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url("https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="container text-center p-4" style={{ maxWidth: '700px' }}>
        <div className="bg-dark bg-opacity-100 p-4 rounded-4 border border-light">
          <div className="d-flex align-items-center justify-content-center mb-4">
            <Compass className="me-2 text-warning" size={48} />
            <h1 className="fw-bold">flexiEtrips</h1>
          </div>   

          <h2 className="fw-bold mb-3">Under Maintenance</h2>
          <p className="text-light fs-5">We're currently enhancing your travel experience</p>

          <div className="d-flex justify-content-center my-4">
            <Clock className="text-warning" size={64} style={{ animation: 'spin 3s linear infinite' }} />
          </div>

          <p className="text-light">Our website is getting a makeover to serve you better. We'll be back soon with exciting new features and amazing travel deals!</p>

          <div className="row mt-4">    
            <div className=" mb-3">
              <div className="p-3 border rounded bg-dark bg-opacity-50 text-light">
                <Mail className="text-warning mb-2" size={24} />
                <h5 className="fw-semibold">Contact Us</h5>
                <p><a href="mailto:info@flexietrips.com">info@flexietrips.com</a></p>
              </div>
            </div>

            {/* <div className="col-md-6 mb-3">
              <div className="p-3 border rounded bg-dark bg-opacity-50 text-light">
                <MapPin className="text-warning mb-2" size={24} />
                <h5 className="fw-semibold">Location</h5>
                <p>Maavi Wanderer, Janedghat, Himachal Pradesh 173217, India</p>
              </div>
            </div> */}
          </div>

          <p className="text-secondary mt-4 small">Expected to return in 24 hours • Thank you for your patience</p>
        </div>
      </div>
    </div>
  );
}
