import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


function MyProfile({ user, setUser }) {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        gender: '',
        age: '',
        location: '',
        profile_pic: '',
        bio: '',
        preferences: ''
    });
    console.log(user)
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleUpdateProfile = async (updatedData) => {
        try {
            const response = await fetch('/api/my_profile', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedData),
                credentials: 'include'
            });

            if (!response.ok) {
                throw new Error('Failed to update profile');
            }

            setUser({
                ...user,
                ...updatedData
            });
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };

    const handleDelete = async () => {
        try {
            await fetch('/my_profile', {
                method: 'DELETE',
                credentials: 'include'
            });
            navigate('/login');
        } catch (error) {
            console.error('Error deleting profile:', error);
        }
    };

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2 className='myProfile'>My Profile</h2>
            <h2>{user.username}</h2>
            <form>
                <label>Profile Picture</label>
                <p>{user.profile_pic}</p>
                <input type="image" name="profile_pic" value={formData.profile_pic} onChange={handleChange} />
                <button onClick={() => handleUpdateProfile({ profile_pic: formData.profile_pic })}>Edit</button>
                <br />ß

                <label>Gender</label>
                <p>{user.gender}</p>
                <input type="text" name="gender" value={formData.gender} onChange={handleChange} />
                <button onClick={() => handleUpdateProfile({ gender: formData.gender })}>Edit</button>
                <br />

                <label>Age</label>
                <p>{user.age}</p>
                <input type="text" name="age" value={formData.age} onChange={handleChange} />
                <button onClick={() => handleUpdateProfile({ age: formData.age })}>Edit</button>
                <br/>
                
                <label>Location</label>
                <p>{user.location}</p>
                <input type="text" name="location" value={formData.location} onChange={handleChange} />
                <button onClick={() => handleUpdateProfile({ location: formData.location })}>Edit</button>
                <br/>

                <label>Bio</label>
                <p>{user.bio}</p>
                <input type="text" name="bio" value={formData.bio} onChange={handleChange} />
                <button onClick={() => handleUpdateProfile({ bio: formData.bio })}>Edit</button>                 
                <br/>

                <label>Preferences</label>
                <p>{user.preferences}</p>
                <input type="text" name="preferences" value={formData.preferences} onChange={handleChange} />
                <button onClick={() => handleUpdateProfile({ preferences: formData.preferences })}>Edit</button>
                <br/>
            </form>
            <button onClick={handleDelete}>Delete Profile</button>
        </div>
    );
}

export default MyProfile;
