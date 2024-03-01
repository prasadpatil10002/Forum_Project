// import React, { useState } from 'react';

// const SignupPage = () => {
//   const [email, setEmail] = useState('');
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [errorMessage, setErrorMessage] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (password !== confirmPassword) {
//       setErrorMessage('Passwords do not match');
//       return;
//     }

//     const newUser = {
//       email,
//       username,
//       password,
//     };

//     try {
//       // Send POST request to backend endpoint for signup
//       const response = await fetch('/api/signup', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(newUser),
//       });

//       if (response.ok) {
//         // Redirect user to login page after signup
//         window.location.href = '/login';
//       } else {
//         const data = await response.json();
//         setErrorMessage(data.message);
//       }
//     } catch (error) {
//       console.error('Error signing up:', error);
//       setErrorMessage('An error occurred. Please try again later.');
//     }
//   };

//   return (
//     <div className="container mx-auto mt-10 ">
//       <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
//       {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
//       <form onSubmit={handleSubmit} className="max-w-md mx-auto">
//         <div className="mb-4">
//           <label className="block text-white-100 text-sm font-bold mb-2" htmlFor="email">
//             Email
//           </label>
//           <input
//             type="email"
//             id="email"
//             className="shadow appearance-none border rounded w-full py-2 px-3 text-white-100 leading-tight focus:outline-none focus:shadow-outline"
//             placeholder="Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block text-white-100 text-sm font-bold mb-2" htmlFor="username">
//             Username
//           </label>
//           <input
//             type="text"
//             id="username"
//             className="shadow appearance-none border rounded w-full py-2 px-3 text-white-100 leading-tight focus:outline-none focus:shadow-outline"
//             placeholder="Username"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block text-white-100 text-sm font-bold mb-2" htmlFor="password">
//             Password
//           </label>
//           <input
//             type="password"
//             id="password"
//             className="shadow appearance-none border rounded w-full py-2 px-3 text-white-100 leading-tight focus:outline-none focus:shadow-outline"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//         </div>
//         <div className="mb-6">
//           <label className="block text-white-100 text-sm font-bold mb-2" htmlFor="confirmPassword">
//             Confirm Password
//           </label>
//           <input
//             type="password"
//             id="confirmPassword"
//             className="shadow appearance-none border rounded w-full py-2 px-3 text-white-100 leading-tight focus:outline-none focus:shadow-outline"
//             placeholder="Confirm Password"
//             value={confirmPassword}
//             onChange={(e) => setConfirmPassword(e.target.value)}
//           />
//         </div>
//         <div className="flex items-center justify-between">
//           <button
//             type="submit"
//             className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//           >
//             Sign Up
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default SignupPage;

import React, { useState } from 'react';

const SignupPage = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match');
      return;
    }

    

    try {
      // Send POST request to backend endpoint for signup
      const response = await fetch('http://localhost:3000/api/users/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({username,password,email}),
      });

      const responseJson = await response.json();

      if (responseJson.success) {
        window.location.href = '/login';
      } else {
        const data = await response.json();
        setErrorMessage(data.message);
      }
    } catch (error) {
      console.error('Error signing up:', error);
      setErrorMessage('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-800">
      <div className="container mx-auto ">
        
        {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
        <form onSubmit={handleSubmit} className="max-w-md mx-auto border border-white border-solid p-6 rounded-md">
        <h2 className="text-2xl font-bold mb-4 text-center text-white-100">Sign Up</h2>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-white-100">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="mt-1 block w-full px-4 py-2 border rounded-md bg-gray-100 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium text-white-100">
              Username
            </label>
            <input
              type="text"
              id="username"
              className="mt-1 block w-full px-4 py-2 border rounded-md bg-gray-100 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-white-100">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="mt-1 block w-full px-4 py-2 border rounded-md bg-gray-100 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-white-100">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              className="mt-1 block w-full px-4 py-2 border rounded-md bg-gray-00 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 rounded-md bg-blue-500 text-white font-semibold hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
