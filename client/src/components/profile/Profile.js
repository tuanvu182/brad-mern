import React from 'react';
import Spinner from '../layout/Spinner';
import { getProfileById } from '../../actions/profile';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import ProfileTop from './ProfileTop';
import ProfileAbout from './ProfileAbout';
import ProfileExperience from './ProfileExperience';
import ProfileEducation from './ProfileEducation';
import ProfileGithub from './ProfileGithub';

const Profile = ({ match }) => {
    const dispatch = useDispatch();
    const { profile, loading } = useSelector(state => state.profile)
    const auth = useSelector(state => state.auth);

    React.useEffect(() => {
        dispatch(getProfileById(match.params.id))
    })

    return (
        <>
            {profile === null || loading ?
                <Spinner /> :
                <>
                    <Link to='/profiles' className='btn btn-light'>
                        Back To Profiles
                    </Link>
                    {auth.isAuthenticated &&
                        auth.loading === false &&
                        auth.user._id === profile.user._id &&
                        (<Link to='/edit-profile' className="btn btn-dark">Edit Profile</Link>)}
                    <div className="profile-grid my-1">
                        <ProfileTop profile={profile} />
                        <ProfileAbout profile={profile} />

                        <div className="profile-exp bg-white p-2">
                            <h2 className="text-primary">Experience</h2>
                            {profile.experience.length > 0 ? 
                            (<>
                                {profile.experience.map(exp => (
                                    <ProfileExperience 
                                        key={exp._id}
                                        experience={exp} />
                                ))}
                            </>) : 
                            (<h4>No experience credentials</h4>)}
                        </div>

                        <div className="profile-edu bg-white p-2">
                            <h2 className="text-primary">Education</h2>
                            {profile.education.length > 0 ? 
                            (<>
                                {profile.education.map(edu => (
                                    <ProfileEducation 
                                        key={edu._id}
                                        education={edu} />
                                ))}
                            </>) : 
                            (<h4>No education credentials</h4>)}
                        </div>

                        {profile.githubusername && (
                            <ProfileGithub username={profile.githubusername} />
                        )}
                    </div>
                </>}
        </>
    )
}

export default Profile;