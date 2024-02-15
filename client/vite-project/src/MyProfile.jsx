import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Image } from 'cloudinary-react';


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

    const [imageSelected, setImageSelected] = useState("")

    const handleUpdateProfile = async (updatedData) => {

        try {
            if (imageSelected) {
                updatedData.profile_pic = imageSelected.url;
            }
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

    const uploadImage = async (e) => {
        e.preventDefault();
        try {
            const pictureFormData = new FormData();
            pictureFormData.append("file", imageSelected);
            pictureFormData.append("upload_preset", "q7lw26mx");
    
            const responseCloudinary = await fetch(
                "https://api.cloudinary.com/v1_1/dg4sixjnk/image/upload",
                {
                    method: "POST",
                    body: pictureFormData
                }
            );
    
            if (!responseCloudinary.ok) {
                throw new Error("Failed to upload image to Cloudinary");
            }
    
            const cloudinaryData = await responseCloudinary.json();
            console.log(cloudinaryData);
    
            const responseBackend = await fetch("/api/upload-profile-picture", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    
                },
                body: JSON.stringify({
                    fileUrl: cloudinaryData.secure_url,
                    
                })
            });
    
            if (!responseBackend.ok) {
                throw new Error("Failed to upload image to backend");
            }
    
            
        } catch (error) {
            console.error("Error uploading image:", error);
        }
    };
    

    console.log(imageSelected)
    return (
        <div>
            <h2 className='myProfile'>My Profile</h2>
            <h2>{user.username}</h2>
            <form>
                <label>Profile Picture</label>
                <img src = {user.profile_pic}/>
                <input type="file" name="profile_pic" onChange={(e)=> {
                    setImageSelected(e.target.files[0])
                }} />
                <button onClick={uploadImage}>Upload Image</button>
                <br />

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