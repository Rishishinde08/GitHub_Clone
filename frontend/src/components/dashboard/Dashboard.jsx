// import React, { useState, useEffect } from "react";
// import "./dashboard.css";
// import Navbar from "../Navbar";

// const Dashboard = () => {
//   const [repositories, setRepositories] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [suggestedRepositories, setSuggestedRepositories] = useState([]);
//   const [searchResults, setSearchResults] = useState([]);

//   useEffect(() => {
//     const userId = localStorage.getItem("userId");

//     const fetchRepositories = async () => {
//       try {
//         const response = await fetch(
//           `http://localhost:3002/repo/user/${userId}`
//         );
//         const data = await response.json();
//         setRepositories(data.repositories);
//       } catch (err) {
//         console.error("Error while fecthing repositories: ", err);
//       }
//     };

//     const fetchSuggestedRepositories = async () => {
//       try {
//         const response = await fetch(`http://localhost:3002/repo/all`);
//         const data = await response.json();
//         setSuggestedRepositories(data);
//         console.log(suggestedRepositories);
//       } catch (err) {
//         console.error("Error while fecthing repositories: ", err);
//       }
//     };

//     fetchRepositories();
//     fetchSuggestedRepositories();
//   }, []);

//   useEffect(() => {
//     if (searchQuery == "") {
//       setSearchResults(repositories);
//     } else {
//       const filteredRepo = repositories.filter((repo) =>
//         repo.name.toLowerCase().includes(searchQuery.toLowerCase())
//       );
//       setSearchResults(filteredRepo);
//     }
//   }, [searchQuery, repositories]);

//   return (
//     <>
//       <Navbar />
//       <section id="dashboard">
//         <aside>
//           <h3>Suggested Repositories</h3>
//           {suggestedRepositories.map((repo) => {
//             return (
//               <div key={repo._id}>
//                 <h4>{repo.name}</h4>
//                 <h4>{repo.description}</h4>
//               </div>
//             );
//           })}
//         </aside>
//         <main>
//           <h2>Your Repositories</h2>
//           <div id="search">
//             <input
//               type="text"
//               value={searchQuery}
//               placeholder="Search..."
//               onChange={(e) => setSearchQuery(e.target.value)}
//             />
//           </div>
//           {searchResults.map((repo) => {
//             return (
//               <div key={repo._id}>
//                 <h4>{repo.name}</h4>
//                 <h4>{repo.description}</h4>
//               </div>
//             );
//           })}
//         </main>
//         <aside>
//           <h3>Upcoming Events</h3>
//           <ul>
//             <li>
//               <p>Tech Conference - Dec 15</p>
//             </li>
//             <li>
//               <p>Developer Meetup - Dec 25</p>
//             </li>
//             <li>
//               <p>React Summit - Jan 5</p>
//             </li>
//           </ul>
//         </aside>
//       </section>
//     </>
//   );
// };

// export default Dashboard;






//-------------------------------------------------------
import React, { useState, useEffect } from "react";
import "./dashboard.css";
import Navbar from "../Navbar";

const Dashboard = () => {
  const [repositories, setRepositories] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestedRepositories, setSuggestedRepositories] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const userId = localStorage.getItem("userId");

    const fetchRepositories = async () => {
      try {
        const response = await fetch(
          `http://localhost:3002/repo/user/${userId}`
        );
        const data = await response.json();
        if (data?.repositories) {
          setRepositories(data.repositories);
        } else {
          setRepositories([]);
        }
      } catch (err) {
        console.error("Error while fetching repositories: ", err);
        setRepositories([]);
      }
    };

    const fetchSuggestedRepositories = async () => {
      try {
        const response = await fetch(`http://localhost:3002/repo/all`);
        const data = await response.json();
        if (Array.isArray(data)) {
          setSuggestedRepositories(data);
        } else {
          setSuggestedRepositories([]);
        }
      } catch (err) {
        console.error("Error while fetching suggested repositories: ", err);
        setSuggestedRepositories([]);
      }
    };

    fetchRepositories();
    fetchSuggestedRepositories();
  }, []);

  useEffect(() => {
    if (searchQuery === "") {
      setSearchResults(repositories);
    } else {
      const filteredRepo = repositories.filter((repo) =>
        repo.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(filteredRepo);
    }
  }, [searchQuery, repositories]);

  return (
    <>
      <Navbar />
      <section id="dashboard">
        <aside>
          <h3>Suggested Repositories</h3>
          {Array.isArray(suggestedRepositories) && suggestedRepositories.length > 0 ? (
            suggestedRepositories.map((repo) => (
              <div key={repo._id}>
                <h4>{repo.name}</h4>
                <h4>{repo.description}</h4>
              </div>
            ))
          ) : (
            <p>No suggestions available.</p>
          )}
        </aside>
        <main>
          <h2>Your Repositories</h2>
          <div id="search">
            <input
              type="text"
              value={searchQuery}
              placeholder="Search..."
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          {Array.isArray(searchResults) && searchResults.length > 0 ? (
            searchResults.map((repo) => (
              <div key={repo._id}>
                <h4>{repo.name}</h4>
                <h4>{repo.description}</h4>
              </div>
            ))
          ) : (
            <p>No repositories found.</p>
          )}
        </main>
        <aside>
          <h3>Upcoming Events</h3>
          <ul>
            <li>
              <p>Tech Conference - Dec 15</p>
            </li>
            <li>
              <p>Developer Meetup - Dec 25</p>
            </li>
            <li>
              <p>React Summit - Jan 5</p>
            </li>
          </ul>
        </aside>
      </section>
    </>
  );
};

export default Dashboard;
