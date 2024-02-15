import React, { useState, useEffect } from 'react';


function Matches() {
    const [matches, setMatches] = useState([]);

    useEffect(() => {
        fetchMatches();
    }, []);

    const fetchMatches = () => {
        fetch('/api/matches')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch matches');
                }
                return response.json();
            })
            .then(data => {
                setMatches(data); 
            })
            .catch(error => {
                console.error('Error fetching matches:', error);
            });
    };

    return (
        <div className="matches-container">
            <h3>Matches</h3>
            <div className="matches-list">
                {matches.map(match => (
                    <div key={match.match_id} className="match-item">
                        <p>{match.matchee_username}</p>
                        <img src={match.matchee_profile_pic} alt="Profile Pic" className="profile-pic" />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Matches;


// import React, { useState, useEffect } from 'react';

// function Matches() {
//     const [matches, setMatches] = useState([]);

//     useEffect(() => {
//         fetchMatches();
//     }, []);

//     console.log(matches)
//     const fetchMatches = () => {

//         fetch('/api/matches')
//             .then(response => {
//                 if (!response.ok) {
//                     throw new Error('Failed to fetch matches');
//                 }
//                 return response.json();
//             })
//             .then(data => {
//                 setMatches(data); 
//                 console.log(data)
//             })
//             .catch(error => {
//                 console.error('Error fetching matches:', error);
//             });
        
//     };

//     return (
//         <div>
//             <h1>Matches</h1>
//             <ul>
//                 {matches.map(match => (
//                     <li key={match.match_id}>
//                         <p>
//                             {match.matchee_username}
//                         </p>
//                         <p>
//                             {match.matchee_profile_pic}
//                         </p>
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// }

// export default Matches;
