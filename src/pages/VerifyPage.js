import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const VerifyPage = () => {
  const { id } = useParams(); // Get the ID from the URL
  const [message, setMessage] = useState('');
  const [error, setError] = useState(false);
  const [isValidId, setIsValidId] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    const validateId = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:5000/user/validate/${id}`, {
          method: 'GET',
        });

        if (response.ok) {
          setIsValidId(true);
        } else {
          setMessage('Invalid verification link.');
          setError(true);
        }
      } catch (err) {
        console.error('Validation error:', err);
        setMessage('Error validating link.');
        setError(true);
      }
    };

    validateId();
  }, [id]);

  const handleVerify = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/user/backendverify/${id}`, {
        method: 'GET',
      });

      if (response.ok) {
        setMessage('Account is verified. Please close this window and log in.');
        setIsVerified(true);
        setError(false);
      } else {
        setMessage('Verify error. Please contact us.');
        setError(true);
      }
    } catch (err) {
      console.error('Verification error:', err);
      setMessage('Verify error. Please contact us.');
      setError(true);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 overflow-hidden">
      <div className="bg-white p-8 shadow-lg text-center transform -translate-y-12">
        <h1 className="text-2xl font-semibold mb-4">Verify Your Account</h1>
        {!isValidId && !message ? (
          <p className="text-gray-500">Validating your link...</p>
        ) : (
          <>
            <p className="mb-6">{message || 'Click the button below to verify your account.'}</p>
            {isValidId && !isVerified && (
              <button
                onClick={handleVerify}
                className="bg-blue-800 text-white px-6 py-3 rounded hover:bg-blue-700"
              >
                Verify
              </button>
            )}
            {message && (
              <p className={`mt-6 ${error ? 'text-red-500' : 'text-green-500'}`}>{message}</p>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default VerifyPage;
