import React, {useState,useEffect} from "react";
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const EditProfileComponent = (props) => {
    const user = props.user;
    console.log("Prop user: ",props.user);

    const callback = props.callback;
    const [formUser,setFormUser] = useState(user);
    useEffect(()=>{
        setFormUser(user);
    },[user.id]);

    const handleChange = name => event => {
        setFormUser({...formUser,[name]: event.target.value});
    }

    const handleLinkChange = name => event => {
        setFormUser({...formUser,links: {...formUser.links, [name]: event.target.value}});
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();
        callback(formUser);
    }

    return (
        <form noValidate autoComplete="off" onSubmit={handleFormSubmit}>
            <TextField
                id="standard-name"
                label="Name"
                value={formUser.name}
                onChange={handleChange('name')}
                margin="normal"
            />
            <TextField
                id="standard-entry"
                label="Entry"
                value={formUser.entryNumber}
                onChange={handleChange('entryNumber')}
                margin="normal"
            />
            
            <TextField
                id="standard-hostel"
                label="hostel"
                value={formUser.hostel}
                onChange={handleChange('hostel')}
                margin="normal"
            />
            
            <TextField
                id="standard-gender"
                select
                label="gender"
                value={formUser.gender}
                onChange={handleChange('gender')}
                helperText="Please select your gender"
                margin="normal"
            >
                {["male","female"].map(option => (
                    <MenuItem key={option} value={option}>
                    {option}
                    </MenuItem>
                ))}
            </TextField>

            {/* <TextField
                id="standard-joinYear"
                label="joinYear"
                type="date"
                value={formUser.joinYear}
                onChange={handleChange('joinYear')}
            />
            <TextField
                id="standard-gradYear"
                label="gradYear"
                type="date"
                value={formUser.gradYear}
                onChange={handleChange('gradYear')}
            />
            <TextField
                id="standard-birthDate"
                label="birthDate"
                type="date"
                value={formUser.birthDate}
                onChange={handleChange('birthDate')}
            /> */}
            
            <TextField
                id="standard-mobileNumber"
                label="mobileNumber"
                value={formUser.mobileNumber}
                onChange={handleChange('mobileNumber')}
                margin="normal"
            />
            
            <TextField
                id="standard-hometown"
                label="hometown"
                value={formUser.hometown}
                onChange={handleChange('hometown')}
                margin="normal"
            />
            
            <TextField
                id="standard-interests"
                label="interests"
                value={formUser.interests}
                onChange={handleChange('interests')}
                margin="normal"
            />
            
            <TextField
                id="standard-specialization"
                label="specialization"
                value={formUser.specialization}
                onChange={handleChange('specialization')}
                margin="normal"
            />
            
            <TextField
                id="standard-intro"
                label="intro"
                value={formUser.intro}
                onChange={handleChange('intro')}
                margin="normal"
            />
            
            <TextField
                id="standard-github"
                label="github"
                value={formUser.links.github}
                onChange={handleLinkChange('github')}
                margin="normal"
            />
            <TextField
                id="standard-blog"
                label="blog"
                value={formUser.links.blog}
                onChange={handleLinkChange('blog')}
                margin="normal"
            />
            <TextField
                id="standard-website"
                label="website"
                value={formUser.links.website}
                onChange={handleLinkChange('website')}
                margin="normal"
            />
            <TextField
                id="standard-facebook"
                label="facebook"
                value={formUser.links.facebook}
                onChange={handleLinkChange('facebook')}
                margin="normal"
            />

            <Button variant="contained" color="primary" type="submit">
                Submit
            </Button>
        </form>
    );
}

export default EditProfileComponent;