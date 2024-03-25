// ❗ IMPORTANT
// The ✨ tasks found inside this component are not in order.
// Check the README for the appropriate sequence to follow.
import React, { useState, useEffect } from 'react';

let id = 0;
const getId = () => ++id;

let teamMembers = [
  {
    id: getId(), 
    fname: "Alice", 
    lname: "Smith",
    bio: "Passionate about front-end development and user experience. I love creating intuitive and visually appealing web interfaces."
  },
  {
    id: getId(), 
    fname: "Bob", 
    lname: "Johnson",
    bio: "Aspiring web developer with a background in graphic design. I enjoy bringing creativity and aesthetics to the digital world."
  },
];

export default function App() {
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [bio, setBio] = useState('');
  const [editing, setEditing] = useState(null);
  const [members, setMembers] = useState(teamMembers);

  useEffect(() => {
    if (editing === null) {
      // Reset form fields if editing is null
      setFname('');
      setLname('');
      setBio('');
    } else {
      // Populate form fields with data of the member being edited
      const memberToEdit = members.find((member) => member.id === editing);
      setFname(memberToEdit.fname);
      setLname(memberToEdit.lname);
      setBio(memberToEdit.bio);
    }
  }, [editing, members]);

  const onChange = (e) => {
    const { id, value } = e.target;
    switch (id) {
      case 'fname':
        setFname(value);
        break;
      case 'lname':
        setLname(value);
        break;
      case 'bio':
        setBio(value);
        break;
      default:
        break;
    }
  };

  const edit = (id) => {
    setEditing(id);
  };

  const submitNewMember = (e) => {
    e.preventDefault();
    const newMember = {
      id: getId(),
      fname,
      lname,
      bio
    };
    setMembers([...members, newMember]);
    setFname('');
    setLname('');
    setBio('');
  };

  const editExistingMember = () => {
    const updatedMember = {
      id: editing,
      fname,
      lname,
      bio
    };
    const updatedMembers = members.map((member) =>
      member.id === editing ? updatedMember : member
    );
    setMembers(updatedMembers);
    setEditing(null);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (editing === null) {
      submitNewMember();
    } else {
      editExistingMember();
    }
  };

  return (
    <div>
      <div id="membersList">
        <h2>Team Members</h2>
        <div>
          {members.map(mem => (
            <div key={mem.id} className="member">
              <div>
                <h4>{mem.fname} {mem.lname}</h4>
                <p>{mem.bio}</p>
              </div>
              <button onClick={() => edit(mem.id)}>Edit</button>
            </div>
          ))}
        </div>
      </div>
      <div id="membersForm">
        <h2>{editing ? 'Edit' : 'Add'} a Team Member</h2>
        <form onSubmit={onSubmit}>
          <div>
            <label htmlFor="fname">First Name </label>
            <input
              id="fname"
              type="text"
              placeholder="Type First Name"
              value={fname}
              onChange={onChange}
            />
          </div>

          <div>
            <label htmlFor="lname">Last Name </label>
            <input
              id="lname"
              type="text"
              placeholder="Type Last Name"
              value={lname}
              onChange={onChange}
            />
          </div>

          <div>
            <label htmlFor="bio">Bio </label>
            <textarea
              id="bio"
              placeholder="Type Bio"
              value={bio}
              onChange={onChange}
            />
          </div>

          <div>
            <button type="submit">{editing ? 'Update' : 'Submit'}</button>
          </div>
        </form>
      </div>
    </div>
  );
}
