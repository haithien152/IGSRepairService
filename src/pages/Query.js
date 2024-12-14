import React, { useState } from 'react';
import { useLogin } from '../contexts/LoginContext';
import { useNavigate } from 'react-router-dom';

const QueryPage = () => {
  const navigate = useNavigate();
  const { user, isLoggedIn } = useLogin();
  const [email, setEmail] = useState(isLoggedIn ? user.email : '');
  const [question, setQuestion] = useState('');
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit logic here
    console.log({ email, question, file });
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white p-8 shadow-lg w-3/4 flex">
        {/* Query Form Section */}
        <div className="w-1/2 pr-4 border-r border-gray-300">
          <h2 className="text-2xl font-semibold mb-4 text-center">Submit Your Query</h2>
          <p className="text-gray-600 mb-6 text-left">
            Have questions about tech repairs? Submit your queries below. We'll respond within a few business days.
          </p>
          <p className="text-gray-600 mb-6 text-left">
            If you'd rather not wait, please message us through the chat box at the bottom right.
          </p>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 border border-gray-300"
                required
                disabled={isLoggedIn} // Disable email input if logged in
              />
            </div>
            <div className="mb-4">
              <label htmlFor="question" className="block text-sm font-medium text-gray-700">Your Question</label>
              <textarea
                id="question"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                className="w-full p-3 border border-gray-300"
                rows="5"
                placeholder="Type your question here..."
                required
              ></textarea>
            </div>
            <div className="mb-6">
              <label htmlFor="file" className="block text-sm font-medium text-gray-700">Attach Files</label>
              <input
                type="file"
                id="file"
                onChange={handleFileChange}
                className="w-full p-3 border border-gray-300"
              />
            </div>
            <button type="submit" className="w-full bg-blue-800 text-white py-3 hover:bg-blue-700">
              Submit Query
            </button>
            <button onClick={() => navigate('/')} className="w-full bg-gray-400 text-white py-3 mt-2 hover:bg-gray-500">
              Cancel
            </button>
          </form>
        </div>

        {/* FAQ Section */}
        <div className="w-1/2 pl-4">
          <h2 className="text-2xl font-semibold mb-4 text-center">Frequently Asked Questions</h2>
          <ul className="space-y-4">
            <li className="text-gray-700">
              <strong>Q: How long will it take to repair my device?</strong>
              <p className="mt-1 text-sm text-gray-600">
                A: Repair times vary depending on the issue. Most repairs are completed within 3-5 business days.
              </p>
            </li>
            <li className="text-gray-700">
              <strong>Q: Can I track the status of my repair?</strong>
              <p className="mt-1 text-sm text-gray-600">
                A: Yes, you can track your repair status through your account dashboard.
              </p>
            </li>
            <li className="text-gray-700">
              <strong>Q: Do you offer warranties on repairs?</strong>
              <p className="mt-1 text-sm text-gray-600">
                A: Yes, all repairs come with a 90-day warranty.
              </p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default QueryPage;
